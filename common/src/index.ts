import z from "zod"

export const signupInput = z.object({
  email:z.string().email(),
  name:z.string().optional(),
  password:z.string().min(6)
})

export const signinInput = z.object({
  email:z.string().email(),
  password:z.string().min(6)
})

export const createBlogInput = z.object({
  title:z.string(),
  content:z.string(),
})

export const updateBlogInput = z.object({
  title:z.string(),
  content:z.string(),
  id:z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>