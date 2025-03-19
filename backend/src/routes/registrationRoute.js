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
router.get("/:idEvent/:idUser", show);

router.use(authorizer(["admin"]));

router.get("/", index);
router.delete("/:id", destroy);

export default router;