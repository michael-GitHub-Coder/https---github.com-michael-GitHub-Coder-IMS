import {z} from "zod"

export const incidentSchema = z.object({    
    title: z.string().min(1,"Title must be at least 1 character long"),
    description: z.string().min(1,"Description must be at least 1 character long"),
    priority: z.enum(["Low", "Medium", "High"]),
    status: z.enum(["Open", "In Progress", "Closed"]),
    region: z.string().min(1,"Region must be at least 1 character long"),
    group: z.string().min(1,"Group must be at least 1 character long"),
})