# Быстрый деплой на Reg.ru VPS

## Что нужно

- VPS от Reg.ru (минимум 1GB RAM)
- Домен, привязанный к Reg.ru
- SSH доступ к серверу

---

## Быстрый старт (пошагово)

### 1. Подключитесь к серверу

```bash
ssh root@ваш-ip-адрес
```

### 2. Запустите скрипт автоматической установки

```bash
# Загрузите скрипт на сервер (или скопируйте содержимое deploy-reg-ru.sh)
# Затем выполните:
chmod +x deploy-reg-ru.sh
sudo ./deploy-reg-ru.sh
```

**Или выполните вручную:**

### 2.1 Установите Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

### 2.2 Установите PM2 и Nginx

```bash
npm install -g pm2
apt install -y nginx
```

### 2.3 Загрузите проект

```bash
mkdir -p /var/www/luxe-segment
cd /var/www/luxe-segment

# Вариант A: Через Git
git clone https://github.com/ваш-username/репозиторий.git .

# Вариант B: Через SCP (с локального компьютера)
# scp -r . root@ваш-ip:/var/www/luxe-segment/
```

### 2.4 Установите зависимости и соберите

```bash
cd /var/www/luxe-segment
npm install --production
npm run build
```

### 2.5 Создайте .env файл

```bash
nano .env
```

Добавьте:
```
JWT_SECRET=сгенерируйте-через-openssl-rand-base64-32
NODE_ENV=production
```

### 2.6 Запустите через PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Выполните команду, которую выведет PM2
```

### 3. Настройте Nginx

```bash
# Скопируйте конфигурацию
cp nginx.conf.example /etc/nginx/sites-available/luxe-segment

# Отредактируйте, заменив "ваш-домен.ru" на ваш домен
nano /etc/nginx/sites-available/luxe-segment

# Активируйте
ln -s /etc/nginx/sites-available/luxe-segment /etc/nginx/sites-enabled/

# Проверьте и перезапустите
nginx -t
systemctl restart nginx
```

### 4. Настройте SSL

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

### 5. Настройте DNS в Reg.ru

1. Войдите в панель Reg.ru
2. Домены → Ваш домен → DNS-серверы и зона
3. Добавьте A-запись:
   - Имя: @ (или пусто)
   - Значение: IP вашего VPS
4. Добавьте A-запись для www:
   - Имя: www
   - Значение: IP вашего VPS

---

## Готово! 🎉

Сайт доступен по адресу: `https://ваш-домен.ru`

---

## Полезные команды

```bash
# Просмотр логов
pm2 logs luxe-segment

# Перезапуск
pm2 restart luxe-segment

# Статус
pm2 status

# Обновление проекта
cd /var/www/luxe-segment
git pull
npm install --production
npm run build
pm2 restart luxe-segment
```

---

## Проблемы?

**Приложение не запускается:**
```bash
pm2 logs luxe-segment --lines 50
```

**Nginx не работает:**
```bash
nginx -t
systemctl status nginx
tail -f /var/log/nginx/error.log
```

**Подробная инструкция:** см. `DEPLOY_REG_RU.md`
