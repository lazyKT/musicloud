/**
 * Validation of input values for the registration page
 */

const RGX = {
  /**
   * validate email address
   * Ideal email format should be "name@domain.com"
   */
  email: /\S+@\S+\.\S+/,
  /**
   * validate username
   * Useranme should be at least 3 characters long
   * Can Contain Only A-Z, a-z, 0-9
   */
  username: /^(?=.{3,})/,
  /**
   * Password should have at least 8 characters,
   * 1 UpperCase, 1 LowerCase
   */
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/
};

/**
 * Validate Register's Input values
 */
export function validate(key, value) {
  return RGX[key].test(value);
}

/**
 * Match Password and Confirm Password
 * @param {Password} pwd1
 * @param {Confirm Password} pwd2
 */
export function checkPWDs(pwd1, pwd2) {
  return pwd1 === pwd2;
}

/**
 * List of Error/Info Messages on Registeration
 */
export const Messages = {
  email: "Invalid Email Format!",
  username: "Username must have at least three characters!",
  password:
    "Password must have at least 8 characters, should contain at least 1 UpperCase and 1 LowerCase!"
};
