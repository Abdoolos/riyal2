# BACKEND PROMPT
# 🤖 Rial Mind Backend - بناء 25 خطوة

## 📊 السياق
- Frontend: 15 صفحة جاهزة
- NextAuth: Google, GitHub, Credentials, Resend
- Prisma: ORM جاهز
- Technologies: Next.js 14, TypeScript, Zod, Radix UI

---

# ⚙️ الخطوات 1-5: Prisma Schema

## الهدف
تحديث Prisma Schema بـ 8 Models جديدة وتشغيل Migration

## الخطوات

**الخطوة 1: حدّث User Model**
- أضف currency: "SAR"
- أضف language: "ar"  
- أضف phone: optional
- أضف emailNotifications, pushNotifications, budgetAlerts, reportNotifications: boolean

**الخطوة 2: أضف Expense Model**
- id, userId (FK), categoryId, amount, description, date, receipt, notes
- user relation, createdAt, updatedAt
- indexes: userId, date

**الخطوة 3: أضف Budget Model**
- id, userId (FK), categoryId, monthlyAmount
- user relation, createdAt, updatedAt
- unique: [userId, categoryId]
- index: userId

**الخطوة 4: أضف Goal و Occasion Models**
- Goal: id, userId, name, targetAmount, currentAmount, deadline, icon, category, description, user, timestamps
- Occasion: id, userId, name, type, date, budget, spent, icon, description, user, timestamps

**الخطوة 5: أضف Family و Notification Models**
- FamilyMember: id, userId, memberId, role, user, timestamps
- FamilyInvite: id, userId, inviteeEmail, role, inviteToken, expiresAt, accepted, user
- Notification: id, userId, type, title, description, read, data (Json), user, timestamps

بعد الخطوة 5 شغّل:
 الآن أعطِ Cline هذا الأمر البسيط:

text
اقرأ ملف BACKEND_BUILD.md بالكامل.

ابدأ بالخطوات 1-5 فقط (Prisma Schema):

1. حدّث User Model - أضف الحقول الجديدة
2. أضف Expense Model
3. أضف Budget Model
4. أضف Goal و Occasion Models
5. أضف FamilyMember, FamilyInvite, Notification Models

ثم شغّل:
npx prisma migrate dev --name add_financial_models

أخبرني عند الانتهاء!



---

# ⚙️ الخطوات 6-10: API Utils

## الهدف
إنشاء البنية الأساسية والدوال المساعدة

## الخطوات

**الخطوة 6: أنشئ src/lib/api-utils.ts**
- getAuthSession(): تحصل على session أو ترجع خطأ 401
- successResponse(data, message?): صيغة النجاح
- errorResponse(error, code): صيغة الخطأ
- validateUserId(userId, resourceUserId): التحقق من الملكية

**الخطوة 7: أنشئ src/validations/expense.ts**
- createExpenseSchema: Zod schema للإضافة
- updateExpenseSchema: Zod schema للتحديث
- getExpensesQuerySchema: Zod schema للـ Query

**الخطوة 8: أنشئ validations للـ Models الأخرى**
- src/validations/budget.ts
- src/validations/goal.ts
- src/validations/occasion.ts
- src/validations/family.ts
- src/validations/notification.ts

**الخطوة 9: أنشئ src/types/api.ts**
- ApiResponse<T> type
- ExpenseDTO, BudgetDTO, GoalDTO, إلخ

**الخطوة 10: التحقق من عدم وجود أخطاء**
- تأكد من الـ imports
- تأكد من Zod schemas

---

# ⚙️ الخطوات 11-15: API Expenses

## الهدف
بناء API المصاريف الكاملة (CRUD)

## الخطوات

**الخطوة 11: أنشئ src/app/api/expenses/route.ts**
- GET: جلب مصاريف المستخدم (مع pagination, filters)
- POST: إضافة مصروف جديد (مع validation, auth check)

**الخطوة 12: أنشئ src/app/api/expenses/[id]/route.ts**
- GET: جلب مصروف واحد (مع ownership check)
- PUT: تحديث مصروف (مع validation, ownership check)
- DELETE: حذف مصروف (مع ownership check)

**الخطوة 13: أنشئ src/actions/expense.ts**
- getExpenseById(id)
- getUserExpenses(userId)
- createExpense(data)
- updateExpense(id, data)
- deleteExpense(id)

**الخطوة 14: أنشئ src/services/expense-service.ts**
- getExpensesByCategory(userId, categoryId)
- getTotalExpensesByMonth(userId, month)
- getExpenseStats(userId)

**الخطوة 15: اختبر جميع endpoints**
- اختبر GET/POST/PUT/DELETE
- اختبر التصفية والترتيب
- اختبر معالجة الأخطاء

---

# ⚙️ الخطوات 16-20: APIs Budgets + Goals + Occasions

## الهدف
بناء APIs الثلاث الأخرى بنفس النمط

## الخطوات

**الخطوة 16: API Budgets الكاملة**
- src/app/api/budgets/route.ts (GET, POST)
- src/app/api/budgets/[id]/route.ts (GET, PUT, DELETE)
- src/actions/budget.ts (helper functions)
- التحقق من عدم تكرار الفئة للمستخدم

**الخطوة 17: API Goals الكاملة**
- src/app/api/goals/route.ts (GET, POST)
- src/app/api/goals/[id]/route.ts (GET, PUT, DELETE)
- src/actions/goal.ts (helper functions)
- دالة حساب التقدم والمبلغ المتبقي

**الخطوة 18: API Occasions الكاملة**
- src/app/api/occasions/route.ts (GET, POST)
- src/app/api/occasions/[id]/route.ts (GET, PUT, DELETE)
- src/actions/occasion.ts (helper functions)
- ترتيب حسب التاريخ

**الخطوة 19: أنشئ src/services/calculation-service.ts**
- calculateBudgetUsage(userId, categoryId)
- calculateGoalProgress(userId, goalId)
- calculateOccasionProgress(userId, occasionId)

**الخطوة 20: اختبر جميع APIs**
- اختبر كل endpoint
- تأكد من صحة الحسابات
- اختبر الترتيب والتصفية

---

# ⚙️ الخطوات 21-25: Family + Notifications + Analytics

## الهدف
إكمال جميع APIs الباقية

## الخطوات

**الخطوة 21: API Family والدعوات**
- src/app/api/family/route.ts (GET list, DELETE member)
- src/app/api/family/invite/route.ts (POST send invite)
- src/app/api/family/invite/[token]/route.ts (PUT accept invite)
- دالة إرسال البريد الإلكتروني

**الخطوة 22: API Notifications الكاملة**
- src/app/api/notifications/route.ts (GET, DELETE all)
- src/app/api/notifications/[id]/route.ts (PUT mark as read, DELETE)
- src/app/api/notifications/read-all/route.ts (PUT mark all as read)

**الخطوة 23: وظائف الإشعارات الآلية**
- src/services/notification-service.ts
- createBudgetAlert() عند تجاوز الميزانية
- createGoalNotification() عند تحديث الهدف
- createOccasionReminder() للمناسبات القريبة

**الخطوة 24: API Analytics والتقارير**
- src/app/api/analytics/route.ts (GET إحصائيات)
- src/app/api/reports/monthly/route.ts (GET تقرير شهري)
- src/services/analytics-service.ts (حسابات معقدة)

**الخطوة 25: اختبار end-to-end والربط**
- اختبر جميع APIs معاً
- اختبر الإشعارات الآلية
- اختبر التحليلات
- تأكد من ربط الـ Frontend

---

## ✅ ملاحظات مهمة جداً

### الأمان
- كل API يفحص getAuthSession()
- كل API يفحص validateUserId()
- عدم إرجاع معلومات حساسة

### البيانات
- استخدم auth() من @/auth
- استخدم prisma من @/config/db
- استخدم Zod للـ validation

### الأخطاء
- معالجة آمنة للأخطاء
- HTTP status codes صحيحة
- رسائل خطأ واضحة

### الأداء
- استخدام Indexes
- pagination للـ lists
- تجنب N+1 queries

---

## 🚀 ابدأ الآن!

ابدأ بالخطوات 1-5 فقط (Prisma Schema)

أخبرني عند الانتهاء، ثم سأعطيك الخطوات 6-10

- Family API للعائلة والدعوات
- Monthly Reports API
- Export/Import Data APIs

---

## 🚀 __الخطوات التالية:__

1. __اختبار APIs__: استخدم Postman أو Thunder Client
2. __ربط Frontend__: ابدأ بربط الصفحات مع APIs
3. __إضافة myimage1__: حسب طلبك الأصلي، أضف الصورة والديزاينر
4. __Deployment__: نشر التطبيق على Vercel

# 🔐 تحديث نظام تسجيل الدخول - Rial Mind

## الهدف
تحديث نظام المصادقة ليدعم فقط طريقتين:
1. تسجيل الدخول بـ Google OAuth
2. تسجيل الدخول بالإيميل وكلمة المرور

وجعل التسجيل إجبارياً لجميع الصفحات ماعدا الصفحة الرئيسية وصفحات التسويق.

---

## المهام المطلوبة

### المهمة 1: تحديث src/config/auth.ts
- احذف GitHub Provider
- احذف Resend Provider  
- ابقِ فقط على Google Provider و Credentials Provider
- تأكد من allowDangerousEmailAccountLinking: true في Google

### المهمة 2: تحديث src/auth.ts
- عدّل pages إلى:
  - signIn: "/signin"
  - error: "/signin"
- احذف verifyRequest page
- تأكد من session strategy: "jwt"
- تأكد من callbacks صحيحة

### المهمة 3: إنشاء صفحة تسجيل دخول حديثة
- أنشئ src/app/(auth)/signin/page.tsx
- تصميم حديث واحترافي مع:
  - زر تسجيل دخول بـ Google (مع أيقونة Chrome)
  - فورم إيميل وكلمة مرور
  - Divider بين الخيارين
  - رسائل الأخطاء واضحة
  - Loading states
  - رابط للتسجيل
- استخدام Framer Motion للـ animations
- استخدام Lucide React للـ icons
- تصميم gradient من emerald إلى amber
- responsive للموبايل

### المهمة 4: إنشاء Middleware للحماية
- أنشئ/حدّث src/middleware.ts
- الصفحات العامة المسموحة بدون تسجيل:
  - /
  - /signin
  - /signup
  - /terms
  - /privacy
  - /pricing
- جميع الصفحات الأخرى تحتاج تسجيل دخول
- إذا لم يكن مسجل دخول: redirect إلى /signin
- إذا مسجل دخول ويزور /signin: redirect إلى /dashboard

### المهمة 5: تحديث UserMenu Component
- في src/components/header/user-menu.tsx
- تأكد من استخدام signOut() من next-auth/react
- عرض اسم المستخدم وصورته
- خيار تسجيل الخروج واضح

---

## معايير التصميم

### الألوان
- Primary: emerald (من 50 إلى 900)
- Secondary: amber (من 50 إلى 900)
- Background: gradient من emerald-50 إلى amber-50
- Text: emerald-800 و emerald-600

### الخطوط
- العربية بشكل واضح وجميل
- English inputs بـ dir="ltr"

### المؤثرات
- Shadows: shadow-lg, shadow-xl
- Blur: backdrop-blur-xl
- Hover effects: scale و shadow
- Transitions سلسة

### الأيقونات المطلوبة
- Mail, Lock, Eye, EyeOff, Chrome, Loader2, AlertCircle, Sparkles من lucide-react

---

## الأمان

### Validation
- التحقق من email صحيح
- التحقق من password مدخل
- عرض أخطاء واضحة بالعربية

### Session
- استخدام JWT
- مدة 30 يوماً
- تحديث كل 24 ساعة

### Redirect
- بعد تسجيل دخول ناجح: /dashboard
- callbackUrl للرجوع للصفحة المطلوبة

---

## الاختبار المطلوب

بعد إكمال المهام:
1. اختبر تسجيل الدخول بالإيميل
2. اختبر تسجيل الدخول بـ Google
3. اختبر الـ Middleware على صفحات محمية
4. اختبر responsive على الموبايل
5. اختبر رسائل الأخطاء

---

## ملاحظات مهمة

- استخدم "use client" في صفحة signin
- استخدم signIn من next-auth/react
- لا تستخدم server actions في هذه الصفحة
- التصميم يجب أن يكون متناسق مع باقي التطبيق
- جميع النصوص بالعربية ماعدا email inputs

---

ابدأ الآن بالمهام 1-5 بالترتيب.
أخبرني عند إكمال كل مهمة.
