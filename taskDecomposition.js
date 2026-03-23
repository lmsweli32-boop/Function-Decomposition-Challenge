Refactored structure

function validateUserData(userData, options = {}) {
  const errors = [];
  const isRegistration = options.isRegistration || false;

  if (isRegistration) {
    validateRequiredFields(userData, errors, 'registration');
    validateUsername(userData, options, errors);
    validatePassword(userData, errors);
  } else {
    validateRequiredFields(userData, errors, 'profile');
  }

  validateEmail(userData, options, isRegistration, errors);
  validateDateOfBirth(userData, errors);
  validateAddress(userData, errors);
  validatePhone(userData, errors);
  applyCustomValidations(userData, options, errors);

  return errors;
} 
Every helper function deals with one problem, for example

function validatePassword(userData, errors) {
  const password = userData.password;
  if (!password) return;

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  }

  if (userData.confirmPassword !== password) {
    errors.push('Passwords do not match');
  }
}
