/**
 * Script لحذف المستخدمين التجريبيين وإعادة إنشائهم
 * 
 * ⚠️ تحذير: هذا الـ script سيحذف جميع المستخدمين التجريبيين!
 * استخدمه فقط في بيئة التطوير
 */

import { PrismaClient } from "@prisma/client"
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient()

// قائمة المستخدمين التجريبيين
const TEST_USERS = [
  {
    email: "test@example.com",
    password: "password123",
  },
  {
    email: "admin@example.com",
    password: "admin123",
  },
]

async function resetTestUsers() {
  try {
    console.log("🗑️  حذف المستخدمين التجريبيين القدامى...")

    // حذف المستخدمين التجريبيين
    const testEmails = TEST_USERS.map(u => u.email)
    
    const deleted = await prisma.user.deleteMany({
      where: {
        email: {
          in: testEmails,
        },
      },
    })

    console.log(`✅ تم حذف ${deleted.count} مستخدم`)

    console.log("\n👤 إنشاء المستخدمين التجريبيين الجدد...")

    // إنشاء المستخدمين الجدد
    for (const user of TEST_USERS) {
      const passwordHash = await bcryptjs.hash(user.password, 10)
      
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          passwordHash,
          emailVerified: new Date(), // مفعّل تلقائياً
          emailVerificationToken: null,
        },
      })

      console.log(`✅ تم إنشاء: ${newUser.email}`)
    }

    console.log("\n🎉 تم إعادة إنشاء جميع المستخدمين التجريبيين بنجاح!")
    console.log("\n📋 يمكنك الآن تسجيل الدخول بـ:")
    TEST_USERS.forEach(user => {
      console.log(`   - البريد: ${user.email}`)
      console.log(`     كلمة المرور: ${user.password}`)
      console.log("")
    })

  } catch (error) {
    console.error("❌ حدث خطأ:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// تشغيل الـ script
resetTestUsers()
  .then(() => {
    console.log("✅ تم الانتهاء بنجاح")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ فشل الـ script:", error)
    process.exit(1)
  })
