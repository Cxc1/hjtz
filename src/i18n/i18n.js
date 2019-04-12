import Vue from 'vue'
import VueI18n from 'vue-i18n'
import fun from '@/method/method'

Vue.use(VueI18n);

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  'zh-tw': require('../assets/lang/zh'),   // 中文语言包
  'en-us': require('../assets/lang/en'),   // 英文语言包
  'zh-ja': require('../assets/lang/ja'),   // 日文语言包
  'zh-ko': require('../assets/lang/ko'),   // 韩文语言包
};

// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale: fun.getCookie('odrthink_language') || 'zh-tw', // set locale 默认显示中文
  messages: messages // set locale messages
})
