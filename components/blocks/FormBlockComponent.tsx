'use client'

import { useState } from 'react'
import { IMaskInput } from 'react-imask'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  Mail, 
  Phone, 
  User, 
  MessageSquare,
  Building,
  Briefcase,
  MapPin,
  Globe,
  Link as LinkIcon,
  Calendar,
  Clock,
  Lock,
  Key,
  Star,
  Heart,
  FileText,
  Paperclip,
  Search,
  Settings,
  DollarSign,
  Target,
  Package,
  Home,
} from 'lucide-react'
import type { FormBlockComponentProps } from '@/types/components'
import type { FormField } from '@/types/blocks'

export default function FormBlockComponent({
  backgroundColor = '#ffffff',
  title,
  description,
  formData,
}: FormBlockComponentProps) {
  const [formValues, setFormValues] = useState<Record<string, string | boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successData, setSuccessData] = useState<{
    title: string
    message: string
    showIcon: boolean
  }>({
    title: formData.successTitle || 'Спасибо!',
    message: formData.successMessage || 'Ваше сообщение успешно отправлено.',
    showIcon: formData.showSuccessIcon !== false,
  })

  const handleChange = (name: string, value: string | boolean) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
    // Убираем ошибку при изменении значения
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Функция для получения значения поля с дефолтом для телефона
  const getFieldValue = (field: { name: string; fieldType: string }) => {
    const value = formValues[field.name]
    // Если это поле телефона и значение пустое, возвращаем +7 (
    if (field.fieldType === 'tel' && (!value || value === '')) {
      return '+7 ('
    }
    return value || ''
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    formData.fields?.forEach((field) => {
      const value = formValues[field.name]

      // Проверка обязательных полей
      if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field.name] = `Поле "${field.label}" обязательно для заполнения`
        return
      }

      // Валидация email
      if (field.fieldType === 'email' && typeof value === 'string' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Введите корректный email адрес'
        }
      }

      // Валидация телефона
      if (field.fieldType === 'tel' && typeof value === 'string' && value) {
        // Проверяем, что номер полностью заполнен
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
        if (!phoneRegex.test(value)) {
          newErrors[field.name] = 'Введите полный номер телефона'
        }
      }

      // Валидация URL
      if (field.fieldType === 'url' && typeof value === 'string' && value) {
        try {
          new URL(value)
        } catch {
          newErrors[field.name] = 'Введите корректный URL адрес'
        }
      }

      // Валидация числа
      if (field.fieldType === 'number' && typeof value === 'string' && value) {
        if (isNaN(Number(value))) {
          newErrors[field.name] = 'Введите корректное число'
        }
      }
    })

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    // Клиентская валидация
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: formData.id,
          data: formValues,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors)
        } else {
          throw new Error(result.error || 'Ошибка отправки формы')
        }
        return
      }

      // Успешная отправка
      setSuccessData({
        title: result.successTitle || formData.successTitle,
        message: result.successMessage || formData.successMessage,
        showIcon: result.showSuccessIcon !== false,
      })
      setIsSuccess(true)
      setFormValues({})
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({
        _general: 'Произошла ошибка при отправке формы. Попробуйте позже.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Функция для получения иконки по имени
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      user: <User className="h-4 w-4 text-muted-foreground" />,
      mail: <Mail className="h-4 w-4 text-muted-foreground" />,
      phone: <Phone className="h-4 w-4 text-muted-foreground" />,
      'message-square': <MessageSquare className="h-4 w-4 text-muted-foreground" />,
      building: <Building className="h-4 w-4 text-muted-foreground" />,
      briefcase: <Briefcase className="h-4 w-4 text-muted-foreground" />,
      'map-pin': <MapPin className="h-4 w-4 text-muted-foreground" />,
      globe: <Globe className="h-4 w-4 text-muted-foreground" />,
      link: <LinkIcon className="h-4 w-4 text-muted-foreground" />,
      calendar: <Calendar className="h-4 w-4 text-muted-foreground" />,
      clock: <Clock className="h-4 w-4 text-muted-foreground" />,
      lock: <Lock className="h-4 w-4 text-muted-foreground" />,
      key: <Key className="h-4 w-4 text-muted-foreground" />,
      star: <Star className="h-4 w-4 text-muted-foreground" />,
      heart: <Heart className="h-4 w-4 text-muted-foreground" />,
      'file-text': <FileText className="h-4 w-4 text-muted-foreground" />,
      paperclip: <Paperclip className="h-4 w-4 text-muted-foreground" />,
      search: <Search className="h-4 w-4 text-muted-foreground" />,
      settings: <Settings className="h-4 w-4 text-muted-foreground" />,
      'dollar-sign': <DollarSign className="h-4 w-4 text-muted-foreground" />,
      target: <Target className="h-4 w-4 text-muted-foreground" />,
      package: <Package className="h-4 w-4 text-muted-foreground" />,
      home: <Home className="h-4 w-4 text-muted-foreground" />,
    }
    return iconMap[iconName] || null
  }

  // Функция для автоматического выбора иконки по типу поля
  const getAutoIcon = (fieldType: string) => {
    switch (fieldType) {
      case 'email':
        return 'mail'
      case 'tel':
        return 'phone'
      case 'text':
        return 'user'
      case 'textarea':
        return 'message-square'
      case 'url':
        return 'link'
      case 'date':
        return 'calendar'
      case 'number':
        return 'dollar-sign'
      default:
        return null
    }
  }

  // Функция для получения иконки поля
  // Function to get the field icon (not used currently but kept for future)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getFieldIcon = (field: FormField) => {
    // Если иконка явно установлена как "none", не показываем иконку
    if (field.icon === 'none') {
      return null
    }

    // Если иконка установлена как "auto" или не задана, используем автоматическую
    if (!field.icon || field.icon === 'auto') {
      const autoIconName = getAutoIcon(field.fieldType)
      return autoIconName ? getIconComponent(autoIconName) : null
    }

    // Иначе используем выбранную иконку
    return getIconComponent(field.icon)
  }

  // Экран успеха
  if (isSuccess) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 sm:p-12 lg:p-16"
            style={{ backgroundColor }}
          >
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
              {successData.showIcon && (
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
              )}
              <div className="space-y-3">
                <h2>
                  {successData.title}
                </h2>
                <p className="text-lg text-muted-foreground whitespace-pre-line">
                  {successData.message}
                </p>
              </div>
              <Button
                onClick={() => setIsSuccess(false)}
                variant="outline"
                size="lg"
              >
                Отправить еще одну заявку
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Основная форма
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl p-8 sm:p-12 lg:p-16"
          style={{ backgroundColor }}
        >
          {(title || description) && (
            <div className="text-center mb-8 max-w-2xl mx-auto space-y-3">
              {title && (
                <h2>{title}</h2>
              )}
              {description && (
                <p className="text-lg text-muted-foreground whitespace-pre-line">
                  {description}
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto space-y-6">
            {errors._general && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors._general}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.fields?.map((field) => {
                const fieldError = errors[field.name]
                const fieldValue = getFieldValue(field)
                const isFullWidth = field.width === 'full'
                const colSpan = isFullWidth ? 'md:col-span-2' : 'md:col-span-1'

                return (
                  <div key={field.id} className={`space-y-2 ${colSpan}`}>
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </Label>

                    {field.fieldType === 'textarea' ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        placeholder={field.placeholder}
                        value={String(fieldValue)}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={fieldError ? 'border-destructive' : ''}
                      />
                    ) : field.fieldType === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={String(fieldValue)}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={`flex h-10 w-full rounded-md border ${
                          fieldError ? 'border-destructive' : 'border-input'
                        } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                      >
                        <option value="">Выберите...</option>
                        {field.options?.split('\n').map((option, i) => (
                          <option key={i} value={option.trim()}>
                            {option.trim()}
                          </option>
                        ))}
                      </select>
                    ) : field.fieldType === 'checkbox' ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={field.name}
                          name={field.name}
                          checked={fieldValue === true}
                          onChange={(e) =>
                            handleChange(field.name, e.target.checked)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label
                          htmlFor={field.name}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {field.placeholder || field.label}
                        </Label>
                      </div>
                    ) : field.fieldType === 'tel' ? (
                      <IMaskInput
                        mask="+7 (000) 000-00-00"
                        value={String(fieldValue)}
                        unmask={false}
                        lazy={true}
                        onAccept={(value: string) => handleChange(field.name, value)}
                        className={`flex h-10 w-full rounded-md border ${
                          fieldError ? 'border-destructive' : 'border-input'
                        } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                      />
                    ) : (
                      <Input
                        type={field.fieldType}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={String(fieldValue)}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={fieldError ? 'border-destructive' : ''}
                      />
                    )}

                    {fieldError && (
                      <p className="text-sm text-destructive">{fieldError}</p>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  formData.submitButtonText || 'Отправить'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
