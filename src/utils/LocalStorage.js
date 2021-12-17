export default class LocalStorage {

  static put(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static putString(key, string) {
    localStorage.setItem(key, string);
  }

  static get(key) {
    let res = undefined;
    try {
      res = JSON.parse(localStorage[key]);
    } catch (err) {}
    return res;
  }

  static getString(key) {
    return localStorage[key];
  }

  static delete(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    const lang = this.getString('language');
    localStorage.clear();
    if (lang !== undefined && lang !== 'es' && lang !== '' && lang !== 'undefined') {
      this.putString('i18nextLng', lang);
      this.putString('language', lang);
    }
  }

}
