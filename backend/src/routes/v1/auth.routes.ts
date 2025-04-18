import { Router } from "express";
import { forgotPasswordAuth, getLogin, loginAuth, logoutAuth, registerAuth, resetPasswordAuth, verifyAuth } from "../../controllers/auth.controllers";
import { zodMiddleware } from "../../middleware/zodMiddleware";
import { forgetPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "../../schema/authSchema";
import { ckeckSession } from "../../middleware/sessionMiddleware";
import { checkRole } from "../../middleware/rolesMiddleware";

const router = Router();

router.post("/register", zodMiddleware(registerSchema), registerAuth);
router.post("/login", zodMiddleware(loginSchema), loginAuth);
router.post("/logout", logoutAuth);
router.get("/login/consult", ckeckSession, checkRole("admin"), getLogin);
router.post("/verify", verifyAuth);
router.post("/forgot-password", zodMiddleware(forgetPasswordSchema), forgotPasswordAuth);
router.post("/reset-password",zodMiddleware(resetPasswordSchema), resetPasswordAuth);
export default router;