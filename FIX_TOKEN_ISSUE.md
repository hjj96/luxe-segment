# Исправление проблемы с токеном

## Проблема
Токен добавлен в URL, но Git все равно запрашивает пароль.

## Решение

### Вариант 1: Исправьте формат URL с токеном

Токен в URL должен быть в правильном формате. Попробуйте так:

```bash
# Удалите текущий remote
git remote remove origin

# Добавьте remote с токеном (используйте формат username:token)
git remote add origin https://hjj96:ghp_ВАШ_ПОЛНЫЙ_ТОКЕН@github.com/hjj96/luxe-segment.git
```

**Важно**: 
- Используйте формат `username:token` (не просто `token@`)
- Убедитесь, что токен полный и не обрезан
- Не должно быть пробелов или переносов строк

### Вариант 2: Используйте credential helper (Рекомендуется)

Это сохранит токен в Keychain и не нужно будет вводить каждый раз:

```bash
# Настройте credential helper
git config --global credential.helper osxkeychain

# Удалите remote с токеном из URL (вернитесь к обычному формату)
git remote remove origin
git remote add origin https://github.com/hjj96/luxe-segment.git

# При push введите токен один раз (он сохранится)
git push -u origin main
```

Когда спросит:
- **Username**: `hjj96`
- **Password**: Вставьте токен (через правый клик → Вставить)

После этого токен сохранится в Keychain и больше не нужно будет вводить.

### Вариант 3: Используйте SSH (Самое надежное)

Если токен не работает, переключитесь на SSH:

```bash
# Удалите HTTPS remote
git remote remove origin

# Добавьте SSH remote
git remote add origin git@github.com:hjj96/luxe-segment.git

# Проверьте SSH подключение
ssh -T git@github.com

# Если SSH ключ не настроен, создайте его:
ssh-keygen -t ed25519 -C "ваш@email.com"
# Нажмите Enter для всех вопросов

# Скопируйте публичный ключ
cat ~/.ssh/id_ed25519.pub

# Добавьте ключ на GitHub: https://github.com/settings/keys
# Затем попробуйте push
git push -u origin main
```

---

## Быстрое решение (попробуйте сейчас)

```bash
# 1. Удалите текущий remote
git remote remove origin

# 2. Настройте credential helper
git config --global credential.helper osxkeychain

# 3. Добавьте обычный remote (без токена в URL)
git remote add origin https://github.com/hjj96/luxe-segment.git

# 4. Попробуйте push
git push -u origin main
```

Когда спросит пароль:
- **Username**: `hjj96`
- **Password**: Вставьте токен через **правый клик → Вставить** (или Edit → Paste)

Токен сохранится в Keychain и больше не нужно будет вводить!

---

## Проверка токена

Убедитесь, что токен:
- ✅ Начинается с `ghp_`
- ✅ Полный (не обрезан)
- ✅ Скопирован без пробелов
- ✅ Имеет права `repo` на GitHub

Проверьте токен: https://github.com/settings/tokens

---

## Если все еще не работает

Попробуйте создать новый токен:
1. https://github.com/settings/tokens
2. Удалите старый токен
3. Создайте новый с правами `repo`
4. Используйте новый токен
