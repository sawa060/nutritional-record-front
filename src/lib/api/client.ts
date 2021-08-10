import axios, {AxiosInstance} from 'axios';

import {TokenStorage} from '../token_storage';

interface Config {
  withAuthToken: boolean;
}

const defaultConfig: Config = {
  withAuthToken: true,
};

const createAxiosClient = (config?: Config): AxiosInstance => {
  const configValues: Config = config ? {...defaultConfig, ...config} : defaultConfig;

  const headers: {[key: string]: string} = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',
  };

  // TODO .envに置き換え
  const baseURL = 'http://localhost:3001/api/v1';

  const client = axios.create({
    baseURL,
    headers,
  });

  if (configValues.withAuthToken) {
    client.interceptors.request.use((requestConfig) => {
      /* eslint-disable no-underscore-dangle */
      const _accessToken = TokenStorage.getAccessToken();
      const _client = TokenStorage.getClient();
      const _uid = TokenStorage.getUid();

      /* eslint-disable no-param-reassign */
      requestConfig.headers.common['access-token'] = _accessToken;
      requestConfig.headers.common.client = _client;
      requestConfig.headers.common.uid = _uid;
      /* eslint-enable no-param-reassign */

      return requestConfig;
    });
  }

  return client;
};

// 認証あり
export const axiosClient: AxiosInstance = createAxiosClient();

// 認証なし（ログインなど）
export const axiosWithoutToken: AxiosInstance = createAxiosClient({
  withAuthToken: false,
});
