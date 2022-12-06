import express, { json } from "express";

import userRoutes from "./routers/users.routes";
import sessionRoutes from "./routers/login.routes";

const app = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

export default app;
