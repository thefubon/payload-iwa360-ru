# 📦 Database Migrations

## Как применить миграцию на production

### Вариант 1: Через Vercel Postgres Dashboard (рекомендуется)

1. Откройте ваш проект на [Vercel Dashboard](https://vercel.com/dashboard)
2. Перейдите в **Storage** → выберите вашу PostgreSQL базу данных
3. Нажмите **"Query"** или **".sql"** вкладку
4. Скопируйте и вставьте содержимое файла `update-schema-2025-10-06.sql`
5. Нажмите **"Run Query"**
6. Проверьте результаты выполнения

### Вариант 2: Через psql (для продвинутых)

```bash
# Подключитесь к вашей production БД
psql "postgresql://user:password@host:port/database"

# Выполните миграцию
\i migrations/update-schema-2025-10-06.sql

# Проверьте результат
\d home_page
```

### Вариант 3: Автоматическое применение через Payload (только для локальной разработки)

⚠️ **НЕ используйте на production!**

В `payload.config.ts` уже установлено `push: true`, что означает автоматическое применение изменений схемы при запуске `pnpm dev`.

Для production лучше использовать ручные миграции (Вариант 1 или 2).

## Список миграций

### 2025-10-06: Адаптивные боковые отступы + роль Viewer

**Файл:** `update-schema-2025-10-06.sql`

**Изменения:**
1. ✅ Добавлены 12 новых полей в `home_page`:
   - `decorative_line_settings_left_offset_mobile`
   - `decorative_line_settings_left_offset_sm`
   - `decorative_line_settings_left_offset_md`
   - `decorative_line_settings_left_offset_lg`
   - `decorative_line_settings_left_offset_xl`
   - `decorative_line_settings_left_offset2xl`
   - `decorative_line_settings_right_offset_mobile`
   - `decorative_line_settings_right_offset_sm`
   - `decorative_line_settings_right_offset_md`
   - `decorative_line_settings_right_offset_lg`
   - `decorative_line_settings_right_offset_xl`
   - `decorative_line_settings_right_offset2xl`

2. ✅ Добавлено новое значение `'viewer'` в enum `enum_users_role`

**Статус:** ⏳ Требует применения на production

## Проверка успешности миграции

После применения миграции выполните:

```sql
-- Проверка новых колонок
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'home_page' 
AND column_name LIKE '%offset%'
ORDER BY column_name;

-- Проверка enum значений для ролей
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_users_role')
ORDER BY enumsortorder;
```

Ожидаемый результат:
- Должны появиться 12 новых колонок с типом `numeric`
- В enum должны быть значения: `admin`, `user`, `editor`, `viewer`

## Откат миграции (Rollback)

⚠️ **Используйте с осторожностью!**

Если нужно откатить изменения, раскомментируйте блок `ROLLBACK` в файле миграции.

**Важно:** PostgreSQL не позволяет удалять значения из enum без пересоздания типа. Если вы добавили роль `viewer`, откат будет сложным.

## Автоматизация (TODO)

В будущем можно настроить автоматическое применение миграций через:
- GitHub Actions
- Vercel Deploy Hooks
- Custom migration runner

## 🆘 Помощь

Если миграция не применилась:

1. Проверьте логи ошибок PostgreSQL
2. Убедитесь, что у вас есть права на изменение схемы
3. Проверьте, что база данных доступна
4. Попробуйте применить команды по одной

