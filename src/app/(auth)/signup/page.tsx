"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function SignUpPage() {
  return (
    <div className="flex h-auto min-h-screen w-full items-center justify-center md:flex">
      <Card className="max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[450px]">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <Icons.close className="size-4" />
            </Link>
          </div>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Icons.settings className="size-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl">التسجيل معطل مؤقتاً</CardTitle>
          <CardDescription className="text-base pt-2">
            نعمل حالياً على تحسين نظام التسجيل لتوفير أفضل تجربة لك
          </CardDescription>
        </CardHeader>
        <CardContent className="max-sm:w-full max-sm:max-w-[340px] max-sm:px-10 text-center space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              سيتم تفعيل التسجيل قريباً جداً
            </p>
            <p className="text-xs text-muted-foreground">
              نقدر تفهمك وصبرك معنا
            </p>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/signin">
                تسجيل الدخول
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/">
                العودة للرئيسية
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
