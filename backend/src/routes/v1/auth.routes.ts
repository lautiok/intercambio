import { Router } from "express";
import { getLogin, loginAuth, logoutAuth, registerAuth, verifyAuth } from "../../controllers/auth.controllers";
import { zodMiddleware } from "../../middleware/zodMiddleware";
import { loginSchema, registerSchema } from "../../schema/authSchema";
import { ckeckSession } from "../../middleware/sessionMiddleware";
import { checkRole } from "../../middleware/rolesMiddleware";

const router = Router();

router.post("/register", zodMiddleware(registerSchema), registerAuth);
router.post("/login", zodMiddleware(loginSchema), loginAuth);
router.post("/logout", logoutAuth);
router.get("/login/consult", ckeckSession, checkRole("admin"), getLogin);
router.post("/verify", verifyAuth);

export default router;