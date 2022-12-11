import "express-async-errors";
import express, { json } from "express";
import userRoutes from "./routers/users.routes";
import { errorHandler } from "./errors";
import sessionRoutes from "./routers/session.routes";
import userRoutes from "./routers/users.routes";



const app = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

app.use(errorHandler);

export { app, errorHandler };
