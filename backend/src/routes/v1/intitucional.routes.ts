import { Router } from "express";
import { createInstitucional, deleteInstitucional, getInstitucional, getInstitucionalById, updateInstitucional } from "../../controllers/institucional.controllers";
import { ckeckSession } from "../../middleware/sessionMiddleware";
import { checkRole } from "../../middleware/rolesMiddleware";

const router = Router();

router.post("/", ckeckSession, checkRole("admin"), createInstitucional,);
router.get("/", getInstitucional);
router.get("/:id", ckeckSession, checkRole("admin"), getInstitucionalById);
router.put("/:id",ckeckSession, checkRole("admin"),  updateInstitucional);
router.delete("/:id",ckeckSession, checkRole("admin"), deleteInstitucional);

export default router;