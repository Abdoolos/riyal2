"use client"

import { motion } from "framer-motion"
import { 
  TrendingDown, 
  TrendingUp, 
  Wallet, 
  Calendar,
  Plus,
  List,
  FileText,
  CreditCard,
  Settings,
  HelpCircle,
  Users,
  Bell,
  Target,
  PieChart,
  Gift,
  BarChart3,
  Home
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // بيانات وهمية للعرض
  const stats = {
    totalExpenses: 4250,
    monthlyBudget: 8000,
    remaining: 3750,
    currency: "ر.س"
  }

  const recentExpenses = [
    { id: 1, name: "سوبر ماركت", amount: 450, category: "طعام", categoryIcon: "🍽️", date: "اليوم" },
    { id: 2, name: "بنزين", amount: 200, category: "مواصلات", categoryIcon: "🚗", date: "أمس" },
    { id: 3, name: "مطعم", amount: 320, category: "ترفيه", categoryIcon: "🎉", date: "أمس" },
  ]

  const percentage = (stats.totalExpenses / stats.monthlyBudget) * 100

  // قائمة الأقسام الرئيسية
  const mainActions = [
    {
      icon: Plus,
      title: "إضافة مصروف",
      description: "أضف مصروف جديد",
      href: "/add-expense",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: List,
      title: "قائمة المصاريف",
      description: "عرض جميع المصاريف",
      href: "/expenses-list",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Target,
      title: "الميزانيات",
      description: "إدارة الميزانيات",
      href: "/budgets",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: FileText,
      title: "التقارير",
      description: "تقارير شهرية مفصلة",
      href: "/reports",
      color: "from-orange-500 to-red-600"
    }
  ]

  // أقسام إضافية
  const secondaryActions = [
    {
      icon: Gift,
      title: "المناسبات",
      description: "إدارة المناسبات والميزانيات الخاصة",
      href: "/occasions",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: Users,
      title: "الحساب العائلي",
      description: "إدارة أفراد العائلة",
      href: "/family",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: PieChart,
      title: "التحليلات",
      description: "تحليلات وتوصيات ذكية",
      href: "/analytics",
      color: "from-teal-500 to-green-600"
    },
    {
      icon: BarChart3,
      title: "الأهداف المالية",
      description: "تحديد وتتبع الأهداف",
      href: "/goals",
      color: "from-yellow-500 to-orange-600"
    }
  ]

  // الإعدادات والمساعدة
  const settingsActions = [
    {
      icon: CreditCard,
      title: "الاشتراك والفواتير",
      href: "/billing"
    },
    {
      icon: Settings,
      title: "الإعدادات",
      href: "/settings"
    },
    {
      icon: HelpCircle,
      title: "الأسئلة الشائعة",
      href: "/faq"
    },
    {
      icon: Bell,
      title: "الإشعارات",
      href: "/notifications"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                title="العودة للصفحة الرئيسية"
              >
                <Home className="w-5 h-5 text-white" />
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-800">ريال مايند</h1>
                <p className="text-sm text-emerald-600">لوحة التحكم الرئيسية</p>
              </div>
            </div>
            <Link
              href="/add-expense"
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:from-emerald-700 hover:to-amber-700 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              إضافة مصروف
            </Link>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* البطاقات الإحصائية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* إجمالي المصاريف */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-emerald-600">إجمالي المصاريف</p>
                <h3 className="text-3xl font-bold text-emerald-800">
                  {stats.totalExpenses.toLocaleString('en-US') }
                </h3>
                <p className="text-sm text-emerald-500 mt-1">{stats.currency}</p>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-7 h-7 text-red-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-red-600 font-medium">+12%</span>
              <span className="text-emerald-600">عن الشهر الماضي</span>
            </div>
          </motion.div>

          {/* الميزانية الشهرية */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-emerald-600">الميزانية الشهرية</p>
                <h3 className="text-3xl font-bold text-emerald-800">
                  {stats.monthlyBudget.toLocaleString('en-US') }
                </h3>
                <p className="text-sm text-emerald-500 mt-1">{stats.currency}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Wallet className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            {/* شريط التقدم */}
            <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-600 to-amber-600 h-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </motion.div>

          {/* المتبقي */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-emerald-600">المتبقي</p>
                <h3 className="text-3xl font-bold text-emerald-700">
                  {stats.remaining.toLocaleString('en-US') }
                </h3>
                <p className="text-sm text-emerald-500 mt-1">{stats.currency}</p>
              </div>
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-emerald-600 font-medium">{(100 - percentage).toFixed(0)}%</span>
              <span className="text-emerald-600">من الميزانية</span>
            </div>
          </motion.div>
        </div>

        {/* الأقسام الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">الأقسام الرئيسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-emerald-800 mb-1">{action.title}</h3>
                  <p className="text-sm text-emerald-600">{action.description}</p>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* أقسام إضافية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">أدوات متقدمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondaryActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-emerald-800 mb-1">{action.title}</h3>
                  <p className="text-sm text-emerald-600">{action.description}</p>
                </Link>
              )
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* آخر المصاريف */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-emerald-800">آخر المصاريف</h2>
              <Link
                href="/expenses-list"
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 text-sm"
              >
                عرض الكل
                <List className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{expense.categoryIcon}</div>
                    <div>
                      <h3 className="font-semibold text-emerald-800">{expense.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-emerald-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {expense.date}
                        </span>
                        <span>•</span>
                        <span>{expense.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-red-600">
                      {expense.amount.toLocaleString('en-US') } {stats.currency}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* الإعدادات والمساعدة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6"
          >
            <h2 className="text-xl font-bold text-emerald-800 mb-4">الإعدادات والمساعدة</h2>
            <div className="space-y-2">
              {settingsActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="font-medium text-emerald-800">{action.title}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
