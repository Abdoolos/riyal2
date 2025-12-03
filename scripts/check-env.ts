/**
 * Script للتحقق من المتغيرات البيئية
 */

import { config } from "dotenv"
import { resolve } from "path"

// تحميل ملف .env
config({ path: resolve(__dirname, "../.env") })

console.log("🔍 التحقق من المتغيرات البيئية...\n")

const requiredVars = {
  "NODE_ENV": process.env.NODE_ENV,
  "NEXT_PUBLIC_APP_URL": process.env.NEXT_PUBLIC_APP_URL,
  "NEXTAUTH_URL": process.env.NEXTAUTH_URL,
  "AUTH_SECRET": process.env.AUTH_SECRET,
  "GOOGLE_ID": process.env.GOOGLE_ID,
  "GOOGLE_SECRET": process.env.GOOGLE_SECRET,
  "DATABASE_URL": process.env.DATABASE_URL,
  "DIRECT_URL": process.env.DIRECT_URL,
}

let hasErrors = false

for (const [key, value] of Object.entries(requiredVars)) {
  if (!value) {
    console.log(`❌ ${key}: غير موجود`)
    hasErrors = true
  } else {
    // إخفاء القيم الحساسة
    if (key.includes("SECRET") || key.includes("DATABASE")) {
      const masked = value.substring(0, 10) + "..." + value.substring(value.length - 10)
      console.log(`✅ ${key}: ${masked}`)
    } else {
      console.log(`✅ ${key}: ${value}`)
    }
  }
}

console.log("\n" + "=".repeat(60))

if (hasErrors) {
  console.log("❌ يوجد متغيرات مفقودة! تحقق من ملف .env")
  process.exit(1)
} else {
  console.log("✅ جميع المتغيرات موجودة!")
  
  // التحقق من Google OAuth
  console.log("\n📋 معلومات Google OAuth:")
  console.log(`   GOOGLE_ID: ${process.env.GOOGLE_ID}`)
  console.log(`   GOOGLE_SECRET: ${process.env.GOOGLE_SECRET?.substring(0, 15)}...`)
  
  // التحقق من URLs
  console.log("\n🌐 URLs المتوقعة:")
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"
  console.log(`   Base URL: ${baseUrl}`)
  console.log(`   Callback URL: ${baseUrl}/api/auth/callback/google`)
  
  console.log("\n⚠️  تأكد من إضافة Callback URL في Google Console:")
  console.log(`   ${baseUrl}/api/auth/callback/google`)
  
  process.exit(0)
}
