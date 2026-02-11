#!/bin/bash
# Скрипт для настройки Git и загрузки на GitHub

echo "🔧 Настройка Git для проекта Luxe Segment"
echo ""

# Проверка, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы в папке проекта."
    exit 1
fi

echo "📋 Текущий статус Git:"
git status
echo ""

# Проверка существующего remote
if git remote -v | grep -q "origin"; then
    echo "⚠️  Найден существующий remote. Удаляю..."
    git remote remove origin
fi

echo ""
echo "📝 ВАЖНО: Сначала создайте репозиторий на GitHub!"
echo ""
echo "1. Откройте https://github.com"
echo "2. Нажмите '+' → 'New repository'"
echo "3. Название: luxe-segment"
echo "4. НЕ добавляйте README, .gitignore, лицензию"
echo "5. Нажмите 'Create repository'"
echo ""
read -p "Нажмите Enter после создания репозитория на GitHub..."

echo ""
echo "Введите ваш GitHub username (например: hjj96):"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username не может быть пустым!"
    exit 1
fi

REPO_URL="https://github.com/${GITHUB_USERNAME}/luxe-segment.git"

echo ""
echo "🔗 Добавляю remote: $REPO_URL"
git remote add origin "$REPO_URL"

echo ""
echo "✅ Remote добавлен. Проверка:"
git remote -v

echo ""
echo "📤 Загружаю код на GitHub..."
echo ""

# Проверка, есть ли коммиты
if ! git log --oneline -1 &>/dev/null; then
    echo "📝 Создаю первый коммит..."
    git add .
    git commit -m "Initial commit"
fi

# Переименование ветки в main (если нужно)
git branch -M main 2>/dev/null || true

# Push
echo ""
echo "🚀 Отправляю код на GitHub..."
if git push -u origin main; then
    echo ""
    echo "✅ Успешно! Код загружен на GitHub."
    echo "🌐 Репозиторий: $REPO_URL"
else
    echo ""
    echo "❌ Ошибка при загрузке. Возможные причины:"
    echo "   - Репозиторий не существует на GitHub"
    echo "   - Неправильный username"
    echo "   - Нужна аутентификация (GitHub может попросить токен)"
    echo ""
    echo "Попробуйте выполнить вручную:"
    echo "  git push -u origin main"
fi
