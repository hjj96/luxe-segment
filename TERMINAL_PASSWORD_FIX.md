# Terminal Password Not Working - Fix Guide

## Problem
- Username enters correctly
- Password doesn't enter at all
- Terminal seems frozen or unresponsive

## Solutions

### Solution 1: Password is Hidden (Normal Behavior)

**IMPORTANT:** In Linux terminals, passwords are **NOT displayed** when typing - no stars, no dots, nothing visible. This is normal security behavior.

**What to do:**
1. Type your password (you won't see anything)
2. Press Enter
3. If password is correct, you'll log in

**Common mistake:** People think password isn't entering because they don't see characters - but it IS entering, just hidden!

---

### Solution 2: Turn Off Caps Lock

If you see "Caps Lock on" hint in terminal:

1. Press **Caps Lock** key on your keyboard
2. Try entering password again
3. Make sure you're using correct case (lowercase/uppercase)

---

### Solution 3: Copy-Paste Password

If typing doesn't work:

1. Copy password from Beget control panel
2. In terminal, **right-click** → **Paste**
3. Or try: **Ctrl+Shift+V** (some terminals)
4. Press Enter

**Note:** Some terminals don't allow paste in password field - if so, use Solution 4

---

### Solution 4: Reset Password

If nothing works:

1. Go to Beget control panel
2. Find **"Passwords"** or **"Access"** section
3. Reset password for user `zviagi2d`
4. Set a new simple password (only letters and numbers, no special characters)
5. Try logging in with new password

---

### Solution 5: Use Root User Instead

Try logging in as root:

1. When you see `login:` prompt, type: `root`
2. Press Enter
3. Enter root password (find it in control panel)
4. Root might have different password

---

### Solution 6: Check Keyboard Layout

Make sure:
- Keyboard layout is **English** (not Russian)
- Caps Lock is **OFF**
- Num Lock is ON (if using numeric keypad)

---

### Solution 7: Use SSH Instead of VNC

VNC terminal might have issues. Try SSH:

1. In Beget control panel, find **"SSH Access"** or **"SSH Connection"**
2. Copy SSH command (looks like: `ssh zviagi2d@server.beget.tech`)
3. On your Mac, open Terminal app
4. Paste and run SSH command
5. Enter password there (might work better)

---

## Step-by-Step: What to Do Right Now

### Step 1: Turn Off Caps Lock
Press Caps Lock key to turn it off

### Step 2: Type Password (Even If You Don't See It)
1. Type password carefully
2. **Don't worry** if you don't see characters - this is normal!
3. Press Enter

### Step 3: If Still Doesn't Work
1. Copy password from control panel
2. Right-click in terminal → Paste
3. Press Enter

### Step 4: If Still Fails
1. Reset password in control panel
2. Set simple password (only letters/numbers)
3. Try again

---

## Common Issues

### Issue: "Password field doesn't accept input"
**Fix:** Password IS accepting input, you just can't see it. Type and press Enter.

### Issue: "Terminal is frozen"
**Fix:** Terminal is waiting for password. Type password (invisible) and press Enter.

### Issue: "Caps Lock is on"
**Fix:** Turn off Caps Lock, try again.

### Issue: "Wrong keyboard layout"
**Fix:** Switch to English layout, try again.

---

## Alternative: Use Web File Manager

If terminal doesn't work at all:

1. In Beget control panel, find **"File Manager"**
2. Use it to upload files
3. But you'll still need terminal for installing Node.js

---

## Quick Checklist

- [ ] Caps Lock is OFF
- [ ] Keyboard layout is English
- [ ] Typed password (even if invisible)
- [ ] Pressed Enter after password
- [ ] Tried copy-paste password
- [ ] Tried resetting password
- [ ] Tried root user instead

---

## Still Not Working?

If nothing works:

1. **Contact Beget support** - they can help reset access
2. **Use SSH** instead of VNC terminal
3. **Check password** in control panel - make sure it's correct

---

## Important Notes

✅ **Password is ALWAYS hidden** in Linux terminals - this is normal!  
✅ **Type password even if you don't see it** - it's working!  
✅ **Press Enter** after typing password  
✅ **Caps Lock** must be OFF  

The most common issue is that people think password isn't entering because they don't see characters - but it IS entering, just hidden for security!
