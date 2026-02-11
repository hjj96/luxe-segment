# Настройка аутентификации GitHub

## Проблема
GitHub больше не поддерживает пароли для Git операций. Нужно использовать **Personal Access Token** или **SSH ключи**.

---

## Вариант 1: Personal Access Token (Проще) ⭐

### Шаг 1: Создайте токен на GitHub

1. Откройте https://github.com
2. Войдите в аккаунт
3. Нажмите на аватар (правый верхний угол) → **Settings**
4. В левом меню: **Developer settings**
5. **Personal access tokens** → **Tokens (classic)**
6. Нажмите **Generate new token** → **Generate new token (classic)**
7. Заполните форму:
   - **Note**: `Luxe Segment Project` (любое название)
   - **Expiration**: Выберите срок (например, 90 дней или No expiration)
   - **Select scopes**: Отметьте `repo` (это даст полный доступ к репозиториям)
8. Нажмите **Generate token** внизу
9. **ВАЖНО**: Скопируйте токен сразу! Он показывается только один раз.
   - Токен выглядит так: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Шаг 2: Используйте токен вместо пароля

При выполнении `git push`:

```bash
git push -u origin main
```

Когда спросит:
- **Username**: `hjj96` (ваш GitHub username)
- **Password**: Вставьте токен (не пароль от GitHub!)

### Шаг 3: Сохраните токен (чтобы не вводить каждый раз)

**Для Mac:**

```bash
# Сохраните токен в Keychain
git config --global credential.helper osxkeychain
```

Теперь при следующем push токен сохранится в Keychain.

**Альтернатива: Используйте URL с токеном**

```bash
# Удалите старый remote
git remote remove origin

# Добавьте remote с токеном в URL (замените TOKEN на ваш токен)
git remote add origin https://TOKEN@github.com/hjj96/luxe-segment.git

# Теперь push не будет спрашивать пароль
git push -u origin main
```

⚠️ **Внимание**: Токен в URL виден в истории команд. Используйте этот способ только если уверены в безопасности.

---

## Вариант 2: SSH ключи (Безопаснее)

### Шаг 1: Проверьте, есть ли SSH ключ

```bash
ls -al ~/.ssh
```

Если видите файлы `id_rsa` и `id_rsa.pub` (или `id_ed25519` и `id_ed25519.pub`) - ключ уже есть.

### Шаг 2: Создайте SSH ключ (если нет)

```bash
# Создайте новый SSH ключ (замените email на ваш)
ssh-keygen -t ed25519 -C "ваш@email.com"

# Нажмите Enter для всех вопросов (или задайте пароль для ключа)
```

### Шаг 3: Добавьте ключ в ssh-agent

```bash
# Запустите ssh-agent
eval "$(ssh-agent -s)"

# Добавьте ключ
ssh-add ~/.ssh/id_ed25519
```

### Шаг 4: Скопируйте публичный ключ

```bash
# Покажите публичный ключ
cat ~/.ssh/id_ed25519.pub
```

Скопируйте весь вывод (начинается с `ssh-ed25519 ...`)

### Шаг 5: Добавьте ключ на GitHub

1. Откройте https://github.com/settings/keys
2. Нажмите **New SSH key**
3. **Title**: `MacBook Air` (любое название)
4. **Key**: Вставьте скопированный публичный ключ
5. Нажмите **Add SSH key**

### Шаг 6: Измените remote на SSH

```bash
# Удалите старый remote
git remote remove origin

# Добавьте SSH remote
git remote add origin git@github.com:hjj96/luxe-segment.git

# Проверьте
git remote -v

# Теперь push через SSH
git push -u origin main
```

---

## Быстрое решение (через токен)

1. **Создайте токен**: https://github.com/settings/tokens → Generate new token (classic) → Отметьте `repo` → Generate

2. **Используйте токен при push:**
   ```bash
   git push -u origin main
   ```
   - Username: `hjj96`
   - Password: вставьте токен (не пароль!)

3. **Сохраните в Keychain:**
   ```bash
   git config --global credential.helper osxkeychain
   ```

---

## Проверка

После настройки проверьте:

```bash
git push -u origin main
```

Если все работает, вы увидите:
```
Enumerating objects: ...
Counting objects: ...
Writing objects: ...
To https://github.com/hjj96/luxe-segment.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## Если все еще не работает

### Проверьте, что репозиторий существует:
- Откройте https://github.com/hjj96/luxe-segment
- Убедитесь, что репозиторий создан

### Проверьте права доступа:
- Токен должен иметь права `repo`
- Репозиторий должен быть доступен вашему аккаунту

### Очистите сохраненные credentials:

```bash
# Удалите сохраненные credentials
git credential-osxkeychain erase
host=github.com
protocol=https
# Нажмите Enter дважды

# Или удалите из Keychain через Keychain Access.app
```

---

## Рекомендация

Для начала используйте **Personal Access Token** (Вариант 1) - это проще и быстрее.

SSH ключи (Вариант 2) более безопасны для долгосрочного использования.
