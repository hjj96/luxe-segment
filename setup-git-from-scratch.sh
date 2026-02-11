#!/bin/bash
# Скрипт для настройки Git и загрузки проекта на GitHub с нуля

set -e

echo "🚀 Настройка Git и загрузка проекта на GitHub"
echo "=============================================="
echo ""

# Проверка, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы в папке проекта."
    exit 1
fi

# Шаг 1: Проверка Git
echo "📋 Шаг 1: Проверка Git..."
if ! command -v git &> /dev/null; then
    echo "❌ Git не установлен. Установите через: brew install git"
    exit 1
fi
echo "✅ Git установлен: $(git --version)"
echo ""

# Шаг 2: Настройка Git
echo "📋 Шаг 2: Настройка Git..."
read -p "Введите ваше имя для Git (или нажмите Enter для пропуска): " GIT_NAME
if [ ! -z "$GIT_NAME" ]; then
    git config --global user.name "$GIT_NAME"
    echo "✅ Имя установлено: $GIT_NAME"
fi

read -p "Введите ваш email для Git (или нажмите Enter для пропуска): " GIT_EMAIL
if [ ! -z "$GIT_EMAIL" ]; then
    git config --global user.email "$GIT_EMAIL"
    echo "✅ Email установлен: $GIT_EMAIL"
fi

git config --global credential.helper osxkeychain
echo "✅ Credential helper настроен"
echo ""

# Шаг 3: Очистка
echo "📋 Шаг 3: Очистка текущего состояния..."
git remote remove origin 2>/dev/null || true
echo "✅ Старые remote удалены"
echo ""

# Шаг 4: Инициализация
echo "📋 Шаг 4: Инициализация Git..."
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git инициализирован"
else
    echo "✅ Git уже инициализирован"
fi

# Проверка статуса
if [ -z "$(git status --porcelain)" ] && [ -n "$(git log --oneline -1 2>/dev/null)" ]; then
    echo "✅ Все файлы закоммичены"
else
    echo "📝 Добавляю файлы..."
    git add .
    git commit -m "Initial commit" || echo "⚠️  Коммит не создан (возможно, нет изменений)"
fi

git branch -M main 2>/dev/null || true
echo ""

# Шаг 5: Инструкции по созданию репозитория
echo "📋 Шаг 5: Создание репозитория на GitHub"
echo ""
echo "⚠️  ВАЖНО: Сначала создайте репозиторий на GitHub!"
echo ""
echo "1. Откройте: https://github.com"
echo "2. Нажмите '+' → 'New repository'"
echo "3. Название: luxe-segment"
echo "4. НЕ добавляйте README, .gitignore, лицензию"
echo "5. Нажмите 'Create repository'"
echo ""
read -p "Нажмите Enter после создания репозитория на GitHub..."

# Шаг 6: Создание токена
echo ""
echo "📋 Шаг 6: Создание Personal Access Token"
echo ""
echo "⚠️  ВАЖНО: Создайте токен на GitHub!"
echo ""
echo "1. Откройте: https://github.com/settings/tokens"
echo "2. Нажмите 'Generate new token' → 'Generate new token (classic)'"
echo "3. Отметьте ✅ 'repo'"
echo "4. Нажмите 'Generate token'"
echo "5. СКОПИРУЙТЕ ТОКЕН (показывается только один раз!)"
echo ""
read -p "Нажмите Enter после создания токена..."

# Шаг 7: Добавление remote
echo ""
echo "📋 Шаг 7: Добавление remote..."
read -p "Введите ваш GitHub username (например: hjj96): " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username не может быть пустым!"
    exit 1
fi

REPO_URL="https://github.com/${GITHUB_USERNAME}/luxe-segment.git"
git remote add origin "$REPO_URL"
echo "✅ Remote добавлен: $REPO_URL"
echo ""

# Шаг 8: Push
echo "📋 Шаг 8: Загрузка на GitHub..."
echo ""
echo "⚠️  Сейчас будет запрошен токен!"
echo ""
echo "Когда появится запрос:"
echo "  Username: $GITHUB_USERNAME"
echo "  Password: Вставьте токен (правый клик → Вставить)"
echo "            Символы не будут видны - это нормально!"
echo ""
read -p "Нажмите Enter для начала загрузки..."

echo ""
echo "🚀 Отправляю код на GitHub..."
if git push -u origin main; then
    echo ""
    echo "✅ УСПЕШНО! Код загружен на GitHub!"
    echo "🌐 Репозиторий: $REPO_URL"
    echo ""
    echo "Токен сохранен в Keychain. При следующем push он будет использоваться автоматически."
else
    echo ""
    echo "❌ Ошибка при загрузке."
    echo ""
    echo "Возможные причины:"
    echo "  - Неправильный токен"
    echo "  - Токен не имеет прав 'repo'"
    echo "  - Репозиторий не существует"
    echo ""
    echo "Попробуйте выполнить вручную:"
    echo "  git push -u origin main"
fi
