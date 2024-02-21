const registerValidation = (inputToCheck) => {
  const errors = {};

  const firstPattern = /^[a-zA-Z\s,'-]{1,50}$/;
  if (!firstPattern.test(inputToCheck.first)) {
    errors.first = "Invalid first name";
  }

  const middlePattern = /^[a-zA-Z\s,'-]{0,100}$/;
  if (inputToCheck.middle && !middlePattern.test(inputToCheck.middle)) {
    errors.middle = "Invalid middle name";
  }

  const lastPattern = /^[a-zA-Z\s,'-]{1,100}$/;
  if (!lastPattern.test(inputToCheck.last)) {
    errors.last = "Invalid last name";
  }

  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailPattern.test(inputToCheck.email)) {
    errors.email = "Invalid email address";
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/;
  if (!passwordPattern.test(inputToCheck.password)) {
    errors.password = "Invalid password";
  }

  const phonePattern = /^((\+972|0)([23489]|5[02468]|77)-?[1-9]\d{6})$/;
  if (!phonePattern.test(inputToCheck.phone)) {
    errors.phone = "Invalid phone number";
  }

  const statePattern = /^[a-zA-Z\s,'-]{,50}$/;
  if (inputToCheck.state && !statePattern.test(inputToCheck.state)) {
    errors.state = "Invalid State value";
  }

  const countryPattern = /^[a-zA-Z\s,'-]{1,50}$/;
  if (!countryPattern.test(inputToCheck.country)) {
    errors.country = "Invalid Country value";
  }

  const cityPattern = /^[a-zA-Z\s,'-]{2,50}$/;
  if (!cityPattern.test(inputToCheck.city)) {
    errors.city = "Invalid City value";
  }

  const streetPattern = /^[a-zA-Z\s,'-]{1,50}$/;
  if (!streetPattern.test(inputToCheck.street)) {
    errors.street = "Invalid Street value";
  }

  const houseNumberPattern = /^[1-9]\d*$/;
  if (!houseNumberPattern.test(inputToCheck.houseNumber)) {
    errors.houseNumber = "Invalid House Number value";
  }

  const zipPattern = /^[1-9]\d*$/;
  if (inputToCheck.zip && !zipPattern.test(inputToCheck.zip)) {
    errors.zip = "Invalid Zip value";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export { registerValidation };
