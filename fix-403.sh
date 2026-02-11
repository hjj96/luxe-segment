#!/bin/bash
# Скрипт для исправления ошибки 403

echo "🔧 Исправление ошибки 403 (Permission denied)"
echo "=============================================="
echo ""

cd /Users/a/ЛСсайт

echo "📋 Шаг 1: Проверка текущего remote..."
git remote -v
echo ""

echo "📋 Шаг 2: Очистка сохраненных credentials..."
git credential-osxkeychain erase <<EOF
host=github.com
protocol=https
EOF
echo "✅ Credentials очищены"
echo ""

echo "⚠️  ВАЖНО: Проверьте следующее:"
echo ""
echo "1. Репозиторий существует на GitHub:"
echo "   Откройте: https://github.com/hjj96/luxe-segment"
echo ""
echo "2. Токен имеет права 'repo':"
echo "   Откройте: https://github.com/settings/tokens"
echo "   Убедитесь, что токен имеет ✅ 'repo'"
echo ""
echo "3. Если токен неправильный или истек, создайте новый:"
echo "   https://github.com/settings/tokens → Generate new token (classic)"
echo "   Отметьте ✅ 'repo' → Generate"
echo ""
read -p "Нажмите Enter после проверки..."

echo ""
echo "📋 Шаг 3: Попытка push..."
echo ""
echo "Когда спросит:"
echo "  Username: hjj96"
echo "  Password: Вставьте токен (правый клик → Вставить)"
echo ""

if git push -u origin main; then
    echo ""
    echo "✅ УСПЕШНО! Код загружен на GitHub!"
else
    echo ""
    echo "❌ Ошибка все еще возникает."
    echo ""
    echo "Попробуйте использовать SSH вместо токена:"
    echo ""
    echo "1. Создайте SSH ключ:"
    echo "   ssh-keygen -t ed25519 -C 'ваш@email.com'"
    echo ""
    echo "2. Скопируйте ключ:"
    echo "   cat ~/.ssh/id_ed25519.pub"
    echo ""
    echo "3. Добавьте ключ на GitHub:"
    echo "   https://github.com/settings/keys"
    echo ""
    echo "4. Измените remote на SSH:"
    echo "   git remote set-url origin git@github.com:hjj96/luxe-segment.git"
    echo ""
    echo "5. Push:"
    echo "   git push -u origin main"
fi
