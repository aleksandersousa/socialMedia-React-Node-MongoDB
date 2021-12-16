import axios from 'axios';

export const loginCall = async (userCredential, authActions) => {
  authActions.loginStart();
  try {
    const res = await axios.post('auth/login', userCredential);
    authActions.loginSuccess(res.data);
  } catch (err) {
    authActions.loginFailure(err);
  }
};
