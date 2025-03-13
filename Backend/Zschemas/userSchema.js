import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

const phoneSchema = z.string()
.length(10, "Phone number must be exactly 10 digits")
.regex(/^\d+$/, "Phone number must contain only numbers");

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: phoneSchema,
    bio: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(), 
    postalCode: z.string().optional(),
    role: z.enum(["Admin", "Supervisor", "Technician"]),
    group: z.string().optional(),
    lastLogin: z.date().optional(),
    isVerified: z.boolean().optional(),
})
.refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",  
    path: ["confirmPassword"],
  }); 