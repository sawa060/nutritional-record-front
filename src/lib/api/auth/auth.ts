import Cookies from 'js-cookie';

import {SignInData, SignUpData} from '../../../features/auth/auth_types';
import {axiosClient, axiosWithoutToken} from '../client';

/** 新規アカウント作成 */
export const signUp = (data: SignUpData) => axiosWithoutToken.post('auth', data);

/** ログイン */
export const signIn = (data: SignInData) => axiosWithoutToken.post('auth/sign_in', data);

/** ログアウト */
export const signOut = () => axiosClient.delete('auth/sign_out');

/** 認証済みユーザーの取得 */
export const getCurrentUser = () => {
  if (!Cookies.get('_access-token') || !Cookies.get('_client') || !Cookies.get('_uid')) return;

  // eslint-disable-next-line consistent-return
  return axiosClient.get('/auth/sessions');
};
