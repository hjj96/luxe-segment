# Инструкция для ISPmanager (ваш сервер)

## Проблема
Команда `apt` не работает, потому что на вашем сервере не Ubuntu, а другая система (скорее всего CentOS).

## Что делать

### ШАГ 1: Проверить какая система

В Shell-клиенте выполните:

```bash
cat /etc/os-release
```

Или:

```bash
uname -a
```

Это покажет какая операционная система установлена.

---

### ШАГ 2: Использовать правильные команды

#### Если система CentOS/RHEL (использует `yum` или `dnf`):

```bash
# Обновить систему
sudo yum update -y
# или
sudo dnf update -y

# Установить Node.js через NodeSource
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
# или
sudo dnf install -y nodejs

# Установить PM2
sudo npm install -g pm2

# Установить Nginx и Git
sudo yum install -y nginx git
# или
sudo dnf install -y nginx git
```

#### Если система Ubuntu/Debian (использует `apt`):

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs
sudo npm install -g pm2
sudo apt install -y nginx git
```

---

### ШАГ 3: Переключиться на root (если нужно)

Если команды требуют `sudo`, но его нет, переключитесь на root:

```bash
su -
```

Введите пароль root (если спросит).

Теперь вы будете `root@server265` вместо `u3409693@server265`.

---

## Быстрое решение

### Вариант 1: Попробовать с sudo

В Shell-клиенте выполните:

```bash
sudo yum update -y
```

Если работает - используйте `sudo` перед всеми командами.

### Вариант 2: Переключиться на root

```bash
su -
```

Введите пароль root, затем выполняйте команды без `sudo`.

### Вариант 3: Проверить систему

```bash
cat /etc/os-release
```

Пришлите результат - скажу какие команды использовать.

---

## Что делать дальше

После того как определите систему:

1. **Установите Node.js** (используя правильный менеджер пакетов)
2. **Установите PM2 и Nginx**
3. **Клонируйте проект с GitHub**
4. **Настройте и запустите**

---

## Проверка

Выполните в Shell-клиенте:

```bash
cat /etc/os-release
```

И пришлите результат - я скажу точные команды для вашей системы!
