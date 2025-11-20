"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthButtons } from "@/components/auth/oauth-buttons"
import { SignInWithEmailForm } from "@/components/forms/signin-with-email-form"
import { SignUpWithPasswordForm } from "@/components/forms/signup-with-password-form"
import { Icons } from "@/components/icons"

export default function SignUpPage() {
  const { data: session } = useSession()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  return (
    <div className="flex h-auto min-h-screen w-full items-center justify-center md:flex">
      <Card className="max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">تسجيل حساب جديد</CardTitle>
            <Link href="/">
              <Icons.close className="size-4" />
            </Link>
          </div>
          <CardDescription>
            اختر طريقة التسجيل المفضلة لديك
          </CardDescription>
        </CardHeader>
        <CardContent className="max-sm:w-full max-sm:max-w-[340px] max-sm:px-10">
          <OAuthButtons />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative mb-3 mt-6 flex justify-center text-xs uppercase">
              <span className="bg-background px-2">
                أو التسجيل بالبريد الإلكتروني
              </span>
            </div>
          </div>
          <SignInWithEmailForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative mb-3 mt-6 flex justify-center text-xs uppercase">
              <span className="bg-background px-2">
                أو التسجيل بكلمة مرور
              </span>
            </div>
          </div>
          <SignUpWithPasswordForm />
        </CardContent>
        <CardFooter className="grid w-full gap-4 text-sm text-muted-foreground max-sm:max-w-[340px] max-sm:px-10">
          <div>
            <div>
              <span> لديك حساب بالفعل؟ </span>
              <Link
                aria-label="Sign in"
                href="/signin"
                className="font-bold tracking-wide text-primary underline-offset-4 transition-all hover:underline"
              >
                سجل دخول
                <span className="sr-only">تسجيل الدخول</span>
              </Link>
              .
            </div>
            <div>
              <span>فقدت رابط التحقق من البريد؟ </span>
              <Link
                aria-label="Resend email verification link"
                href="/signup/reverify-email"
                className="text-sm font-normal text-primary underline-offset-4 transition-colors hover:underline"
              >
                إعادة إرسال
                <span className="sr-only">إعادة إرسال رابط التحقق</span>
              </Link>
              .
            </div>
          </div>

          <div className="text-sm text-muted-foreground md:text-xs">
            بالمتابعة، أنت توافق على{" "}
            <Link
              aria-label="Terms of Service"
              href="/tos"
              className="font-semibold underline-offset-4 transition-all hover:underline"
            >
              شروط الخدمة
            </Link>{" "}
            <br className="xs:hidden sm:block md:hidden" />
            و
            <Link
              aria-label="Privacy Policy"
              href="/privacy"
              className="font-semibold underline-offset-4 transition-all hover:underline"
            >
              {" "}سياسة الخصوصية
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
