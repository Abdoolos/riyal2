# ⚡ دليل النشر السريع على Vercel

## 📋 قائمة المتغيرات المطلوبة

انسخ هذه المتغيرات وأضفها في Vercel Dashboard → Settings → Environment Variables:

```bash
# ==================== APP ====================
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXTAUTH_URL=https://your-app.vercel.app


# ================ AUTHENTICATION =================
# Generate new secret for production!
AUTH_SECRET=your-generated-secret-here
JWT_SECRET_KEY=your-generated-secret-here


# ================ GOOGLE OAUTH =================
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret


# ============ DATABASE (NEON POSTGRES) ===========
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require&pgbouncer=true&connect_timeout=15
DIRECT_URL=postgresql://user:pass@host/db?sslmode=require&connect_timeout=15


# ================ EMAIL (RESEND) =================
# Optional - can be added later
RESEND_API_KEY=re_your_api_key
RESEND_EMAIL_FROM=noreply@yourdomain.com
RESEND_HOST=smtp.resend.com
RESEND_USERNAME=resend
RESEND_PORT=465
```

---

## 🚀 خطوات النشر (5 دقائق)

### 1️⃣ رفع الكود على GitHub
```bash
git init
git add .
git commit -m "Initial deployment"
git branch -M main
git remote add origin https://github.com/your-username/rial-mind.git
git push -u origin main
```

### 2️⃣ ربط Vercel
1. اذهب إلى: https://vercel.com/new
2. اختر مستودع GitHub
3. اضغط **Import**

### 3️⃣ إضافة Environment Variables
في صفحة الإعداد:
1. اضغط **Environment Variables**
2. الصق المتغيرات من الأعلى
3. استبدل القيم الفارغة بقيمك الحقيقية

### 4️⃣ النشر
1. اضغط **Deploy**
2. انتظر 2-5 دقائق
3. احصل على رابط: `https://your-app.vercel.app`

### 5️⃣ تحديث Google OAuth
1. اذهب إلى: https://console.cloud.google.com
2. Credentials → OAuth Client
3. أضف في **Authorized redirect URIs**:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
4. احفظ

---

## ✅ اختبار سريع

بعد النشر، اختبر:
- ✅ الصفحة الرئيسية: `https://your-app.vercel.app`
- ✅ التسجيل: `https://your-app.vercel.app/signup`
- ✅ تسجيل الدخول: `https://your-app.vercel.app/signin`
- ✅ Google OAuth: جرب تسجيل الدخول بـ Google

---

## 🔧 توليد AUTH_SECRET

### على Windows (PowerShell):
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### على Mac/Linux:
```bash
openssl rand -base64 32
```

### أونلاين:
https://generate-secret.vercel.app/32

---

## 🐛 حل المشاكل

### ❌ "Invalid redirect URI"
- تأكد من إضافة redirect URI في Google Console
- انتظر 5 دقائق بعد التحديث

### ❌ "Database connection failed"
- تحقق من `DATABASE_URL` في Vercel
- تأكد من وجود `?sslmode=require`

### ❌ "Session not found"
- تأكد من صحة `AUTH_SECRET`
- تأكد من تطابق `NEXTAUTH_URL` مع رابط الموقع

---

## 📞 للمساعدة الكاملة

راجع: `DEPLOYMENT.md` للدليل الشامل

---

**🎉 موقعك الآن على الإنترنت!**
