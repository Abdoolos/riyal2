import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "../styles/globals.css"
import { Toaster } from "sonner"
import NextAuthSessionProvider from "@/providers/session-provider"

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ريال مايند - إدارة المصاريف الذكية",
  description: "تطبيق ذكي لإدارة المصاريف العائلية بتقنيات الذكاء الاصطناعي",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <NextAuthSessionProvider>
          {children}
          <Toaster position="top-center" richColors />
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
