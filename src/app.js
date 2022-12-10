import express, { json } from "express";
import sessionRoutes from "./routers/session.routes";

import userRoutes from "./routers/users.routes";


const app = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

export default app;
