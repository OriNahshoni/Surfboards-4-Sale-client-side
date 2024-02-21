const validation = (schema, userInput) => {
  const { error } = schema.validate(userInput, { abortEarly: false });
  if (!error) {
    return null;
  }
  const errors = {};
  error.details.forEach((detail) => {
    const key = detail.context.key;
    const message = detail.message;
    errors[key] = message;
  });
  return errors;
};

export default validation;
