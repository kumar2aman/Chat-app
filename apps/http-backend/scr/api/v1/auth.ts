
import "dotenv/config"
import { Router } from "express"

import  jwt  from "jsonwebtoken";

const router:Router = Router();


router.post("/signup",  (req, res)=>{
  
    // const username = req.body.username;
    // const password = req.body.password;
    
const userId  = 1;



 const token = jwt.sign({userId}, process.env.JWT_SECRET ?? "");

 res.json({message: token})

})


router.post("/signin", (req, res)=>{
  
    const username = req.body.username;
    const password = req.body.password;
    
    



})



export {router}