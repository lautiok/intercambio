import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../../controllers/users.controllers";
import { zodMiddleware } from "../../middleware/zodMiddleware";
import { createUserSchema } from "../../schema/usersSchema";

const router = Router();

router.post("/", zodMiddleware(createUserSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;