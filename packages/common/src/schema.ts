import {email, string, z} from "zod"



export const sigupSchema = z.object({
    username:z.string().min(3).max(12),
    email:email(),
    password:string().min(8)
})


export const siginSchema = z.object({
     email:email(),
    password:string().min(8)
})


export const roomSchema = z.object({
    roomid:string()
})

