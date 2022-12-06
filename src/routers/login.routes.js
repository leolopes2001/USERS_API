import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import ensurePasswordMatchesMiddleware from "../middlewares/ensurePasswordMatches.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middlewares";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  ensureUserExistsMiddleware,
  ensurePasswordMatchesMiddleware,
  createSessionController
);

export default sessionRoutes;
