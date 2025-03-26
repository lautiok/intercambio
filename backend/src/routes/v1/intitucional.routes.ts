import { Router } from "express";
import { createInstitucional, deleteInstitucional, getInstitucional, getInstitucionalById, updateInstitucional } from "../../controllers/institucional.controllers";

const router = Router();

router.post("/", createInstitucional);
router.get("/", getInstitucional);
router.get("/:id", getInstitucionalById);
router.put("/:id", updateInstitucional);
router.delete("/:id", deleteInstitucional);

export default router;