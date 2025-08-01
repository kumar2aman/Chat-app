import "dotenv/config"
import  { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;




  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({ message: "not found Header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    

//@ts-ignore TODO: fix typescript error
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded data is ", decode.userId)

    if (decode.userId) {
      //@ts-ignore
      req.userId = decode.userId;
      next();
    } else {
      return res.json({ message: "unable to verify user" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
};
