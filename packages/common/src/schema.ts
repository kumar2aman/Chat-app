import { z} from "zod"



export const signupSchema = z.object({
    username:z.string().min(3).max(12),
    email:z.email(),
    password:z.string().min(8)
})


export const signinSchema = z.object({
     email:z.email(),
    password:z.string().min(8)
})


export const roomSchema = z.object({
    roomid:z.string()
})

