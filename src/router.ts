import { Router } from "express";
import { Controller } from "./controller/controller";
import { Service } from "./service/service";

const repo = new Service();
const controller = new Controller(repo);
const router = Router();

router.get("/:bookByNAme", controller.getBookByName);
router.post("/borrow/:bookID", controller.borrow);
router.post("/return/:bookID", controller.returnBook);
// router.get("/", controller.getAll);


export default router;
