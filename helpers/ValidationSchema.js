const Joi = require("@hapi/joi");

const LoginSchema = Joi.object({
    email: Joi.string().min(6).max(255).lowercase().required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  const RegisterSchema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).lowercase().required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  const PostSchema = Joi.object({
    title: Joi.string().min(6).max(255).required(),
    description: Joi.string().min(6).max(1024).required(),
  });

  const CommentSchema = Joi.object({
    comment: Joi.string().min(6).max(1024).required(),
  });

  // validation schema for path params id
  const ParamsSchema = Joi.object({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  });

module.exports = {
    LoginSchema,
    RegisterSchema,
    PostSchema,
    CommentSchema,
    ParamsSchema,
    };
    