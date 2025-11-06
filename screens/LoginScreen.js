import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { login } from '../api/auth';
import AuthContent from '../components/auth/AuthContent';

function LoginScreen() {
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
