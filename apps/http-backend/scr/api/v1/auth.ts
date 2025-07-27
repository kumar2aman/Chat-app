
import "dotenv/config"
import { Router } from "express"

import  jwt  from "jsonwebtoken";
import { middleware } from "../../middelware";
import {singupSchema} from "@repo/common/types" //  Note:- code is working.. don't know why this error is showing...
const router:Router = Router();


router.post("/signup",  (req, res)=>{
  
   const data = singupSchema.safeParse(req.body);
    
if(!data.success){
    return res.json({message:"incorrect inputs"})
}



})


router.post("/signin", middleware, (req, res)=>{
  
    const username = req.body.username;
    const password = req.body.password;
    
    const userId  = 1;
    
 const token = jwt.sign({userId}, process.env.JWT_SECRET as string);

 res.json({message: token})




})



export {router}