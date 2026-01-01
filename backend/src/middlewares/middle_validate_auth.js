import Joi from "joi";

// Reusable Error Handler
function sendValidationErrors(res, error) {
  // get the first error message from details aarray.
  const errorMessage = error.details[0].message;

  return res.status(400).json({
    success: false,
    message: errorMessage,
  });
}

// Name validation
export const nameValidation = Joi.string().min(4).required().messages({
  "string.empty": "Enter your full name, name is required.",
  "string.min": "Your full name must be greater than 4 characters.",
  "any.required": "You have to provide your full name.",
});

// Email validation 
export const emailValidation = Joi.string()
  .pattern(/^[^\s@]+@[^\s@]+\.(com|org|net)$/)
  .required()
  .messages({
    "string.pattern.base": "Invalid email format. Only .com, .org, .net are allowed.",
    "string.empty": "Email is required.",
    "any.required": "Email can't be empty."
  });

// Password validation
const passwordValidation = Joi.string()
  .min(6)
  .max(20)
  .required()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .messages({
    "string.empty": "Password is required.",
    "string.min": "The password must be more than 6 characters.",
    "string.max": "Password should not exceed 20 characters.",
    "any.required": "Password can't be empty.",
    "string.pattern.base": "You must include at least one lowercase letter, one uppercase letter, and one number."
  });

// Signup validation
const signupValidation = Joi.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation
});

// Signin validation
const signinValidation = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

// Middleware functions
function validateSigningup(req, res, next) {
  const { error } = signupValidation.validate(req.body, { abortEarly: true });
  if (error) return sendValidationErrors(res, error);
  next();
}

function validateSigningin(req, res, next) {
  const { error } = signinValidation.validate(req.body, { abortEarly: true });
  if (error) return sendValidationErrors(res, error);
  next();
}

export { validateSigningin, validateSigningup };
