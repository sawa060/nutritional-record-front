import {TokenStorage} from '../../../lib/token_storage';

export const useLogin = () => {
  const accessToken = TokenStorage.getAccessToken();
  const client = TokenStorage.getClient();
  const uid = TokenStorage.getUid();

  const isLogin = !!accessToken && !!client && !!uid;

  return isLogin;
};
