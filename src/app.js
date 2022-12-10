import "express-async-errors";
import express, { json } from "express";
import userRoutes from "./routers/users.routes";
import sessionRoutes from "./routers/login.routes";
import { errorHandler } from "./errors";

const app = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

app.use(errorHandler);

export { app, errorHandler };
