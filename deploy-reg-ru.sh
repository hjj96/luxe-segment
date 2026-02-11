#!/bin/bash
# Скрипт для автоматизации деплоя на Reg.ru VPS
# Использование: ./deploy-reg-ru.sh

set -e

echo "🚀 Начало деплоя Luxe Segment на Reg.ru VPS..."

# Проверка, что скрипт запущен от root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Пожалуйста, запустите скрипт от root (sudo ./deploy-reg-ru.sh)"
    exit 1
fi

# Переменные
PROJECT_DIR="/var/www/luxe-segment"
PROJECT_NAME="luxe-segment"
NODE_VERSION="20"

echo "📦 Обновление системы..."
apt update && apt upgrade -y

echo "📦 Установка Node.js $NODE_VERSION..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt install -y nodejs
else
    echo "✅ Node.js уже установлен"
fi

echo "📦 Установка PM2..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
else
    echo "✅ PM2 уже установлен"
fi

echo "📦 Установка Nginx..."
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl enable nginx
else
    echo "✅ Nginx уже установлен"
fi

echo "📁 Создание директории проекта..."
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

echo "⚠️  ВНИМАНИЕ: Убедитесь, что проект уже загружен в $PROJECT_DIR"
echo "   Если используете Git: git clone https://github.com/ваш-username/репозиторий.git ."
read -p "Нажмите Enter, когда проект будет загружен..."

if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден в $PROJECT_DIR"
    echo "   Убедитесь, что проект загружен правильно"
    exit 1
fi

echo "📦 Установка зависимостей..."
npm install --production

echo "🔧 Проверка файла .env..."
if [ ! -f ".env" ]; then
    echo "⚠️  Файл .env не найден. Создайте его вручную:"
    echo "   nano $PROJECT_DIR/.env"
    echo ""
    echo "   Добавьте:"
    echo "   JWT_SECRET=сгенерируйте-ключ"
    echo "   NODE_ENV=production"
    read -p "Нажмите Enter после создания .env файла..."
fi

echo "🏗️  Сборка проекта..."
npm run build

echo "📝 Настройка PM2..."
if [ -f "ecosystem.config.js" ]; then
    pm2 start ecosystem.config.js
else
    echo "⚠️  ecosystem.config.js не найден, используем базовую конфигурацию"
    pm2 start npm --name "$PROJECT_NAME" -- start
fi

pm2 save
pm2 startup | grep -v "PM2" | bash

echo "✅ Проект запущен через PM2"
pm2 status

echo ""
echo "📝 Настройка Nginx..."
echo "⚠️  ВНИМАНИЕ: Настройте Nginx вручную:"
echo "   1. Скопируйте nginx.conf.example в /etc/nginx/sites-available/$PROJECT_NAME"
echo "   2. Замените 'ваш-домен.ru' на ваш реальный домен"
echo "   3. Создайте симлинк: ln -s /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/"
echo "   4. Проверьте: nginx -t"
echo "   5. Перезапустите: systemctl restart nginx"
echo ""
echo "🔒 Настройка SSL (после настройки Nginx):"
echo "   certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru"
echo ""

echo "✅ Деплой завершен!"
echo ""
echo "📋 Следующие шаги:"
echo "   1. Настройте DNS записи в панели Reg.ru (A-запись на IP сервера)"
echo "   2. Настройте Nginx (см. инструкции выше)"
echo "   3. Установите SSL через Certbot"
echo "   4. Проверьте работу сайта"
echo ""
echo "📚 Полезные команды:"
echo "   pm2 logs $PROJECT_NAME    # Просмотр логов"
echo "   pm2 restart $PROJECT_NAME # Перезапуск"
echo "   pm2 status                # Статус приложения"
