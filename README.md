# ريال مايند - Riyal Mind

تطبيق ذكي لإدارة المصاريف العائلية بتقنيات الذكاء الاصطناعي

## الوصف:

تطبيق ويب متكامل لإدارة المصاريف العائلية مبني بأحدث التقنيات. يساعدك على تتبع مصاريفك اليومية، تحديد ميزانيات شهرية، وضع أهداف مالية، وإدارة المناسبات الخاصة.

## التقنيات المستخدمة:

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Animation**: Framer Motion
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Authentication**: NextAuth v5 (Google OAuth + Credentials)
- **Email**: Resend + React Email
- **Validation**: Zod
- **UI Components**: shadcn/ui

## المميزات الحالية:

- [x] نظام مصادقة متكامل (Google OAuth + Email/Password)
- [x] إدارة المصاريف مع فئات وبنود فرعية
- [x] نظام الميزانيات الشهرية
- [x] الأهداف المالية
- [x] إدارة المناسبات الخاصة
- [x] نظام الإشعارات
- [x] لوحة تحكم تفاعلية
- [x] دعم كامل للغة العربية (RTL)
- [x] تصميم متجاوب (Responsive)
- [x] واجهة مستخدم حديثة مع animations

## قيد التطوير:

- [ ] المصادقة الثنائية (2FA) مع QR Code
- [ ] تقارير وتحليلات متقدمة
- [ ] إدارة العائلة والمشاركة
- [ ] تصدير البيانات (PDF/Excel)
- [ ] دعم عملات متعددة
- [ ] تطبيق الجوال (React Native)

## التثبيت والتشغيل:

```bash
# تثبيت المكتبات
npm install

# إعداد قاعدة البيانات
npx prisma generate
npx prisma db push

# تشغيل المشروع
npm run dev
```

## المتغيرات البيئية:

راجع ملف `.env.example` للمتغيرات المطلوبة.

---

## الترخيص:

MIT License

## المساهمة:

نرحب بمساهماتكم! يرجى فتح Issue أو Pull Request للتحسينات والإضافات.

## الدعم:

للدعم والاستفسارات، يرجى التواصل عبر Issues في المستودع.
