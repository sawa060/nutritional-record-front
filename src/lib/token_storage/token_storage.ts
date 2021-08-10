import Cookies from 'js-cookie';

const ACCESS_TOKEN = '_access_token';
const CLIENT = '_client';
const UID = '_uid';

export class TokenStorage {
  public static getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN);
  }

  public static setAccessToken(accessToken: string) {
    Cookies.set(ACCESS_TOKEN, accessToken);
  }

  public static getClient(): string | undefined {
    return Cookies.get(CLIENT);
  }

  public static setClient(client: string) {
    Cookies.set(CLIENT, client);
  }

  public static getUid(): string | undefined {
    return Cookies.get(UID);
  }

  public static setUid(uid: string) {
    Cookies.set(UID, uid);
  }

  public static clearAll() {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(CLIENT);
    Cookies.remove(UID);
  }
}
