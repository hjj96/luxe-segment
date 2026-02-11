# Настройка Git и загрузка проекта на GitHub - С нуля

## Шаг 1: Проверка Git

```bash
# Проверьте, установлен ли Git
git --version

# Если не установлен, установите через Homebrew:
# brew install git
```

## Шаг 2: Настройка Git (если еще не настроено)

```bash
# Установите ваше имя и email
git config --global user.name "Ваше Имя"
git config --global user.email "ваш@email.com"

# Настройте credential helper для сохранения токенов
git config --global credential.helper osxkeychain
```

## Шаг 3: Очистка текущего состояния (если нужно)

```bash
cd /Users/a/ЛСсайт

# Удалите старый remote (если есть)
git remote remove origin 2>/dev/null || true

# Проверьте статус
git status
```

## Шаг 4: Создание репозитория на GitHub

1. Откройте https://github.com
2. Войдите в аккаунт (или создайте новый)
3. Нажмите **"+"** в правом верхнем углу → **"New repository"**
4. Заполните:
   - **Repository name**: `luxe-segment`
   - **Description**: (опционально) "Luxe Segment - Premium catalog"
   - **Visibility**: Private или Public (на ваше усмотрение)
   - **НЕ отмечайте**: ❌ Add a README file
   - **НЕ отмечайте**: ❌ Add .gitignore
   - **НЕ отмечайте**: ❌ Choose a license
5. Нажмите **"Create repository"**

## Шаг 5: Создание Personal Access Token

1. Откройте https://github.com/settings/tokens
2. Нажмите **"Generate new token"** → **"Generate new token (classic)"**
3. Заполните:
   - **Note**: `Luxe Segment Project`
   - **Expiration**: Выберите срок (например, 90 days или No expiration)
   - **Select scopes**: Отметьте ✅ **repo** (это даст полный доступ к репозиториям)
4. Прокрутите вниз и нажмите **"Generate token"**
5. **ВАЖНО**: Скопируйте токен сразу! Он показывается только один раз.
   - Токен начинается с `ghp_` и выглядит так: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Сохраните токен в безопасном месте (например, в Notes)

## Шаг 6: Инициализация Git в проекте

```bash
cd /Users/a/ЛСсайт

# Если Git еще не инициализирован
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit"

# Переименуйте ветку в main (если нужно)
git branch -M main
```

## Шаг 7: Добавление remote

```bash
# Добавьте remote БЕЗ токена в URL
git remote add origin https://github.com/hjj96/luxe-segment.git

# Проверьте
git remote -v
```

Должно показать:
```
origin  https://github.com/hjj96/luxe-segment.git (fetch)
origin  https://github.com/hjj96/luxe-segment.git (push)
```

## Шаг 8: Загрузка на GitHub

```bash
# Загрузите код
git push -u origin main
```

Когда появится запрос:

**Username for 'https://github.com':**
- Введите: `hjj96`
- Нажмите Enter

**Password for 'https://hjj96@github.com':**
- **НЕ вводите пароль от GitHub!**
- Вставьте токен, который вы скопировали на шаге 5
- **Как вставить**: Правый клик в поле ввода → **Вставить** (или Edit → Paste)
- Символы не будут видны - это нормально!
- Нажмите Enter

## Шаг 9: Проверка

После успешной загрузки вы увидите:
```
Enumerating objects: ...
Counting objects: ...
Writing objects: ...
To https://github.com/hjj96/luxe-segment.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Проверьте на GitHub:
- Откройте https://github.com/hjj96/luxe-segment
- Вы должны увидеть все файлы проекта

## Готово! ✅

Теперь ваш код на GitHub. При следующем push токен будет использоваться автоматически из Keychain.

---

## Полезные команды для будущего

```bash
# Проверить статус
git status

# Добавить изменения
git add .

# Создать коммит
git commit -m "Описание изменений"

# Загрузить на GitHub
git push

# Посмотреть историю коммитов
git log --oneline
```

---

## Если что-то пошло не так

### Ошибка: "repository not found"
- Проверьте, что репозиторий создан на GitHub
- Проверьте правильность username (`hjj96`)

### Ошибка: "Authentication failed"
- Проверьте, что токен правильный и не истек
- Убедитесь, что токен имеет права `repo`
- Попробуйте создать новый токен

### Ошибка: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/hjj96/luxe-segment.git
```

### Токен не вставляется
- Используйте правый клик → Вставить (не Cmd+V)
- Или введите токен вручную посимвольно
- Или используйте SSH (см. ниже)

---

## Альтернатива: Использование SSH (если токен не работает)

Если токен не работает, можно использовать SSH:

```bash
# 1. Создайте SSH ключ
ssh-keygen -t ed25519 -C "ваш@email.com"
# Нажмите Enter для всех вопросов

# 2. Скопируйте публичный ключ
cat ~/.ssh/id_ed25519.pub

# 3. Добавьте ключ на GitHub:
# https://github.com/settings/keys → New SSH key → Вставьте ключ

# 4. Измените remote на SSH
git remote remove origin
git remote add origin git@github.com:hjj96/luxe-segment.git

# 5. Push
git push -u origin main
```

---

## Следующий шаг: Деплой на Reg.ru

После того как код на GitHub, можно загрузить его на сервер Reg.ru:

1. Подключитесь к серверу: `ssh root@ваш-ip`
2. Клонируйте репозиторий: `git clone https://github.com/hjj96/luxe-segment.git /var/www/luxe-segment`
3. Следуйте инструкциям из `DEPLOY_REG_RU.md`
