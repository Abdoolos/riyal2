/**
 * Script لإصلاح المستخدمين القدامى - تفعيل التحقق التلقائي
 * 
 * هذا الـ script يقوم بـ:
 * 1. البحث عن جميع المستخدمين الذين emailVerified = null
 * 2. تحديث emailVerified إلى التاريخ الحالي
 * 3. طباعة عدد المستخدمين المحدثين
 */

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function fixUsersVerification() {
  try {
    console.log("🔍 البحث عن المستخدمين غير المفعلين...")

    // البحث عن المستخدمين غير المفعلين
    const unverifiedUsers = await prisma.user.findMany({
      where: {
        emailVerified: null,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    })

    console.log(`📊 تم العثور على ${unverifiedUsers.length} مستخدم غير مفعل`)

    if (unverifiedUsers.length === 0) {
      console.log("✅ جميع المستخدمين مفعلين بالفعل!")
      return
    }

    // طباعة قائمة المستخدمين
    console.log("\n📋 قائمة المستخدمين غير المفعلين:")
    unverifiedUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (تم الإنشاء: ${user.createdAt.toLocaleDateString("ar")})`)
    })

    // تحديث جميع المستخدمين
    console.log("\n🔄 جاري تفعيل المستخدمين...")
    
    const result = await prisma.user.updateMany({
      where: {
        emailVerified: null,
      },
      data: {
        emailVerified: new Date(),
      },
    })

    console.log(`✅ تم تفعيل ${result.count} مستخدم بنجاح!`)
    
    // التحقق من النتيجة
    const remainingUnverified = await prisma.user.count({
      where: {
        emailVerified: null,
      },
    })

    if (remainingUnverified === 0) {
      console.log("🎉 جميع المستخدمين الآن مفعلين!")
    } else {
      console.log(`⚠️ لا يزال هناك ${remainingUnverified} مستخدم غير مفعل`)
    }

  } catch (error) {
    console.error("❌ حدث خطأ:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// تشغيل الـ script
fixUsersVerification()
  .then(() => {
    console.log("\n✅ تم الانتهاء من الـ script بنجاح")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ فشل الـ script:", error)
    process.exit(1)
  })
