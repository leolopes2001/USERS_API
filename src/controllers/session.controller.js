import createSessionService from "../services/session/createSession.service";


const createSessionController = async (req, res) => {
  const token = await createSessionService(req.validatedBody, req.userIndex);
  return res.status(200).json(token);
};

export { createSessionController };
