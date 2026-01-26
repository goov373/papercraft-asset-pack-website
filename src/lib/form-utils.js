import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

/**
 * Custom hook for creating validated forms with Zod schemas
 * @param {import('zod').ZodSchema} schema - Zod validation schema
 * @param {import('react-hook-form').UseFormProps} options - Additional react-hook-form options
 * @returns {import('react-hook-form').UseFormReturn}
 *
 * @example
 * ```jsx
 * import { z } from "zod"
 * import { useValidatedForm } from "@/lib/form-utils"
 *
 * const schema = z.object({
 *   email: z.string().email("Invalid email"),
 *   password: z.string().min(8, "Password must be at least 8 characters"),
 * })
 *
 * function LoginForm() {
 *   const { register, handleSubmit, formState: { errors } } = useValidatedForm(schema)
 *
 *   const onSubmit = (data) => {
 *     console.log(data) // { email: string, password: string }
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register("email")} />
 *       {errors.email && <span>{errors.email.message}</span>}
 *
 *       <input type="password" {...register("password")} />
 *       {errors.password && <span>{errors.password.message}</span>}
 *
 *       <button type="submit">Login</button>
 *     </form>
 *   )
 * }
 * ```
 */
export function useValidatedForm(schema, options = {}) {
  return useForm({
    resolver: zodResolver(schema),
    mode: "onBlur", // Validate on blur for better UX
    ...options,
  })
}

/**
 * Helper to get error message from form state
 * @param {import('react-hook-form').FieldErrors} errors
 * @param {string} fieldName
 * @returns {string | undefined}
 */
export function getFieldError(errors, fieldName) {
  const error = errors[fieldName]
  return error?.message?.toString()
}

/**
 * Helper to check if a field has an error
 * @param {import('react-hook-form').FieldErrors} errors
 * @param {string} fieldName
 * @returns {boolean}
 */
export function hasFieldError(errors, fieldName) {
  return !!errors[fieldName]
}

/**
 * Re-export commonly used utilities for convenience
 */
export { zodResolver } from "@hookform/resolvers/zod"
export { useForm, useFormContext, FormProvider, Controller, useWatch, useFieldArray } from "react-hook-form"
