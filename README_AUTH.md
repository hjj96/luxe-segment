# Настройка аутентификации

Система поддерживает вход через SMS или Email с одноразовыми кодами (OTP).

## Режим разработки

По умолчанию, если API ключи не настроены, коды будут выводиться в консоль сервера:
- Email коды: `[DEV] Email code for email@example.com: 123456`
- SMS коды: `[DEV] SMS code for 79991234567: 123456`

Это позволяет тестировать функциональность без настройки внешних сервисов.

## Настройка Email (Resend)

1. Зарегистрируйтесь на [Resend.com](https://resend.com)
2. Создайте API ключ в разделе API Keys
3. Добавьте домен и подтвердите его (для продакшена)
4. Добавьте в `.env`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

**Бесплатный тариф:** 100 emails/день, 3000 emails/месяц

## Настройка SMS (SMS.ru)

1. Зарегистрируйтесь на [SMS.ru](https://sms.ru)
2. Получите API ID в личном кабинете
3. Добавьте в `.env`:
   ```
   SMSRU_API_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

**Тарифы:** от 2.5₽ за SMS (зависит от оператора)

## Альтернативные сервисы

### Email
- **SendGrid** - замените функцию `sendEmailCode` в `app/api/auth/send-code/route.ts`
- **Mailgun** - аналогично
- **Nodemailer** - для собственного SMTP сервера

### SMS
- **Twilio** - популярный международный сервис
- **SMSAero** - российский сервис
- **SMSC.ru** - еще один российский вариант

## Безопасность

1. **JWT Secret**: Обязательно измените `JWT_SECRET` в `.env` на случайную строку:
   ```bash
   openssl rand -base64 32
   ```

2. **Хранение кодов**: В продакшене замените `Map` в `app/api/auth/send-code/route.ts` на Redis или БД с TTL.

3. **Rate Limiting**: Добавьте ограничение на количество запросов кода (например, 3 запроса в час с одного IP).

4. **HTTPS**: В продакшене обязательно используйте HTTPS для защиты cookies.

## Использование

1. Пользователь вводит телефон или email
2. Система отправляет 6-значный код
3. Код действителен 10 минут
4. После успешной проверки создается JWT токен (действителен 30 дней)
5. Токен хранится в httpOnly cookie

## API Endpoints

- `POST /api/auth/send-code` - отправка кода
- `POST /api/auth/verify-code` - проверка кода и вход
- `POST /api/auth/logout` - выход
- `GET /api/auth/me` - получение текущего пользователя
