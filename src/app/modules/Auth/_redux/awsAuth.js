import { Auth } from "aws-amplify";

export async function login(email, password) {
  return await Auth.signIn(email, password);
}

export async function register(email, firstName, lastName, password) {
  const { user } = await Auth.signUp({
    username: email,
    password,
    attributes: {
      email,
      given_name: firstName,
      family_name: lastName,
      //   name: fullname,
    },
  });
  return user;
}

export async function confirmSignUp(email, code) {
  return await Auth.confirmSignUp(email, code);
}

export async function resendConfirmSignUp(email) {
  return await Auth.resendSignUp(email);
}

export async function requestPassword(email) {
  return await Auth.forgotPassword(email);
}

export async function requestPasswordSubmit(email, code, newPassword) {
  return await Auth.forgotPasswordSubmit(email, code, newPassword);
}

export async function changePassword(user, currentPassword, newPassword) {
  return Auth.changePassword(user, currentPassword, newPassword);
}

export async function completeNewPassword(user, newPassword) {
  return Auth.completeNewPassword(user, newPassword);
}

export async function currentAuthenticatedUser() {
  return await Auth.currentAuthenticatedUser();
}

export async function logout() {
  return await Auth.signOut();
}
