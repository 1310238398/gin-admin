const accessTokenKey = 'access_token';
const defaultParkKey = 'default_park';

export default class store {
  // 设定访问令牌
  static setAccessToken(token) {
    sessionStorage.setItem(accessTokenKey, JSON.stringify(token));
  }

  // 获取访问令牌
  static getAccessToken() {
    const token = sessionStorage.getItem(accessTokenKey);
    if (!token || token === '') {
      return null;
    }
    return JSON.parse(token);
  }

  // 清空访问令牌
  static clearAccessToken() {
    sessionStorage.removeItem(accessTokenKey);
  }

  // 获取默认园区
  static getDefaultPark() {
    const v = sessionStorage.getItem(defaultParkKey);
    if (!v || v === '') {
      return {
        id: 'e5c85e03-22f8-4135-9992-89f8fa44bc2b',
        name: '汉峪金谷',
        logo: '',
      };
    }
    const item = JSON.parse(v);
    return item;
  }

  // 设置默认园区
  static setDefaultPark(item) {
    sessionStorage.setItem(defaultParkKey, JSON.stringify(item));
  }

  // 清空默认园区
  static clearDefaultPark() {
    sessionStorage.removeItem(defaultParkKey);
  }
}
