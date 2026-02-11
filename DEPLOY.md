# Деплой сайта на хостинг

## Рекомендуемые платформы для Next.js

### 1. Vercel (Рекомендуется) ⭐

**Плюсы:** Бесплатный тариф, автоматический деплой из Git, оптимизация Next.js

#### Шаги:

1. **Подготовьте проект:**
   ```bash
   # Убедитесь, что все изменения закоммичены
   git add .
   git commit -m "Ready for deployment"
   ```

2. **Создайте аккаунт на Vercel:**
   - Перейдите на https://vercel.com
   - Войдите через GitHub/GitLab/Bitbucket

3. **Импортируйте проект:**
   - Нажмите "New Project"
   - Выберите ваш репозиторий
   - Vercel автоматически определит Next.js

4. **Настройте переменные окружения:**
   - В настройках проекта → Environment Variables
   - Добавьте все переменные из `.env`:
     ```
     JWT_SECRET=ваш-секретный-ключ
     RESEND_API_KEY=ваш-ключ (если используете)
     SMSRU_API_ID=ваш-id (если используете)
     RESEND_FROM_EMAIL=ваш-email
     NODE_ENV=production
     ```

5. **Деплой:**
   - Нажмите "Deploy"
   - Vercel автоматически соберет и задеплоит проект
   - Получите URL вида: `your-project.vercel.app`

**Бесплатный тариф включает:**
- 100GB bandwidth/месяц
- Автоматические SSL сертификаты
- CDN по всему миру

---

### 2. Netlify

**Плюсы:** Простой интерфейс, хорошая интеграция с Git

#### Шаги:

1. **Создайте `netlify.toml` в корне проекта:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Создайте аккаунт на Netlify:**
   - https://netlify.com
   - Войдите через Git

3. **Импортируйте проект:**
   - "New site from Git"
   - Выберите репозиторий
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Настройте переменные окружения:**
   - Site settings → Environment variables
   - Добавьте все переменные

5. **Деплой:**
   - Netlify автоматически задеплоит при каждом push в Git

---

### 3. Railway

**Плюсы:** Простой деплой, поддержка баз данных

#### Шаги:

1. **Создайте аккаунт:** https://railway.app

2. **Создайте новый проект:**
   - "New Project" → "Deploy from GitHub repo"
   - Выберите репозиторий

3. **Настройте переменные:**
   - Variables → Add Variable
   - Добавьте все переменные из `.env`

4. **Railway автоматически:**
   - Определит Next.js
   - Установит зависимости
   - Задеплоит проект

---

### 4. DigitalOcean App Platform

**Плюсы:** Хорошая производительность, разумные цены

#### Шаги:

1. **Создайте аккаунт:** https://digitalocean.com

2. **Создайте App:**
   - Apps → Create App
   - Connect GitHub repository
   - Выберите репозиторий

3. **Настройте:**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment Variables: добавьте все переменные

4. **Деплой:**
   - DigitalOcean соберет и задеплоит проект

---

## Подготовка к деплою

### 1. Проверьте сборку локально:

```bash
npm run build
npm start
```

Убедитесь, что проект собирается без ошибок.

### 2. Создайте `.gitignore` (если нет):

```gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

### 3. Обновите `package.json` (если нужно):

Убедитесь, что есть скрипты:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 4. Настройте домен (опционально):

После деплоя вы можете добавить свой домен:
- **Vercel:** Settings → Domains → Add Domain
- **Netlify:** Domain settings → Add custom domain
- **Railway:** Settings → Domains → Add Domain

---

## Переменные окружения для продакшена

Обязательно настройте в панели хостинга:

```env
# Обязательно измените на случайную строку!
JWT_SECRET=сгенерируйте-через-openssl-rand-base64-32

# Если используете Email
RESEND_API_KEY=ваш-ключ
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Если используете SMS
SMSRU_API_ID=ваш-id

# Окружение
NODE_ENV=production
```

---

## После деплоя

1. **Проверьте работу сайта:**
   - Откройте URL, предоставленный хостингом
   - Проверьте все страницы
   - Протестируйте авторизацию

2. **Настройте SSL:**
   - Большинство платформ настраивают SSL автоматически
   - Убедитесь, что сайт открывается по HTTPS

3. **Проверьте переменные окружения:**
   - Убедитесь, что все переменные установлены
   - Особенно важно: `JWT_SECRET` должен быть уникальным

4. **Мониторинг:**
   - Настройте уведомления об ошибках
   - Проверьте логи в панели хостинга

---

## Рекомендации

### Для начала (бесплатно):
- **Vercel** — лучший выбор для Next.js
- Автоматический деплой из Git
- Бесплатный SSL
- CDN включен

### Для продакшена с высокой нагрузкой:
- **Vercel Pro** ($20/месяц) или **Railway** ($5/месяц)
- Больше ресурсов
- Приоритетная поддержка

### Если нужна база данных:
- **Railway** или **DigitalOcean** с PostgreSQL
- Или внешний сервис: **Supabase**, **PlanetScale**

---

## Troubleshooting

### Ошибка сборки:
```bash
# Проверьте локально
npm run build
```

### Переменные окружения не работают:
- Убедитесь, что переменные добавлены в панели хостинга
- Перезапустите деплой после добавления переменных

### API routes не работают:
- Проверьте, что используете правильный URL (не localhost)
- Убедитесь, что `NODE_ENV=production`

### Ошибки авторизации:
- Проверьте `JWT_SECRET` — должен быть установлен
- Убедитесь, что cookies работают (проверьте домен)

---

## Быстрый старт (Vercel)

```bash
# 1. Установите Vercel CLI
npm i -g vercel

# 2. Войдите
vercel login

# 3. Деплой
vercel

# 4. Продакшен деплой
vercel --prod
```

Или просто подключите GitHub репозиторий через веб-интерфейс Vercel.
