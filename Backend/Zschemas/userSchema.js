import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 6 characters long"),
})

const phoneSchema = z.string()
  .length(10, "Phone number must be exactly 10 digits")
  .regex(/^\d+$/, "Phone number must contain only numbers");

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: phoneSchema,
  bio: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(), 
  postalCode: z.string().optional(),
  role: z.string().default("Admin"),
  group: z.string().optional(),
  lastLogin: z.date().optional(),
  isVerified: z.boolean().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const AddmemberSchema = z.object({
 
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().default("123456").optional(), 
  confirmPassword: z.string().default("123456").optional(), 
  phoneNumber: phoneSchema,
  bio: z.string().optional(),
  country: z.string(),
  postalCode: z.string(),
  group: z.string().min(1,"Group must be at least 1 character long"),
  role: z.enum(["Technician", "Supervisor"]),
  city: z.string(), 

}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


