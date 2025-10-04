import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'
import type { ApiFormField, ApiFormData } from '@/types/api'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    
    const { formId, data } = body

    if (!formId || !data) {
      return NextResponse.json(
        { error: 'Missing formId or data' },
        { status: 400 }
      )
    }

    // Получаем форму из базы данных
    const formResult = await payload.findByID({
      collection: 'forms',
      id: formId,
    })

    if (!formResult) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      )
    }

    // Приводим к типу ApiFormData
    const form = formResult as unknown as ApiFormData

    // Валидация полей формы
    const errors: Record<string, string> = {}
    
    form.fields?.forEach((field: ApiFormField) => {
      if (field.required && (!data[field.name] || data[field.name].trim() === '')) {
        errors[field.name] = `Поле "${field.label}" обязательно для заполнения`
      }

      // Валидация email
      if (field.fieldType === 'email' && data[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data[field.name])) {
          errors[field.name] = 'Введите корректный email'
        }
      }

      // Валидация телефона
      if (field.fieldType === 'tel' && data[field.name]) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/
        if (!phoneRegex.test(data[field.name])) {
          errors[field.name] = 'Введите корректный номер телефона'
        }
      }

      // Валидация URL
      if (field.fieldType === 'url' && data[field.name]) {
        try {
          new URL(data[field.name])
        } catch {
          errors[field.name] = 'Введите корректный URL'
        }
      }
    })

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    // Сохраняем submission в базу
    const userIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData: data,
        userIP,
        userAgent,
      },
    })

    // Отправка email администратору
    if (form.emailTo) {
      await sendAdminEmail(form, data)
    }

    // Отправка email пользователю (если включено)
    if (form.sendEmailToUser) {
      const userEmail = findUserEmail(form.fields, data)
      if (userEmail) {
        await sendUserEmail(form, userEmail)
      }
    }

    return NextResponse.json({
      success: true,
      successTitle: form.successTitle || 'Спасибо!',
      successMessage: form.successMessage || 'Ваше сообщение успешно отправлено.',
      showSuccessIcon: form.showSuccessIcon !== false,
    })

  } catch (error) {
    console.error('❌ Form submission error:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// Вспомогательная функция для поиска email пользователя в данных формы
function findUserEmail(fields: ApiFormField[] | undefined, data: Record<string, string>): string | null {
  const emailField = fields?.find((field) => field.fieldType === 'email')
  return emailField ? data[emailField.name] : null
}

// Функция отправки email администратору
async function sendAdminEmail(form: ApiFormData, data: Record<string, string>) {
  // Формируем HTML для письма
  let emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        Новая заявка с формы: ${form.title}
      </h2>
      <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
  `
  
  form.fields?.forEach((field: ApiFormField) => {
    const value = data[field.name] || '-'
    emailHtml += `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px 8px; font-weight: bold; width: 200px; color: #555;">${field.label}:</td>
        <td style="padding: 12px 8px; color: #333;">${value}</td>
      </tr>
    `
  })
  
  emailHtml += `
      </table>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 12px;">
               <p>Это автоматическое уведомление с сайта IWA360</p>
      </div>
    </div>
  `

  // Проверяем наличие Resend API ключа
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY не найден в .env файле')
    console.log('📧 Email для отправки (НЕ ОТПРАВЛЕН):')
    console.log('   To:', form.emailTo)
    console.log('   Subject:', form.emailSubject || 'Новая заявка с сайта')
    console.log('   HTML:', emailHtml)
    console.log('\n💡 Для настройки email добавьте в .env:')
    console.log('   RESEND_API_KEY=your_api_key_here')
    console.log('   RESEND_FROM_EMAIL=noreply@yourdomain.com')
    return
  }

  try {
    const resend = new Resend(resendApiKey)
    const { data: emailData, error } = await resend.emails.send({
      from: fromEmail,
      to: form.emailTo,
      subject: form.emailSubject || 'Новая заявка с сайта',
      html: emailHtml,
    })

    if (error) {
      console.error('❌ Ошибка отправки email:', error)
      throw error
    }

    console.log('✅ Email успешно отправлен:', emailData)
  } catch (error) {
    console.error('❌ Не удалось отправить email:', error)
    throw error
  }
}

// Функция отправки email пользователю
async function sendUserEmail(form: ApiFormData, userEmail: string) {
  const emailTitle = form.userEmailTitle || form.successTitle || 'Спасибо за обращение!'
  const emailMessage = form.userEmailMessage || form.successMessage || 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время.'
  
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">${emailTitle}</h2>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p style="color: #333; font-size: 16px; line-height: 1.6; white-space: pre-line;">${emailMessage}</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #777; font-size: 14px; margin: 0;">С уважением,</p>
                 <p style="color: #333; font-size: 16px; font-weight: bold; margin: 5px 0 0 0;">Команда IWA360</p>
        </div>
      </div>
    </div>
  `

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY не найден - email пользователю не отправлен')
    console.log('📧 Email для пользователя (НЕ ОТПРАВЛЕН):')
    console.log('   To:', userEmail)
    console.log('   Subject:', form.userEmailSubject || 'Спасибо за обращение!')
    return
  }

  try {
    const resend = new Resend(resendApiKey)
    const { data: emailData, error } = await resend.emails.send({
      from: fromEmail,
      to: userEmail,
      subject: form.userEmailSubject || 'Спасибо за обращение!',
      html: emailHtml,
    })

    if (error) {
      console.error('❌ Ошибка отправки email пользователю:', error)
      throw error
    }

    console.log('✅ Email пользователю успешно отправлен:', emailData)
  } catch (error) {
    console.error('❌ Не удалось отправить email пользователю:', error)
    // Не бросаем ошибку, чтобы не прерывать основной процесс
  }
}

