import { z } from "zod"

/**
 * Schema لإنشاء ميزانية جديدة
 */
export const createBudgetSchema = z.object({
  categoryId: z.string().min(1, "يجب اختيار فئة"),
  monthlyAmount: z.number().positive("المبلغ الشهري يجب أن يكون موجباً"),
})

/**
 * Schema لتحديث ميزانية
 */
export const updateBudgetSchema = z.object({
  monthlyAmount: z.number().positive("المبلغ الشهري يجب أن يكون موجباً"),
})

/**
 * Schema لمعاملات الاستعلام
 */
export const getBudgetsQuerySchema = z.object({
  categoryId: z.string().optional(),
})

/**
 * Types المشتقة من Schemas
 */
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>
export type GetBudgetsQuery = z.infer<typeof getBudgetsQuerySchema>
