#!/bin/bash
# Скрипт для исправления remote с правильным форматом токена

echo "🔧 Исправление формата remote..."

# Удалите текущий remote
git remote remove origin

echo ""
echo "Текущий токен в URL имеет неправильный формат."
echo "Нужно использовать формат: username:token@github.com"
echo ""

# Настройте credential helper (чтобы токен сохранился)
git config --global credential.helper osxkeychain

# Добавьте remote БЕЗ токена в URL (Git запросит его при push)
git remote add origin https://github.com/hjj96/luxe-segment.git

echo ""
echo "✅ Remote исправлен!"
echo ""
echo "Теперь выполните:"
echo "  git push -u origin main"
echo ""
echo "Когда спросит:"
echo "  Username: hjj96"
echo "  Password: вставьте токен (правый клик → Вставить)"
echo ""
echo "Токен сохранится в Keychain и больше не нужно будет вводить!"
