import "reflect-metadata";
import "express-async-errors";

import cors from "cors";
import express from "express";
import routes from "./routes";
import middlewares from "./middlewares";

const app = express();
app.use(cors());
app.use(express.json());
app.use(middlewares.connection.open);
app.use(routes);

app.use(middlewares.error);
export default app;
