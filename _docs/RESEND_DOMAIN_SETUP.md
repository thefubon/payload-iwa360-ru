# 🌐 Настройка домена в Resend

Пошаговое руководство по добавлению и верификации домена в Resend.

---

## 🎯 Зачем нужен домен?

### Без домена (onboarding@resend.dev):
- ✅ Работает сразу
- ❌ Письма отправляются только на ваш email (тот, что в аккаунте Resend)
- ❌ Нельзя отправлять клиентам
- ✅ Подходит для тестирования

### С доменом (noreply@yourdomain.com):
- ✅ Можно отправлять на любые email
- ✅ Профессиональный вид писем
- ✅ Лучшая доставляемость
- ✅ Подходит для production

---

## 🚀 Быстрая настройка (для теста)

Если вам нужно ПРЯМО СЕЙЧАС протестировать:

### 1. Создайте `.env` файл:

```bash
# В корне проекта создайте .env
DATABASE_URI=postgresql://user:password@localhost:5432/dbname
PAYLOAD_SECRET=your-secret-key-minimum-32-characters

# EMAIL (для ТЕСТИРОВАНИЯ)
RESEND_API_KEY=re_ваш_ключ_здесь
RESEND_FROM_EMAIL=onboarding@resend.dev

# NEXT.JS
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 2. Перезапустите сервер:

```bash
pnpm dev
```

### 3. Отправьте форму:

- Письмо придет ТОЛЬКО на email, который вы указали при регистрации в Resend
- Это нормально для тестирования!

---

## 📧 Настройка своего домена (для production)

### Шаг 1: Добавьте домен в Resend

1. Войдите в [resend.com](https://resend.com)
2. Перейдите в **Domains**
3. Нажмите **Add Domain**
4. Введите ваш домен: `yourdomain.com` (без www, без http://)
5. Нажмите **Add**

### Шаг 2: Получите DNS записи

После добавления домена Resend покажет **3 DNS записи**:

#### 1. SPF запись (TXT)
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

#### 2. DKIM запись (TXT)
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGS... (длинная строка)
```

#### 3. DMARC запись (TXT)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@resend.com
```

### Шаг 3: Добавьте записи в DNS

Зависит от вашего регистратора домена:

#### Если домен на **Cloudflare**:

1. Войдите в Cloudflare
2. Выберите ваш домен
3. Перейдите в **DNS** → **Records**
4. Нажмите **Add record**
5. Добавьте все 3 записи:

**SPF:**
- Type: `TXT`
- Name: `@`
- Content: `v=spf1 include:_spf.resend.com ~all`
- Proxy status: DNS only (серое облако)

**DKIM:**
- Type: `TXT`
- Name: `resend._domainkey`
- Content: (скопируйте из Resend)
- Proxy status: DNS only

**DMARC:**
- Type: `TXT`
- Name: `_dmarc`
- Content: `v=DMARC1; p=none; rua=mailto:dmarc@resend.com`
- Proxy status: DNS only

#### Если домен на **REG.RU**:

1. Войдите в панель REG.RU
2. Выберите домен → **Управление DNS**
3. Добавьте **TXT записи**:

```
@                     TXT  v=spf1 include:_spf.resend.com ~all
resend._domainkey     TXT  (значение из Resend)
_dmarc                TXT  v=DMARC1; p=none; rua=mailto:dmarc@resend.com
```

#### Если домен на **Timeweb/Beget/и т.д.**:

Аналогично - добавьте 3 TXT записи в панели управления доменом.

### Шаг 4: Дождитесь верификации

1. DNS записи распространяются от **5 минут до 48 часов**
2. В Resend проверяйте статус домена:
   - **Pending** - ожидание верификации
   - **Verified** ✅ - домен проверен, можно использовать!

3. Можно проверить вручную:
   ```bash
   # Проверка SPF
   nslookup -type=txt yourdomain.com
   
   # Проверка DKIM
   nslookup -type=txt resend._domainkey.yourdomain.com
   ```

### Шаг 5: Обновите `.env`

После верификации домена:

```bash
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

Или:
```bash
RESEND_FROM_EMAIL=support@yourdomain.com
RESEND_FROM_EMAIL=hello@yourdomain.com
```

### Шаг 6: Перезапустите сервер

```bash
pnpm dev
```

---

## ✅ Проверка работы

### 1. Проверьте статус домена в Resend:

```
Domains → yourdomain.com → Status: Verified ✅
```

### 2. Отправьте тестовую форму:

- Заполните форму на сайте
- Проверьте консоль сервера:
  ```
  ✅ Email успешно отправлен: { id: 're_xxx...' }
  ```

### 3. Проверьте почту:

- Письмо должно прийти на email получателя (указанный в форме)
- Отправитель: `noreply@yourdomain.com`

---

## 🔧 Troubleshooting

### Проблема: "Domain not verified"

**Причина:** DNS записи еще не распространились или неправильно добавлены.

**Решение:**
1. Подождите 1-2 часа
2. Проверьте DNS записи через `nslookup`
3. Убедитесь, что записи добавлены **точно** как в Resend
4. В Cloudflare проверьте, что **Proxy status: DNS only** (серое облако)

### Проблема: "The 'from' address is not verified"

**Причина:** Email адрес не соответствует верифицированному домену.

**Решение:**
```diff
# ❌ Неправильно (если домен не yourdomain.com)
- RESEND_FROM_EMAIL=noreply@example.com

# ✅ Правильно
+ RESEND_FROM_EMAIL=noreply@yourdomain.com
```

Или используйте для теста:
```bash
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Проблема: Письма попадают в спам

**Решение:**
1. Убедитесь, что все 3 DNS записи добавлены (SPF, DKIM, DMARC)
2. Дождитесь полной верификации домена
3. Первые письма могут попасть в спам - это нормально
4. Используйте профессиональный контент писем
5. Не отправляйте слишком много писем сразу (spam detection)

### Проблема: DNS записи не сохраняются

**Причина:** Возможно, у вас есть конфликтующие записи.

**Решение:**
1. Проверьте, нет ли уже записи с таким же именем
2. Удалите старые конфликтующие записи
3. Добавьте новые записи из Resend

---

## 📊 Примеры настройки для популярных хостингов

### Cloudflare (рекомендуется)

```
SPF:
Type: TXT
Name: @
Content: v=spf1 include:_spf.resend.com ~all
Proxy: DNS only ⚠️ ВАЖНО!

DKIM:
Type: TXT
Name: resend._domainkey
Content: [из Resend]
Proxy: DNS only ⚠️ ВАЖНО!

DMARC:
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=none; rua=mailto:dmarc@resend.com
Proxy: DNS only
```

### REG.RU

```
Управление DNS → Добавить TXT запись:

@                     v=spf1 include:_spf.resend.com ~all
resend._domainkey     [значение из Resend]
_dmarc                v=DMARC1; p=none; rua=mailto:dmarc@resend.com
```

### Timeweb

```
DNS → Управление зоной → Добавить запись:

Тип: TXT
Имя: @
Значение: v=spf1 include:_spf.resend.com ~all

Тип: TXT
Имя: resend._domainkey
Значение: [из Resend]

Тип: TXT
Имя: _dmarc
Значение: v=DMARC1; p=none; rua=mailto:dmarc@resend.com
```

---

## 💡 Частые вопросы

### Вопрос: Можно ли использовать поддомен?

**Ответ:** Да! Можно использовать `mail.yourdomain.com`:
1. Добавьте в Resend: `mail.yourdomain.com`
2. DNS записи будут с префиксом домена
3. Email: `noreply@mail.yourdomain.com`

### Вопрос: Сколько времени действует верификация?

**Ответ:** Бессрочно, пока DNS записи на месте.

### Вопрос: Можно ли добавить несколько доменов?

**Ответ:** 
- Бесплатный план: 1 домен
- Платный план: неограниченно

### Вопрос: Что делать, если домен на другом языке (кириллица)?

**Ответ:** Используйте Punycode версию домена:
- `домен.рф` → `xn--d1acufc.xn--p1ai`
- Конвертер: [punycoder.com](https://www.punycoder.com/)

---

## 📞 Дополнительная помощь

- **Resend Docs:** [resend.com/docs/send-with-nextjs](https://resend.com/docs/send-with-nextjs)
- **Resend Support:** support@resend.com
- **DNS Checker:** [whatsmydns.net](https://www.whatsmydns.net/)

---

## ✅ Чек-лист настройки домена

- [ ] Домен добавлен в Resend
- [ ] SPF запись добавлена в DNS
- [ ] DKIM запись добавлена в DNS
- [ ] DMARC запись добавлена в DNS
- [ ] Подождали 1-2 часа распространения DNS
- [ ] Статус домена в Resend: **Verified** ✅
- [ ] `.env` обновлен: `RESEND_FROM_EMAIL=noreply@yourdomain.com`
- [ ] Сервер перезапущен
- [ ] Тестовое письмо отправлено успешно

---

**Последнее обновление:** Октябрь 2025

