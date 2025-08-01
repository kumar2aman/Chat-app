import { Router } from "express";
import { middleware } from "../../middelware/middelware";
import { roomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";

const chatRouter: Router = Router();

chatRouter.post("/chat", middleware, async (req, res) => {
  
    const parseData = roomSchema.safeParse(req.body);

      console.log("parsseDATa is ",parseData)
    

  if (!parseData.success) {
    res.status(405).json({
      message: "Incorrect inputs",
    });
  }


  //@ts-ignore TODO:fix typescript error you can use global types..
  const userId = req.userId;

  console.log("userid is", userId)

  try {
    const room = await prisma.room.create({
      data: {
        slug: parseData.data?.roomid as string, // TODO: fix this.. as string
        adminId: userId,
      },
    });

    res.json({
      message: "room created"
    })
  } catch (error) {
    res.status(405).json({
      message: "cannot create room ",
    });
  }
});


export {chatRouter};
