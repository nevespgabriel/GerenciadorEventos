import { Router } from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/eventController.js";
import authorizer from "../middlewares/authorizer.js";
import authenticator from "../middlewares/authenticator.js";

const router = Router();

router.use(authenticator);
router.use(authorizer("admin"));

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;