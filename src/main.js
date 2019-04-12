// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'


// 引入更新rem的js
import '@/styles/reset.js'

//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import {InfiniteScroll, Indicator} from 'mint-ui';

// 引入通用css
import '@/styles/index.less'

Vue.prototype.$loading = Indicator;

router.goBack = function () {
  this.isBack = true;
  window.history.go(-1)
};

import {post} from '@/http/mhttp'


Vue.prototype.$post = post;

//引用复制粘贴插件
import VueClipboard from 'vue-clipboard2';

import i18n from '@/i18n/i18n'

Vue.use(VueClipboard);

Vue.use(InfiniteScroll);

Vue.config.productionTip = false;
import App from './App'
new Vue({
  el: '#app',
  i18n,
  router,
  components: {App},
  template: '<App/>'
});
