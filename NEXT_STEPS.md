# Что дальше: Деплой на Reg.ru VPS

## ✅ Что уже сделано:
- Код загружен на GitHub
- Репозиторий: https://github.com/hjj96/luxe-segment

## 🚀 Следующие шаги: Деплой на сервер Reg.ru

### Шаг 1: Подготовка сервера

1. **Подключитесь к серверу Reg.ru:**
   ```bash
   ssh root@ваш-ip-адрес
   ```
   (IP адрес можно найти в панели управления Reg.ru)

2. **Обновите систему:**
   ```bash
   apt update && apt upgrade -y
   ```

### Шаг 2: Установка необходимого ПО

```bash
# Установите Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Установите PM2 (менеджер процессов)
npm install -g pm2

# Установите Nginx
apt install -y nginx

# Установите Git (если еще не установлен)
apt install -y git
```

### Шаг 3: Клонирование проекта с GitHub

```bash
# Создайте директорию для проекта
mkdir -p /var/www/luxe-segment
cd /var/www/luxe-segment

# Клонируйте репозиторий
git clone https://github.com/hjj96/luxe-segment.git .

# Или если репозиторий приватный, используйте токен:
# git clone https://ghp_ВАШ_ТОКЕН@github.com/hjj96/luxe-segment.git .
```

### Шаг 4: Настройка проекта

```bash
cd /var/www/luxe-segment

# Установите зависимости
npm install --production

# Создайте файл .env
nano .env
```

Добавьте в `.env`:
```env
JWT_SECRET=сгенерируйте-ключ-через-openssl-rand-base64-32
NODE_ENV=production
RESEND_API_KEY=ваш-ключ (если используете email)
SMSRU_API_ID=ваш-id (если используете SMS)
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

Сохраните: `Ctrl+O`, `Enter`, `Ctrl+X`

```bash
# Соберите проект
npm run build
```

### Шаг 5: Запуск через PM2

```bash
# Запустите приложение
pm2 start ecosystem.config.js

# Сохраните конфигурацию PM2
pm2 save

# Настройте автозапуск при перезагрузке сервера
pm2 startup
# Выполните команду, которую выведет PM2 (она будет содержать sudo env PATH=...)
```

### Шаг 6: Настройка Nginx

```bash
# Создайте конфигурацию Nginx
nano /etc/nginx/sites-available/luxe-segment
```

Скопируйте содержимое из файла `nginx.conf.example` и замените `ваш-домен.ru` на ваш реальный домен.

Или создайте конфигурацию:

```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    access_log /var/log/nginx/luxe-segment-access.log;
    error_log /var/log/nginx/luxe-segment-error.log;

    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

```bash
# Активируйте конфигурацию
ln -s /etc/nginx/sites-available/luxe-segment /etc/nginx/sites-enabled/

# Проверьте конфигурацию
nginx -t

# Перезапустите Nginx
systemctl restart nginx
systemctl enable nginx
```

### Шаг 7: Настройка SSL (Let's Encrypt)

```bash
# Установите Certbot
apt install -y certbot python3-certbot-nginx

# Получите SSL сертификат
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

Следуйте инструкциям:
- Введите email
- Согласитесь с условиями
- Выберите редирект HTTP → HTTPS

### Шаг 8: Настройка DNS в Reg.ru

1. Войдите в панель управления Reg.ru
2. Перейдите в раздел **"Домены"**
3. Выберите ваш домен → **"DNS-серверы и зона"**
4. Добавьте **A-запись**:
   - **Тип**: A
   - **Имя**: @ (или оставьте пустым)
   - **Значение**: IP-адрес вашего VPS
   - **TTL**: 3600
5. Добавьте еще одну **A-запись** для www:
   - **Тип**: A
   - **Имя**: www
   - **Значение**: IP-адрес вашего VPS
   - **TTL**: 3600

### Шаг 9: Проверка работы

1. Подождите 5-10 минут (пока DNS обновится)
2. Откройте в браузере: `https://ваш-домен.ru`
3. Проверьте все страницы сайта
4. Протестируйте авторизацию

---

## 📋 Быстрый чеклист

- [ ] Подключился к серверу Reg.ru
- [ ] Установил Node.js, PM2, Nginx
- [ ] Клонировал проект с GitHub
- [ ] Создал `.env` файл с переменными окружения
- [ ] Собрал проект (`npm run build`)
- [ ] Запустил через PM2
- [ ] Настроил Nginx
- [ ] Установил SSL через Certbot
- [ ] Настроил DNS записи в Reg.ru
- [ ] Проверил работу сайта

---

## 🔧 Полезные команды для управления

### Управление приложением:
```bash
pm2 status              # Статус
pm2 logs luxe-segment   # Логи
pm2 restart luxe-segment # Перезапуск
pm2 stop luxe-segment   # Остановка
```

### Обновление проекта:
```bash
cd /var/www/luxe-segment
git pull origin main
npm install --production
npm run build
pm2 restart luxe-segment
```

### Логи:
```bash
# Логи приложения
pm2 logs luxe-segment

# Логи Nginx
tail -f /var/log/nginx/luxe-segment-access.log
tail -f /var/log/nginx/luxe-segment-error.log
```

---

## 📚 Дополнительные инструкции

- **Подробная инструкция**: `DEPLOY_REG_RU.md`
- **Быстрый старт**: `QUICK_DEPLOY_REG_RU.md`
- **Настройка авторизации**: `SETUP_AUTH.md`

---

## ❓ Если что-то не работает

### Приложение не запускается:
```bash
pm2 logs luxe-segment --lines 50
```

### Nginx не работает:
```bash
nginx -t
systemctl status nginx
```

### SSL не устанавливается:
```bash
certbot renew --dry-run
```

### DNS не обновляется:
- Подождите до 24 часов (обычно 5-10 минут)
- Проверьте DNS: https://dnschecker.org

---

## 🎉 Готово!

После выполнения всех шагов ваш сайт будет доступен по адресу `https://ваш-домен.ru`

Удачи с деплоем! 🚀
