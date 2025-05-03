import { Router } from "express";
import { acceptExchangeRequest, create, deleteExchangeRequest, findByOwner, findByRequester } from "../../controllers/exchange.controllers";

const router = Router();

router.post("/", create);
router.get("/requester", findByRequester )
router.get("/owner", findByOwner );
router.put("/:id/accept", acceptExchangeRequest);
router.delete("/:id", deleteExchangeRequest);

export default router;