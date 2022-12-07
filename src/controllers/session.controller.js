import createSessionService from "../services/session/createSession.service";

const createSessionController = (req, res) => {
  const [status, token] = createSessionService(req.user);
  return res.status(status).json(token);
};

export { createSessionController };
