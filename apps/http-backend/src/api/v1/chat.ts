import { Router } from "express";
import { middleware } from "../../middelware/middelware";
import { roomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";

const router: Router = Router();

router.post("/chat", middleware, async (req, res) => {
  
    const parseData = roomSchema.safeParse(req.body);

  if (!parseData.success) {
    res.status(405).json({
      message: "Incorrect inputs",
    });
  }

  //@ts-ignore TODO:fix typescript error you can use global types..
  const userId = req.userId;

  try {
    const room = await prisma.room.create({
      data: {
        slug: parseData.data?.roomid as string, // TODO: fix this.. as string
        adminId: userId,
      },
    });
  } catch (error) {
    res.status(405).json({
      message: "cannot create room ",
    });
  }
});
