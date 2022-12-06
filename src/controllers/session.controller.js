import createSessionService from "../services/session/createSession.service";

const createSessionController = (req, res) => {
  const [status, token] = createSessionService(req.body.email, req.userIndex);
  return res.status(status).json(token);
};

export { createSessionController };
