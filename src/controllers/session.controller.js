import createSessionService from "../services/session/createSession.service";

const createSessionController = async (req, res) => {
  const [status, token] = await createSessionService(req.validatedBody, req.userIndex);
  return res.status(status).json(token);
};

export { createSessionController };
