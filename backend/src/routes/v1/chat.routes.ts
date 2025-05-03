import { Router } from "express";
import { getMessages } from "../../controllers/chat.controllers";

const router = Router();

router.get("/:chatId/messages", getMessages);

export default router;