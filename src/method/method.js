export default {

  //獲取cookies值

  getCookie(name) {
    let strcookie = document.cookie;
    let arrcookie = strcookie.split("; ");
    for (let i = 0; i < arrcookie.length; i++) {
      let arr = arrcookie[i].split("=");
      if (arr[0] == name) return unescape(arr[1]);
    }
    return null;
  },
  //獲取客戶端
  client() {
    return this.getCookie('odrplatform') || '';
  },
  //退出h5頁面
  exit() {
    // let client = this.getCookie('odrplatform');//客户端
    if (this.client() == 'android') {
      apps.finish();
    } else if (this.client() == 'ios') {
      window.webkit.messageHandlers.iosAction.postMessage("exit");
    }
  },
  //去登錄
  toLogin() {
    // let client = this.getCookie('odrplatform');//客户端
    if (this.client() == 'android') {
      apps.gotologin();
    } else if (this.client() == 'ios') {
      window.webkit.messageHandlers.iosAction.postMessage("login");
    }
  }
}
