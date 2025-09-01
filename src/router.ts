import { Router } from "express";
import { Controller } from "./controller/controller";
import { Service } from "./service/service";

const repo = new Service();
const controller = new Controller(repo);
const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
