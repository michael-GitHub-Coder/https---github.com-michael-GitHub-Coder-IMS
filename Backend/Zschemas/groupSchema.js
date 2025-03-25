import {z} from "zod"

export const groupSchema = z.object({

    name: z.string().min(1,"Name must be at least 1 character long"),
    // regionId: z.string().min(1,"Region must be at least 1 character long"),
    // supervisorId: z.string().min(1,"Supervisor must be at least 1 character long"),
    // createdBy: z.string().min(1,"Created by must be at least 1 character long"),

})


