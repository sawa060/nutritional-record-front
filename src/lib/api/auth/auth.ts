import Cookies from 'js-cookie';
import {TokenStorage} from 'src/lib/token_storage';

import {SignInData, SignUpData} from '../../../features/auth/auth_types';
import {client} from '../client';

/** 新規アカウント作成 */
export const signUp = (data: SignUpData) => client.post('auth', data);

/** ログイン */
export const signIn = (data: SignInData) => client.post('auth/sign_in', data);

/** ログアウト */
export const signOut = () =>
  client.delete('auth/sign_out', {
    headers: {
      'access-token': TokenStorage.getAccessToken(),
      client: TokenStorage.getClient(),
      uid: TokenStorage.getUid(),
    },
  });

/** 認証済みユーザーの取得 */
export const getCurrentUser = () => {
  if (!Cookies.get('_access-token') || !Cookies.get('_client') || !Cookies.get('_uid')) return;

  // eslint-disable-next-line consistent-return
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access-token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};
