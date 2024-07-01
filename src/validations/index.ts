import Joi from 'joi';

export const createValidation = (schema: any) => Joi.object(schema);

export const stringRequired = Joi.string().trim().min(1).required();

export const emailRequired = Joi.string().email().lowercase().trim().required();

export const phoneNumberRequired = Joi.string()
  .pattern(/^\d{10}$/)
  .required()
  .messages({
    'string.pattern.base': 'Phone number must be exactly 10 digits',
    'any.required': 'Phone number is required',
  });

export const countryCodeRequired = Joi.string()
  .pattern(/^\+\d{1,3}$/)
  .required()
  .messages({
    'string.pattern.base':
      'Country code must start with a "+" followed by 1 to 3 digits',
    'any.required': 'Country code is required',
  });

export function enumValidationRequired(enumValidation: string[] | number[]) {
  return Joi.string()
    .valid(...enumValidation)
    .required();
}
