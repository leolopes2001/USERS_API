import createSessionService from "../services/session/createSession.service";

const createSessionController = (req, res) => {
  const token = createSessionService(req.body.email, req.userIndex);
  return res.status(200).json(token);
};

export { createSessionController };
