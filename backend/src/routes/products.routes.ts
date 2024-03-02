import { Router } from "express";
import ProductsController from "../controllers/products.controller";
import ProductsService from "../services/products.service";
import middlewares from "../middlewares";

const router = Router();

const controller = new ProductsController(new ProductsService());

router.get("/:id", middlewares.auth, controller.getOne);

router.get("/", middlewares.auth, controller.getAll);

router.post("/", middlewares.auth, controller.create);

router.put("/:id", middlewares.auth, controller.update);

export default router;
