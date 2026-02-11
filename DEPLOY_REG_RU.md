# Деплой на Reg.ru (VPS)

## Требования

Для Next.js приложения нужен **VPS** (виртуальный выделенный сервер) с:
- Ubuntu 20.04+ или Debian 11+
- Минимум 1GB RAM
- Root доступ

## Шаг 1: Подготовка сервера

### 1.1 Подключитесь к серверу

```bash
ssh root@ваш-ip-адрес
```

### 1.2 Обновите систему

```bash
apt update && apt upgrade -y
```

### 1.3 Установите Node.js 20.x

```bash
# Установка Node.js через NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Проверьте версию
node --version
npm --version
```

### 1.4 Установите PM2 (менеджер процессов)

```bash
npm install -g pm2
```

### 1.5 Установите Nginx

```bash
apt install -y nginx
```

---

## Шаг 2: Загрузка проекта на сервер

### Вариант A: Через Git (рекомендуется)

```bash
# Установите Git
apt install -y git

# Создайте директорию для проекта
mkdir -p /var/www/luxe-segment
cd /var/www/luxe-segment

# Клонируйте репозиторий
git clone https://github.com/ваш-username/ваш-репозиторий.git .

# Или если репозиторий приватный, используйте SSH ключ
```

### Вариант B: Через SCP (если нет Git)

На вашем локальном компьютере:

```bash
# Создайте архив проекта (исключая node_modules)
tar --exclude='node_modules' --exclude='.next' -czf luxe-segment.tar.gz .

# Загрузите на сервер
scp luxe-segment.tar.gz root@ваш-ip:/var/www/

# На сервере распакуйте
ssh root@ваш-ip
cd /var/www
tar -xzf luxe-segment.tar.gz
mv luxe-segment luxe-segment
```

---

## Шаг 3: Настройка проекта

### 3.1 Установите зависимости

```bash
cd /var/www/luxe-segment
npm install --production
```

### 3.2 Создайте файл `.env`

```bash
nano .env
```

Добавьте:

```env
JWT_SECRET=сгенерируйте-ключ-через-openssl-rand-base64-32
NODE_ENV=production
RESEND_API_KEY=ваш-ключ (если используете)
SMSRU_API_ID=ваш-id (если используете)
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

Сохраните: `Ctrl+O`, `Enter`, `Ctrl+X`

### 3.3 Соберите проект

```bash
npm run build
```

---

## Шаг 4: Запуск через PM2

### 4.1 Создайте файл конфигурации PM2

```bash
nano ecosystem.config.js
```

Добавьте:

```javascript
module.exports = {
  apps: [{
    name: 'luxe-segment',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/luxe-segment',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/luxe-segment-error.log',
    out_file: '/var/log/pm2/luxe-segment-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

### 4.2 Создайте директорию для логов

```bash
mkdir -p /var/log/pm2
```

### 4.3 Запустите приложение

```bash
cd /var/www/luxe-segment
pm2 start ecosystem.config.js
```

### 4.4 Сохраните конфигурацию PM2

```bash
pm2 save
pm2 startup
```

Выполните команду, которую выведет `pm2 startup` (она будет содержать `sudo env PATH=...`)

---

## Шаг 5: Настройка Nginx

### 5.1 Создайте конфигурацию Nginx

```bash
nano /etc/nginx/sites-available/luxe-segment
```

Добавьте:

```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    # Логи
    access_log /var/log/nginx/luxe-segment-access.log;
    error_log /var/log/nginx/luxe-segment-error.log;

    # Максимальный размер загружаемых файлов
    client_max_body_size 20M;

    # Проксирование на Next.js
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
        
        # Таймауты
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Статические файлы Next.js (опционально, для оптимизации)
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5.2 Активируйте конфигурацию

```bash
ln -s /etc/nginx/sites-available/luxe-segment /etc/nginx/sites-enabled/
```

### 5.3 Проверьте конфигурацию

```bash
nginx -t
```

### 5.4 Перезапустите Nginx

```bash
systemctl restart nginx
systemctl enable nginx
```

---

## Шаг 6: Настройка SSL (Let's Encrypt)

### 6.1 Установите Certbot

```bash
apt install -y certbot python3-certbot-nginx
```

### 6.2 Получите SSL сертификат

```bash
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

Следуйте инструкциям:
- Введите email
- Согласитесь с условиями
- Выберите редирект HTTP → HTTPS

### 6.3 Автоматическое обновление сертификата

Certbot автоматически настроит cron для обновления сертификата.

Проверьте:

```bash
certbot renew --dry-run
```

---

## Шаг 7: Настройка файрвола

### 7.1 Настройте UFW (если установлен)

```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

---

## Шаг 8: Проверка работы

1. Откройте в браузере: `https://ваш-домен.ru`
2. Проверьте все страницы
3. Протестируйте авторизацию

---

## Полезные команды

### Управление приложением

```bash
# Статус
pm2 status

# Логи
pm2 logs luxe-segment

# Перезапуск
pm2 restart luxe-segment

# Остановка
pm2 stop luxe-segment

# Мониторинг
pm2 monit
```

### Обновление проекта

```bash
cd /var/www/luxe-segment

# Если используете Git
git pull origin main

# Установите зависимости (если добавились новые)
npm install --production

# Пересоберите
npm run build

# Перезапустите
pm2 restart luxe-segment
```

### Логи Nginx

```bash
# Просмотр логов
tail -f /var/log/nginx/luxe-segment-access.log
tail -f /var/log/nginx/luxe-segment-error.log
```

---

## Настройка домена в Reg.ru

1. Войдите в панель управления Reg.ru
2. Перейдите в раздел "Домены"
3. Выберите ваш домен → "DNS-серверы и зона"
4. Добавьте A-запись:
   - Тип: A
   - Имя: @ (или оставьте пустым)
   - Значение: IP-адрес вашего VPS
   - TTL: 3600

5. Для поддомена www добавьте еще одну A-запись:
   - Тип: A
   - Имя: www
   - Значение: IP-адрес вашего VPS
   - TTL: 3600

---

## Troubleshooting

### Приложение не запускается

```bash
# Проверьте логи PM2
pm2 logs luxe-segment --lines 50

# Проверьте, что порт 3000 свободен
netstat -tulpn | grep 3000

# Проверьте переменные окружения
cd /var/www/luxe-segment
cat .env
```

### Nginx не работает

```bash
# Проверьте статус
systemctl status nginx

# Проверьте конфигурацию
nginx -t

# Проверьте логи
tail -f /var/log/nginx/error.log
```

### SSL сертификат не обновляется

```bash
# Проверьте автоматическое обновление
certbot renew --dry-run

# Обновите вручную
certbot renew
systemctl reload nginx
```

### Проблемы с правами доступа

```bash
# Установите правильные права
chown -R www-data:www-data /var/www/luxe-segment
chmod -R 755 /var/www/luxe-segment
```

---

## Оптимизация производительности

### Увеличение лимитов Node.js

```bash
nano /etc/systemd/system/pm2-root.service
```

Добавьте в `[Service]`:

```
LimitNOFILE=65536
```

Перезапустите:

```bash
systemctl daemon-reload
systemctl restart pm2-root
```

### Настройка кэширования в Nginx

Добавьте в конфигурацию Nginx (внутри `server`):

```nginx
# Кэширование статических файлов
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```

---

## Резервное копирование

### Создайте скрипт бэкапа

```bash
nano /root/backup-luxe-segment.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Бэкап проекта
tar -czf $BACKUP_DIR/luxe-segment-$DATE.tar.gz /var/www/luxe-segment

# Удалите старые бэкапы (старше 7 дней)
find $BACKUP_DIR -name "luxe-segment-*.tar.gz" -mtime +7 -delete

echo "Backup completed: luxe-segment-$DATE.tar.gz"
```

Сделайте исполняемым:

```bash
chmod +x /root/backup-luxe-segment.sh
```

Добавьте в cron (ежедневно в 3:00):

```bash
crontab -e
```

Добавьте:

```
0 3 * * * /root/backup-luxe-segment.sh
```

---

## Готово!

Ваш сайт должен быть доступен по адресу `https://ваш-домен.ru`

Если возникнут проблемы, проверьте логи и убедитесь, что все шаги выполнены правильно.
