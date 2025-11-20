import * as React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  // مؤقتاً: نسمح بالوصول بدون تحقق من المصادقة
  // TODO: إضافة التحقق من الجلسة لاحقاً
  
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
