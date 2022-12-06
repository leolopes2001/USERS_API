import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  retrieveUserController,
  updateUserController,
} from "../controllers/users.controller";
import checkAdmPermissionsMiddleware from "../middlewares/checkAdmPermissions.middleware";
import ensureAdmMiddleware from "../middlewares/ensureAdm.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureUserExistsByIdMiddleware from "../middlewares/ensureUserExistsById.middleware";
import ensureUserNotExistsMiddleware from "../middlewares/ensureUserNotExists.middlewares";

const userRoutes = Router();

userRoutes.post("", ensureUserNotExistsMiddleware, createUserController);

userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureAdmMiddleware,
  listUsersController
);
userRoutes.get(
  "/profile",
  ensureAuthMiddleware,
  ensureUserExistsByIdMiddleware,
  retrieveUserController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistsByIdMiddleware,
  checkAdmPermissionsMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistsByIdMiddleware,
  checkAdmPermissionsMiddleware,
  deleteUserController
);

export default userRoutes;
