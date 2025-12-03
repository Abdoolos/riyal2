# 🚀 دليل النشر - Rial Mind

## 📋 جدول المحتويات
1. [المتطلبات الأساسية](#المتطلبات-الأساسية)
2. [إعداد قاعدة البيانات (Neon)](#إعداد-قاعدة-البيانات-neon)
3. [إعداد Google OAuth](#إعداد-google-oauth)
4. [النشر على Vercel](#النشر-على-vercel)
5. [متغيرات البيئة](#متغيرات-البيئة)
6. [الاختبار بعد النشر](#الاختبار-بعد-النشر)

---

## 🔧 المتطلبات الأساسية

### الحسابات المطلوبة:
- ✅ حساب [Neon](https://neon.tech) (قاعدة البيانات)
- ✅ حساب [Vercel](https://vercel.com) (الاستضافة)
- ✅ حساب [Google Cloud Console](https://console.cloud.google.com) (OAuth)
- ✅ حساب GitHub (للمستودع)

---

## 🗄️ إعداد قاعدة البيانات (Neon)

### الخطوة 1: إنشاء مشروع Neon
1. اذهب إلى: https://console.neon.tech
2. اضغط **"New Project"**
3. اختر:
   - **Project Name**: `riyal-mind` أو `rial-mind-production`
   - **Region**: EU Central (Frankfurt) أو US East
   - **Postgres Version**: 16 (الافتراضي)

### الخطوة 2: الحصول على Connection Strings
بعد إنشاء المشروع:
1. في Dashboard، اذهب إلى **"Connection Details"**
2. انسخ:
   - **Pooled Connection** → هذا هو `DATABASE_URL`
   - **Direct Connection** → هذا هو `DIRECT_URL`

**مثال على الصيغة:**
```bash
# Pooled Connection (DATABASE_URL)
postgresql://username:password@host/database?sslmode=require&pgbouncer=true&connect_timeout=15

# Direct Connection (DIRECT_URL)
postgresql://username:password@host/database?sslmode=require&connect_timeout=15
```

### الخطوة 3: تشغيل Migrations (محلياً أولاً)
```bash
# تأكد من وجود ملف .env مع DATABASE_URL و DIRECT_URL
npx prisma migrate dev --name init
npx prisma generate
```

---

## 🔐 إعداد Google OAuth

### الخطوة 1: إنشاء مشروع في Google Cloud Console
1. اذهب إلى: https://console.cloud.google.com
2. اضغط **"Select a project"** → **"New Project"**
3. أدخل اسم المشروع: `Rial Mind`
4. اضغط **"Create"**

### الخطوة 2: تفعيل Google+ API
1. في القائمة الجانبية، اذهب إلى **"APIs & Services"** → **"Library"**
2. ابحث عن **"Google+ API"**
3. اضغط **"Enable"**

### الخطوة 3: إنشاء OAuth Credentials
1. اذهب إلى **"APIs & Services"** → **"Credentials"**
2. اضغط **"Create Credentials"** → **"OAuth client ID"**
3. اختر **"Web application"**
4. أدخل:
   - **Name**: `Rial Mind Web Client`

### الخطوة 4: إضافة Authorized URLs

#### للتطوير المحلي:
```
Authorized JavaScript origins:
- http://localhost:3000

Authorized redirect URIs:
- http://localhost:3000/api/auth/callback/google
```

#### للإنتاج (بعد النشر على Vercel):
```
Authorized JavaScript origins:
- https://your-app.vercel.app
- https://your-custom-domain.com (إن وجد)

Authorized redirect URIs:
- https://your-app.vercel.app/api/auth/callback/google
- https://your-custom-domain.com/api/auth/callback/google (إن وجد)
```

### الخطوة 5: نسخ Credentials
بعد الإنشاء، انسخ:
- **Client ID** → هذا هو `GOOGLE_ID`
- **Client Secret** → هذا هو `GOOGLE_SECRET`

---

## 🚀 النشر على Vercel

### الخطوة 1: رفع الكود على GitHub
```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit - Rial Mind"
git branch -M main
git remote add origin https://github.com/your-username/rial-mind.git
git push -u origin main
```

### الخطوة 2: ربط Vercel بـ GitHub
1. اذهب إلى: https://vercel.com
2. اضغط **"Add New"** → **"Project"**
3. اختر مستودع GitHub الخاص بك
4. اضغط **"Import"**

### الخطوة 3: إعداد المشروع
في صفحة الإعداد:
- **Framework Preset**: Next.js (سيتم اكتشافه تلقائياً)
- **Root Directory**: `./` (الافتراضي)
- **Build Command**: `npm run build` (الافتراضي)
- **Output Directory**: `.next` (الافتراضي)

### الخطوة 4: إضافة Environment Variables
اضغط على **"Environment Variables"** وأضف:

```bash
# APP
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXTAUTH_URL=https://your-app.vercel.app

# AUTHENTICATION
AUTH_SECRET=your-generated-secret-here
JWT_SECRET_KEY=your-generated-secret-here

# GOOGLE OAUTH
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# DATABASE (NEON)
DATABASE_URL=your-neon-pooled-connection-string
DIRECT_URL=your-neon-direct-connection-string

# EMAIL (RESEND) - اختياري
RESEND_API_KEY=your-resend-api-key
RESEND_EMAIL_FROM=noreply@yourdomain.com
```

**⚠️ مهم:** لتوليد `AUTH_SECRET` جديد:
```bash
# على Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# على Mac/Linux
openssl rand -base64 32
```

### الخطوة 5: النشر
1. اضغط **"Deploy"**
2. انتظر حتى يكتمل البناء (2-5 دقائق)
3. بعد النجاح، ستحصل على رابط مثل: `https://your-app.vercel.app`

---

## 🔄 تحديث Google OAuth بعد النشر

### بعد الحصول على رابط Vercel:
1. ارجع إلى Google Cloud Console
2. اذهب إلى **Credentials** → اختر OAuth Client
3. أضف في **Authorized JavaScript origins**:
   ```
   https://your-app.vercel.app
   ```
4. أضف في **Authorized redirect URIs**:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
5. احفظ التغييرات

---

## 🔗 تفعيل Neon-Vercel Integration (اختياري)

### الفوائد:
- إنشاء database branches تلقائياً لكل preview deployment
- إدارة أفضل للـ connection strings

### الخطوات:
1. في Vercel Dashboard، اذهب إلى **"Integrations"**
2. ابحث عن **"Neon"**
3. اضغط **"Add Integration"**
4. اتبع التعليمات لربط حساب Neon

---

## 📊 متغيرات البيئة

### ملف `.env.local` (للتطوير المحلي):
```bash
# APP
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

# AUTHENTICATION
AUTH_SECRET=your-local-secret
JWT_SECRET_KEY=your-local-secret

# GOOGLE OAUTH
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# DATABASE (NEON)
DATABASE_URL=postgresql://...?sslmode=require&pgbouncer=true
DIRECT_URL=postgresql://...?sslmode=require

# EMAIL (RESEND)
RESEND_API_KEY=re_your_api_key
RESEND_EMAIL_FROM=noreply@localhost
```

### Vercel Environment Variables (للإنتاج):
يجب إضافة نفس المتغيرات في Vercel Dashboard مع تحديث:
- `NEXT_PUBLIC_APP_URL` → رابط Vercel
- `NEXTAUTH_URL` → رابط Vercel
- `AUTH_SECRET` → secret جديد للإنتاج
- `DATABASE_URL` → من Neon production database

---

## ✅ الاختبار بعد النشر

### 1. اختبار الصفحة الرئيسية
```
https://your-app.vercel.app
```
يجب أن تفتح بدون أخطاء

### 2. اختبار التسجيل
```
https://your-app.vercel.app/signup
```
- جرب التسجيل ببريد جديد
- تحقق من حفظ البيانات في Neon

### 3. اختبار تسجيل الدخول
```
https://your-app.vercel.app/signin
```
- جرب تسجيل الدخول بالبريد وكلمة المرور
- جرب تسجيل الدخول بـ Google

### 4. اختبار لوحة التحكم
```
https://your-app.vercel.app/dashboard
```
- تأكد من ظهور البيانات
- جرب إضافة مصروف جديد

### 5. فحص Logs
في Vercel Dashboard:
1. اذهب إلى **"Deployments"**
2. اختر آخر deployment
3. اضغط **"View Function Logs"**
4. تحقق من عدم وجود أخطاء

---

## 🐛 حل المشاكل الشائعة

### مشكلة: "Invalid redirect URI"
**الحل:**
- تأكد من إضافة redirect URI في Google Console
- تأكد من عدم وجود `/` في النهاية
- انتظر 5 دقائق بعد التحديث

### مشكلة: "Database connection failed"
**الحل:**
- تأكد من صحة `DATABASE_URL` في Vercel
- تأكد من وجود `?sslmode=require`
- تحقق من أن Neon database يعمل

### مشكلة: "Session not found"
**الحل:**
- تأكد من صحة `AUTH_SECRET` في Vercel
- تأكد من تطابق `NEXTAUTH_URL` مع رابط الموقع
- امسح cookies وحاول مرة أخرى

### مشكلة: "Build failed"
**الحل:**
- تحقق من Build Logs في Vercel
- تأكد من تشغيل `npm run build` محلياً بنجاح
- تأكد من وجود جميع dependencies في `package.json`

---

## 🔄 تحديث الموقع

### عند إضافة تغييرات جديدة:
```bash
git add .
git commit -m "وصف التحديث"
git push origin main
```

Vercel سيقوم بـ:
1. ✅ اكتشاف التحديث تلقائياً
2. ✅ بناء النسخة الجديدة
3. ✅ نشرها تلقائياً
4. ✅ إرسال إشعار بالنجاح/الفشل

---

## 📱 إضافة Domain مخصص (اختياري)

### في Vercel Dashboard:
1. اذهب إلى **"Settings"** → **"Domains"**
2. اضغط **"Add"**
3. أدخل domain الخاص بك: `rialmind.com`
4. اتبع التعليمات لتحديث DNS records
5. بعد التفعيل، حدّث:
   - `NEXT_PUBLIC_APP_URL` في Vercel
   - `NEXTAUTH_URL` في Vercel
   - Authorized URLs في Google Console

---

## 📈 المراقبة والصيانة

### Vercel Analytics:
- تفعيل Analytics في Vercel Dashboard
- مراقبة عدد الزوار والأداء

### Neon Monitoring:
- مراقبة استخدام قاعدة البيانات
- تفعيل Auto-scaling إذا لزم

### Logs:
- فحص Vercel Function Logs بانتظام
- إعداد تنبيهات للأخطاء

---

## 🎯 Checklist قبل النشر

- [ ] ✅ تم إنشاء Neon database
- [ ] ✅ تم تشغيل Prisma migrations
- [ ] ✅ تم إعداد Google OAuth
- [ ] ✅ تم رفع الكود على GitHub
- [ ] ✅ تم إضافة Environment Variables في Vercel
- [ ] ✅ تم النشر على Vercel بنجاح
- [ ] ✅ تم تحديث Google OAuth URLs
- [ ] ✅ تم اختبار التسجيل وتسجيل الدخول
- [ ] ✅ تم اختبار Google OAuth
- [ ] ✅ تم فحص Logs

---

## 📞 الدعم

### الموارد المفيدة:
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**🎉 مبروك! موقعك الآن على الإنترنت!**

**رابط الموقع:** `https://your-app.vercel.app`
