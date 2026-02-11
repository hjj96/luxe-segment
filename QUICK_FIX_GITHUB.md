# Быстрое решение проблемы с GitHub

## Проблема
```
remote: Invalid username or token. Password authentication is not supported
```

## Решение за 3 шага:

### 1. Создайте токен на GitHub

1. Откройте: https://github.com/settings/tokens
2. Нажмите: **Generate new token** → **Generate new token (classic)**
3. Отметьте: ✅ **repo**
4. Нажмите: **Generate token**
5. **СКОПИРУЙТЕ ТОКЕН** (показывается только один раз!)

Токен выглядит так: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. Используйте токен при push

```bash
git push -u origin main
```

Когда спросит:
- **Username**: `hjj96`
- **Password**: Вставьте токен (НЕ пароль от GitHub!)

### 3. Сохраните токен в Keychain

```bash
git config --global credential.helper osxkeychain
```

Теперь токен сохранится и не нужно будет вводить каждый раз.

---

## Готово! ✅

Теперь код должен загрузиться на GitHub.

---

## Альтернатива: Используйте SSH

Если хотите использовать SSH вместо токена, см. `GITHUB_AUTH.md`
