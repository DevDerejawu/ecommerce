import Joi from "joi";

const billingSchema = Joi.object({
  name: Joi.string()
    .pattern(/^(?=.{5,})([A-Z][a-z]+) ([A-Z][a-z]+)$/)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.pattern.base":
        "Enter full name with 2 words, starting with capital letters, at least 5 characters",
    }),

  email: Joi.string()
    .email()
    .pattern(/^[^\s@]+@[^\s@]+\.(com|org|net)$/)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Invalid email format",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone must be 10-15 digits",
    }),

  country: Joi.string()
    .min(3)
    .max(60)
    .required()
    .messages({
      "string.empty": "Country is required",
      "string.min": "At least 3 characters",
      "string.max": "Max 60 characters",
    }),

  address: Joi.string()
    .min(3)
    .max(60)
    .required()
    .messages({
      "string.empty": "Address is required",
      "string.min": "At least 3 characters",
      "string.max": "Max 60 characters",
    }),

  city: Joi.string()
    .min(3)
    .max(60)
    .required()
    .messages({
      "string.empty": "City is required",
      "string.min": "At least 3 characters",
      "string.max": "Max 60 characters",
    }),

  zip: Joi.string()
    .pattern(/^[0-9]{4,10}$/)
    .required()
    .messages({
      "string.empty": "ZIP Code is required",
      "string.pattern.base": "Invalid ZIP code",
    }),
});

 const validateBilling = (req, res, next) => {
  let body;
   if(req.body.orderBillingInfo){
      body = req.body.orderBillingInfo;
   }else{
    body = req.body;
   };
  const { error } = billingSchema.validate(body, {
    abortEarly: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      status: 400,
      data: null
    });
  }
  next();
};

export {validateBilling};