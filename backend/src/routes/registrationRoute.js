import { Router } from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/registrationController.js";
import authorizer from "../middlewares/authorizer.js";
import authenticator from "../middlewares/authenticator.js";

const router = Router();

router.use(authenticator);

router.post("/", store);
router.put("/:id", update);

router.use(authorizer(["admin"]));

router.get("/", index);
router.get("/:id", show);
router.delete("/:id", destroy);

export default router;