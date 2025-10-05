'use client'

import { useState } from 'react'
import { IMaskInput } from 'react-imask'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Field, FieldLabel, FieldError, FieldGroup } from '@/components/ui/field'
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
import Link from 'next/link'
import type { FormModalProps } from '@/types/components'

export default function FormModal({
  open,
  onOpenChange,
  modalTitle,
  modalDescription,
  formData,
  consentText,
}: FormModalProps) {
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

  // Сбрасываем состояние при закрытии модалки
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(() => {
        setIsSuccess(false)
        setFormValues({})
        setErrors({})
      }, 200)
    }
    onOpenChange(newOpen)
  }

  const handleChange = (name: string, value: string | boolean) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
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
    if (field.fieldType === 'tel' && (!value || value === '')) {
      return '+7 ('
    }
    return value || ''
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    formData.fields?.forEach((field) => {
      const value = formValues[field.name]

      if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field.name] = `Поле "${field.label}" обязательно для заполнения`
        return
      }

      if (field.fieldType === 'email' && typeof value === 'string' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Введите корректный email адрес'
        }
      }

      if (field.fieldType === 'tel' && typeof value === 'string' && value) {
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
        if (!phoneRegex.test(value)) {
          newErrors[field.name] = 'Введите полный номер телефона'
        }
      }

      if (field.fieldType === 'url' && typeof value === 'string' && value) {
        try {
          new URL(value)
        } catch {
          newErrors[field.name] = 'Введите корректный URL адрес'
        }
      }

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
  const getFieldIcon = (field: { icon?: string; fieldType: string }) => {
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
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
            {successData.showIcon && (
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            )}
            <div className="space-y-2">
              <h2 className="tracking-tight">
                {successData.title}
              </h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {successData.message}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Основная форма
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          {modalTitle && <DialogTitle>{modalTitle}</DialogTitle>}
          {modalDescription && (
            <DialogDescription>{modalDescription}</DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          {errors._general && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors._general}</AlertDescription>
            </Alert>
          )}

          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.fields?.map((field) => {
                const fieldError = errors[field.name]
                const fieldValue = getFieldValue(field)
                const isFullWidth = field.width === 'full'
                const colSpan = isFullWidth ? 'md:col-span-2' : 'md:col-span-1'
                const fieldIcon = getFieldIcon(field)

                return (
                  <Field
                    key={field.id}
                    className={colSpan}
                    data-invalid={fieldError ? true : undefined}
                  >
                    <FieldLabel htmlFor={field.name}>
                      {field.label}
                      {field.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FieldLabel>

                    {field.fieldType === 'textarea' ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        placeholder={field.placeholder}
                        value={String(fieldValue)}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        autoComplete="on"
                      />
                    ) : field.fieldType === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={String(fieldValue)}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        autoComplete="on"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {field.placeholder || field.label}
                        </FieldLabel>
                      </div>
                    ) : field.fieldType === 'tel' ? (
                      <InputGroup>
                        {fieldIcon && (
                          <InputGroupAddon align="inline-start">
                            {fieldIcon}
                          </InputGroupAddon>
                        )}
                        <IMaskInput
                          mask="+7 (000) 000-00-00"
                          id={field.name}
                          name={field.name}
                          value={String(fieldValue)}
                          unmask={false}
                          lazy={true}
                          onAccept={(value: string) => handleChange(field.name, value)}
                          autoComplete="tel"
                          placeholder={field.placeholder}
                          data-slot="input-group-control"
                          className="flex h-9 flex-1 rounded-none border-0 bg-transparent px-3 py-2 text-sm shadow-none ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 dark:bg-transparent"
                        />
                      </InputGroup>
                    ) : (
                      <InputGroup>
                        {fieldIcon && (
                          <InputGroupAddon align="inline-start">
                            {fieldIcon}
                          </InputGroupAddon>
                        )}
                        <InputGroupInput
                          type={field.fieldType}
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={String(fieldValue)}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          autoComplete={
                            field.fieldType === 'email' ? 'email' :
                            field.fieldType === 'tel' ? 'tel' :
                            field.name.toLowerCase().includes('name') ? 'name' :
                            field.name.toLowerCase().includes('phone') ? 'tel' :
                            'on'
                          }
                        />
                      </InputGroup>
                    )}

                    {fieldError && <FieldError>{fieldError}</FieldError>}
                  </Field>
                )
              })}
            </div>
          </FieldGroup>

          {/* Текст согласия */}
          {consentText && (
            <div className="mt-4 p-3 bg-muted/50 rounded-md">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {consentText.split(/(обработку персональных данных|политикой конфиденциальности)/gi).map((part, i) => {
                  if (part.match(/обработку персональных данных/i)) {
                    return (
                      <Link
                        key={i}
                        href="/personal-data"
                        className="text-primary hover:underline"
                        target="_blank"
                      >
                        {part}
                      </Link>
                    )
                  }
                  if (part.match(/политикой конфиденциальности/i)) {
                    return (
                      <Link
                        key={i}
                        href="/privacy-policy"
                        className="text-primary hover:underline"
                        target="_blank"
                      >
                        {part}
                      </Link>
                    )
                  }
                  return <span key={i}>{part}</span>
                })}
              </p>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
