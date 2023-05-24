const Joi = require("joi");

exports.validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value.body = result.value;
    next();
  };
};

exports.schemas = {
  authSchema: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(6).max(1024).required(),
  }),
  postSchema: Joi.object().keys({
    title: Joi.string().min(1).max(255).required(),
    text: Joi.string().min(1).max(4096).required(),
  }),
  commentSchema: Joi.object().keys({
    text: Joi.string().min(1).max(4096).required(),
  }),
};