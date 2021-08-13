// Following eslint-disable-next-line is for an issue with TS & ESLint
// eslint-disable-next-line no-shadow
enum CookieListenerCallbackTypes {
  SET = "set",
  DELETE = "delete",
}

type CookieListenerCallback = (type: CookieListenerCallbackTypes) => void;

type CookieListeners = {
  [name: string]: CookieListenerCallback[];
};

class Cks {
  private static Instance: Cks;

  private static listeners: CookieListeners = {};

  public static init(): void {
    if (!Cks.Instance) {
      Cks.Instance = new Cks();
    }
  }

  /**
   * Set a cookie
   * @param {string} name - Name of the cookie
   * @param {*} value - Value of the cookie
   * @param {number} [expires=30] - Number of days cookie is valid
   * @returns {boolean} Cookie has been set succesfully
   */
  public static set(name: string, value: any, expires: number = 30): boolean {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    const cexpire = date.toUTCString();
    const cvalue = JSON.stringify({ value });
    document.cookie = `${name}=${cvalue};expires=${cexpire}`;
    const isSuccess = Cks.get(name) !== null;
    if (isSuccess && this.listeners[name]) {
      this.listeners[name].forEach((cb) => {
        cb(CookieListenerCallbackTypes.SET);
      });
    }
    return isSuccess;
  }

  /**
   * Getting a cookie
   * @param {string} name - The name of the desired cookie
   * @returns {*} Whatever the value of the cookie is or an empty string
   */
  public static get(name: string): any {
    const decodedCookies = decodeURIComponent(document.cookie).split(";");
    let currentIndex = 0;
    let cookieVal = null;
    while (cookieVal === null && currentIndex < decodedCookies.length) {
      if (decodedCookies[currentIndex].trim().indexOf(name) === 0) {
        cookieVal = JSON.parse(
          decodedCookies[currentIndex].trim().substring(`${name}=`.length),
        ).value;
      }
      currentIndex += 1;
    }
    return cookieVal;
  }

  /**
   * Delete a cookie
   * @param {string} name - Name of the cookie to delete
   * @returns {boolean} Cookie has been delete succesfully
   */
  public static delete(name: string): boolean {
    const isDeleted = !Cks.set(name, "", -1);
    this.triggerListener(name, CookieListenerCallbackTypes.DELETE);
    return isDeleted;
  }

  /**
   * Subscribe to events on cookie
   * @callback changeCallback
   * @param {string} name - Name of the cookie
   * @param {changeCallback} cb - Function to call when any activity on the cookie happens
   */
  public static subscribe(name: string, cb: CookieListenerCallback): void {
    // Check if we already have listeners for this cookie
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    // Check if the function isn't already in the array of listeners to prevent double calls
    if (this.listeners[name].findIndex((listener) => listener === cb) < 0) {
      this.listeners[name].push(cb);
    }
  }

  /**
   * Unsubscribe from events on cookie
   * @callback changeCallback
   * @param {string} name - Name of the cookie
   * @param {changeCallback} cb Function to be removed from listeners for the cookie
   */
  public static unsubscribe(name: string, cb: CookieListenerCallback): void {
    if (this.listeners[name]) {
      const index = this.listeners[name].findIndex((lstnr) => lstnr === cb);
      if (index > -1) {
        this.listeners[name].splice(index, 1);
      }
    }
  }

  private static triggerListener(name: string, type: CookieListenerCallbackTypes): void {
    if (this.listeners[name]) {
      this.listeners[name].forEach((cb) => {
        cb(type);
      });
    }
  }
}

Cks.init();

export default Cks;
