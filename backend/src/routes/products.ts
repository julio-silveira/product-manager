import { Router } from "express";
import ProductsController from "../controllers/products.controller";
import ProductsService from "../services/products.service";

const router = Router();

const controller = new ProductsController(new ProductsService());

router.get("/:id", controller.getOne);

router.get("/", controller.getAll);

router.post("/", controller.create);

export default router;
