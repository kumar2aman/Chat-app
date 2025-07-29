import "dotenv/config";
import { Router } from "express";

import jwt from "jsonwebtoken";
import { middleware } from "../../middelware";
import { signinSchema, signupSchema } from "@repo/common/types";

import { prisma } from "@repo/db/client";

const router: Router = Router();

router.post("/signup", async (req, res) => {

  const parseData = signupSchema.safeParse(req.body);

  //Db call

  if (!parseData.success) {
    return res.json({ message: "incorrect inputs" });
  }

  try {


     const userData = await prisma.user.create({
    data: {
      username: parseData.data.username,
      email: parseData.data.email,   /// TODO: hashed password
      password: parseData.data.password,
    },
  });

  res.json({
    userId: userData.id,
  })
    
  } catch (error) {
    res.json({message: "user already exists with this email"})
  }

 
});

router.post("/signin", async (req, res) => {
 
 
  const parseData = signinSchema.safeParse(req.body);

  if (!parseData.success) {
    return res.json({ message: "incorrect inputs" });
  }

try {
  
    //Db call


  // TODO: compare the hashed password..

   const userData = await prisma.user.findFirst({
    where:{
      email:parseData.data.email,
      password:parseData.data.password,
      
    }
   });

   if(!userData){
    return res.status(403).json({
      message:"user did not exists.."
    })
   }

   const userId = userData?.id

  const token = jwt.sign({ userId },process.env.JWT_SECRET as string);

  res.json({ message: token });
} catch (error) {
  
}
});

export { router };
