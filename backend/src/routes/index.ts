import { Router } from "express";
import healthRoutes from "./health.routes";
import productsRoutes from "./products.routes";
import authRoutes from "./auth.routes";

const routes = Router();

routes.use("/health", healthRoutes);
routes.use("/products", productsRoutes);
routes.use("/auth", authRoutes);

export default routes;
