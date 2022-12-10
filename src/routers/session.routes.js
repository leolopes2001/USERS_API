import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import ensurePasswordMatchesMiddleware from "../middlewares/ensurePasswordMatches.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middlewares";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { createSessionSchema } from "../schemas/session.schemas";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  ensureDataIsValidMiddleware(createSessionSchema),
  ensureUserExistsMiddleware,
  ensurePasswordMatchesMiddleware,
  createSessionController
);

export default sessionRoutes;
