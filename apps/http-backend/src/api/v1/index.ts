import { Router } from "express";

import { autRouter } from "./auth";
import { chatRouter } from "./chat";

const router: Router = Router();

router.use("/auth", autRouter);
router.use("/chats", chatRouter);

export { router };
