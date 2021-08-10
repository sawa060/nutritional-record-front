export class LocalStorageAdapter {
  public static get<DataType extends unknown>(key: string): DataType | undefined {
    const data = window.localStorage.getItem(key);
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  }

  public static set(key: string, value: unknown): boolean {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  public static remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
