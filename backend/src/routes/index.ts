import { Router } from "express";
import healthRoutes from "./health";
import productsRoutes from "./products";

const routes = Router();

routes.use("/health", healthRoutes);
routes.use("/products", productsRoutes);

export default routes;
