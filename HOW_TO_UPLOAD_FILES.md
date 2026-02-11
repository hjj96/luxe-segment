# Как загрузить файлы проекта на сервер Reg.ru

## Вариант 1: Через Git (Рекомендуется) ⭐

Это самый удобный способ для обновлений в будущем.

### Шаг 1: Создайте репозиторий на GitHub

1. Зарегистрируйтесь на https://github.com (если нет аккаунта)
2. Создайте новый репозиторий:
   - Нажмите "New repository"
   - Название: `luxe-segment` (или любое другое)
   - Выберите "Private" (или "Public")
   - Не добавляйте README, .gitignore, лицензию (они уже есть)

### Шаг 2: Загрузите проект на GitHub

На вашем локальном компьютере (в папке проекта):

```bash
cd /Users/a/ЛСсайт

# Инициализируйте Git (если еще не сделано)
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit"

# Добавьте удаленный репозиторий (замените на ваш URL)
git remote add origin https://github.com/ваш-username/luxe-segment.git

# Загрузите на GitHub
git push -u origin main
```

Если Git просит настроить имя и email:
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш@email.com"
```

### Шаг 3: Клонируйте на сервер

На сервере Reg.ru:

```bash
# Установите Git (если не установлен)
apt install -y git

# Создайте директорию
mkdir -p /var/www/luxe-segment
cd /var/www/luxe-segment

# Клонируйте репозиторий
git clone https://github.com/ваш-username/luxe-segment.git .

# Или если репозиторий приватный, используйте SSH ключ
# git clone git@github.com:ваш-username/luxe-segment.git .
```

**Преимущества:**
- ✅ Легко обновлять: `git pull`
- ✅ Версионность кода
- ✅ Резервная копия на GitHub

---

## Вариант 2: Через SCP (прямая загрузка)

Если не хотите использовать Git, можно загрузить файлы напрямую.

### Шаг 1: Создайте архив проекта

На вашем локальном компьютере (в папке проекта):

```bash
cd /Users/a/ЛСсайт

# Создайте архив, исключая node_modules и .next
tar --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='.env' \
    --exclude='*.log' \
    -czf luxe-segment.tar.gz .
```

### Шаг 2: Загрузите архив на сервер

```bash
# Замените на ваш IP и путь
scp luxe-segment.tar.gz root@ваш-ip-адрес:/root/
```

Если спросит пароль, введите пароль от root на сервере.

### Шаг 3: Распакуйте на сервере

Подключитесь к серверу:

```bash
ssh root@ваш-ip-адрес

# Перейдите в директорию
cd /var/www

# Создайте директорию проекта
mkdir -p luxe-segment
cd luxe-segment

# Распакуйте архив
tar -xzf /root/luxe-segment.tar.gz

# Удалите архив (опционально)
rm /root/luxe-segment.tar.gz
```

---

## Вариант 3: Через SFTP (FileZilla или WinSCP)

### Для Windows/Mac:

1. **Установите FileZilla:**
   - Windows: https://filezilla-project.org/download.php?type=client
   - Mac: можно через Homebrew: `brew install --cask filezilla`

2. **Подключитесь к серверу:**
   - Хост: `ваш-ip-адрес` или `ваш-домен.ru`
   - Пользователь: `root`
   - Пароль: пароль от root
   - Порт: `22`

3. **Загрузите файлы:**
   - Левый экран: ваша локальная папка проекта
   - Правый экран: `/var/www/luxe-segment` на сервере
   - Перетащите файлы (исключая `node_modules`, `.next`, `.env`)

---

## Вариант 4: Через rsync (для синхронизации)

Удобно для обновлений:

```bash
# На локальном компьютере
rsync -avz --exclude 'node_modules' \
           --exclude '.next' \
           --exclude '.git' \
           --exclude '.env' \
           ./ root@ваш-ip-адрес:/var/www/luxe-segment/
```

---

## Что НЕ нужно загружать

Эти файлы/папки не нужны на сервере:

- ❌ `node_modules/` — установится через `npm install`
- ❌ `.next/` — соберется через `npm run build`
- ❌ `.env` — создадите на сервере отдельно
- ❌ `.git/` — не нужен (если не используете Git на сервере)
- ❌ `*.log` — логи
- ❌ `.DS_Store` — системные файлы Mac

**Нужно загрузить:**
- ✅ Все `.ts`, `.tsx`, `.js`, `.jsx` файлы
- ✅ `package.json`, `package-lock.json`
- ✅ `next.config.js`
- ✅ `tailwind.config.ts`
- ✅ `tsconfig.json`
- ✅ `app/`, `components/`, `lib/` папки
- ✅ `public/` папка (если есть)
- ✅ `ecosystem.config.js`
- ✅ `nginx.conf.example`

---

## После загрузки файлов

Независимо от способа загрузки, выполните на сервере:

```bash
cd /var/www/luxe-segment

# Установите зависимости
npm install --production

# Создайте .env файл
nano .env
# Добавьте переменные окружения

# Соберите проект
npm run build

# Запустите через PM2
pm2 start ecosystem.config.js
pm2 save
```

---

## Рекомендация

**Используйте Git (Вариант 1)** — это самый удобный способ:
- Легко обновлять проект
- История изменений
- Резервная копия на GitHub
- Можно откатывать изменения

Если нужна помощь с настройкой Git или загрузкой файлов — напишите!
