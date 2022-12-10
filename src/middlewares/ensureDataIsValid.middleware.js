const ensureDataIsValidMiddleware = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });

    req.validatedBody = validated;

    return next();
  } catch ({ errors }) {
    return res.status(400).json({ message: errors });
  }
};

export default ensureDataIsValidMiddleware;
