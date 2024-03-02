import "reflect-metadata";
import "express-async-errors";

import express from "express";
import routes from "./routes";
import middlewares from "./middlewares";

const app = express();
app.use(express.json());
app.use(middlewares.connection.open);
app.use(routes);
app.use(middlewares.connection.close);

app.use(middlewares.error);
export default app;
