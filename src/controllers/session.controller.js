import createSessionService from "../services/session/createSession.service";

const createSessionController = (req, res) => {
  const token = createSessionService(req.user);
  return res.status(201).json(token);
};

export { createSessionController };
