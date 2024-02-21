const validateCreateCard = (inputToCheck) => {
  const errors = {};
  if (
    !inputToCheck.brand ||
    inputToCheck.brand.length < 1 ||
    inputToCheck.brand.length > 100
  ) {
    errors.brand = "Brand must be between 1 and 100 characters";
  }
  if (
    !inputToCheck.model ||
    inputToCheck.model.length < 1 ||
    inputToCheck.model.length > 100
  ) {
    errors.model = "Model must be between 1 and 100 characters";
  }
  if (
    !inputToCheck.condition ||
    inputToCheck.condition.length < 1 ||
    inputToCheck.condition.length > 100
  ) {
    errors.condition = "Condition must be between 1 and 100 characters";
  }
  if (!inputToCheck.size || isNaN(inputToCheck.size)) {
    errors.size = "Length must be a number";
  }
  if (!inputToCheck.liters || isNaN(inputToCheck.liters)) {
    errors.liters = "Length must be a number";
  }
  if (!inputToCheck.price || isNaN(inputToCheck.price)) {
    errors.price = "Price must be a number";
  }
  if (
    !inputToCheck.description ||
    inputToCheck.description.length < 1 ||
    inputToCheck.description.length > 500
  ) {
    errors.description = "Description must be between 1 and 500 characters";
  }
 const urlPattern = /^https?:\/\/.+/;
 if (
   inputToCheck.url !== undefined &&
   inputToCheck.url.trim() !== "" &&
   !urlPattern.test(inputToCheck.url)
 ) {
   errors.url = "Invalid URL";
 }

  const altPattern = /^[a-zA-Z\s,'-]{2,256}$/;
  if (inputToCheck.alt && !altPattern.test(inputToCheck.alt)) {
    errors.alt = "Invalid Alt value";
  }
  if (
    !inputToCheck.location ||
    inputToCheck.location.length < 1 ||
    inputToCheck.location.length > 500
  ) {
    errors.location = "Location must be between 1 and 500 characters";
  }
  const phonePattern = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/;
  if (!phonePattern.test(inputToCheck.phone)) {
    errors.phone = "Invalid phone number";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

export { validateCreateCard };
