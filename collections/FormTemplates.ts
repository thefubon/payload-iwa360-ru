// Шаблоны форм для быстрого создания

export const FORM_TEMPLATES = {
  contact: {
    title: 'Связаться с нами',
    submitButtonText: 'Отправить',
    fields: [
      {
        name: 'name',
        label: 'Ваше имя',
        fieldType: 'text',
        placeholder: 'Иван Иванов',
        required: true,
        width: 'full',
      },
      {
        name: 'email',
        label: 'Email',
        fieldType: 'email',
        placeholder: 'ivan@example.com',
        required: true,
        width: 'full',
      },
      {
        name: 'message',
        label: 'Сообщение',
        fieldType: 'textarea',
        placeholder: 'Расскажите, чем мы можем помочь...',
        required: true,
        width: 'full',
      },
    ],
  },
  callback: {
    title: 'Заказать звонок',
    submitButtonText: 'Заказать звонок',
    fields: [
      {
        name: 'name',
        label: 'Ваше имя',
        fieldType: 'text',
        placeholder: 'Иван Иванов',
        required: true,
        width: 'half',
      },
      {
        name: 'phone',
        label: 'Телефон',
        fieldType: 'tel',
        placeholder: '+7 (999) 123-45-67',
        required: true,
        width: 'half',
      },
    ],
  },
  consultation: {
    title: 'Записаться на консультацию',
    submitButtonText: 'Записаться',
    fields: [
      {
        name: 'name',
        label: 'Ваше имя',
        fieldType: 'text',
        placeholder: 'Иван Иванов',
        required: true,
        width: 'full',
      },
      {
        name: 'email',
        label: 'Email',
        fieldType: 'email',
        placeholder: 'ivan@example.com',
        required: true,
        width: 'half',
      },
      {
        name: 'phone',
        label: 'Телефон',
        fieldType: 'tel',
        placeholder: '+7 (999) 123-45-67',
        required: true,
        width: 'half',
      },
      {
        name: 'topic',
        label: 'Тема консультации',
        fieldType: 'select',
        options: 'Внедрение решений\nТехническая поддержка\nОбучение персонала\nДругое',
        required: false,
        width: 'full',
      },
      {
        name: 'comment',
        label: 'Дополнительная информация',
        fieldType: 'textarea',
        placeholder: 'Расскажите подробнее...',
        required: false,
        width: 'full',
      },
    ],
  },
  demo: {
    title: 'Демонстрация продукта',
    submitButtonText: 'Запросить демо',
    fields: [
      {
        name: 'company',
        label: 'Компания',
        fieldType: 'text',
        placeholder: 'ООО "Компания"',
        required: true,
        width: 'full',
      },
      {
        name: 'name',
        label: 'Контактное лицо',
        fieldType: 'text',
        placeholder: 'Иван Иванов',
        required: true,
        width: 'half',
      },
      {
        name: 'position',
        label: 'Должность',
        fieldType: 'text',
        placeholder: 'Руководитель отдела',
        required: false,
        width: 'half',
      },
      {
        name: 'email',
        label: 'Email',
        fieldType: 'email',
        placeholder: 'ivan@company.ru',
        required: true,
        width: 'half',
      },
      {
        name: 'phone',
        label: 'Телефон',
        fieldType: 'tel',
        placeholder: '+7 (999) 123-45-67',
        required: true,
        width: 'half',
      },
      {
        name: 'product',
        label: 'Интересующий продукт',
        fieldType: 'select',
        options: 'IWA Встречи\nIWA Вебинары\nIWA Трансляции\nIWA Мессенджер\nIWA Почта\nIWA Диск',
        required: true,
        width: 'full',
      },
    ],
  },
  feedback: {
    title: 'Оставить отзыв',
    submitButtonText: 'Отправить отзыв',
    fields: [
      {
        name: 'name',
        label: 'Ваше имя',
        fieldType: 'text',
        placeholder: 'Иван Иванов',
        required: true,
        width: 'full',
      },
      {
        name: 'email',
        label: 'Email',
        fieldType: 'email',
        placeholder: 'ivan@example.com',
        required: true,
        width: 'full',
      },
      {
        name: 'rating',
        label: 'Оценка',
        fieldType: 'select',
        options: '5 - Отлично\n4 - Хорошо\n3 - Нормально\n2 - Плохо\n1 - Ужасно',
        required: true,
        width: 'full',
      },
      {
        name: 'feedback',
        label: 'Ваш отзыв',
        fieldType: 'textarea',
        placeholder: 'Поделитесь своим мнением...',
        required: true,
        width: 'full',
      },
    ],
  },
}

export type TemplateKey = keyof typeof FORM_TEMPLATES

// Функция для получения шаблона
export const getFormTemplate = (templateKey: TemplateKey) => {
  return FORM_TEMPLATES[templateKey]
}

