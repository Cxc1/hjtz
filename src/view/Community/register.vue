<template>
  <div class="register" id="captcha">
    <div class="reg_t">
      <div @click="changeSelectBol">
        {{seleLang}}
        <span></span>
      </div>
      <ul :class="{active:selectBol}">
        <li v-for="(item , index) in langList" @click="changeLang(item,index)" :class="{active : langIndex == index}"
            :key="item.id">{{item.name}}
        </li>
      </ul>
    </div>
    <div class="reg_content">
      <div class="reg_content_way">
        <p>
          <span :class="{active:wayBol}" @click="changeWaBol(true)">{{$t('content_text.lang_list_105')}}</span>
        </p>
        <p>
          <span :class="{active:!wayBol}" @click="changeWaBol(false)">{{$t('content_text.lang_list_106')}}</span>
        </p>
      </div>
      <div class="seleCountry" v-show="wayBol" @click="changeCountryShow">
        {{country_name}} <span></span>
      </div>
      <!--手機號碼-->
      <div class="reg_content_ipt_box">
        <span v-show="wayBol">+{{country_code}}</span>
        <input type="text" v-model="send_num" :placeholder="userPlacehoider">
        <!--<span class="r_icom">×</span>-->
      </div>
      <!--驗證碼-->
      <div class="reg_content_ipt_box">
        <input type="text" v-model="phone_code" maxlength="6" :placeholder="$t('content_text.lang_list_109')">
        <span class="r_btn" @click="captcha_popup" :class="{active:!get_code_bol}">{{get_code_text}}</span>
      </div>

      <div class="reg_content_ipt_box">
        <input type="password" v-model="pwd" maxlength="20" :placeholder="$t('content_text.lang_list_111')">
      </div>

      <div class="reg_content_ipt_box">
        <input type="password" v-model="repwd" maxlength="20" :placeholder="$t('content_text.lang_list_112')">
      </div>

      <div class="reg_content_ipt_box">
        <input type="password" v-model="pwdtrade" maxlength="6" :placeholder="$t('content_text.lang_list_113')">
      </div>

      <div class="reg_content_ipt_box">
        <input type="password" v-model="repwdtrade" maxlength="6" :placeholder="$t('content_text.lang_list_114')">
      </div>

      <div class="reg_content_ipt_box">
        <input type="text" v-model="pid" disabled="disabled"   :placeholder="$t('content_text.lang_list_115')">
      </div>
      <div class="user_text_box">
        <span class="sele_t" :class="{active:sele_tBol}" @click="changeSele_tBol">√</span>{{$t('content_text.lang_list_116')}}
        <router-link tag="span" to="/reg_ag/3?type=h5" class="user_text">{{$t('content_text.lang_list_117')}}
        </router-link>
      </div>

      <div class="reg_content_btn" @click="registered">{{$t('content_text.lang_list_118')}}</div>
    </div>
    <div class="country_box" :class="{active:countryShow}" @click.top="changeCountryShow">
      <ul>
        <li v-for="(item,index) in countryList" :key="item.id" @click="getCountryNum(item)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import fun from '@/method/method'
  import {reg_post} from '@/http/mhttp'
  import {Toast} from 'mint-ui';

  export default {
    name: "register",
    components: {},
    data() {
      return {
        //
        selectBol: false,
        sele_tBol: true,
        wayBol: true,
        userPlacehoider: this.$t('content_text.lang_list_107'),
        seleLang: '繁體中文',
        langList: [
          {name: '繁體中文', lang: 'zh-tw'},
          {name: 'English', lang: 'en-us'},
          {name: '한국어', lang: 'zh-ko'},
          {name: '日本語', lang: 'zh-ja'},
        ],
        langIndex: 0,
        countryShow: false,
        countryList: [],
        country_code: 86,
        country_name: this.$t('content_text.lang_list_124'),

        send_type: 'mobile',

        get_code_text: this.$t('content_text.lang_list_110'),
        get_code_bol: true,

        send_num: '',

        phone_code: '',

        pwd: '',

        repwd: '',

        pwdtrade: '',

        repwdtrade: '',

        val_mark: '',

        pid: this.$route.query.invite_code,

        reg_url: '/users/regformobile',

      }
    },
    created() {
      this.getCountryList();
      let lang = fun.getCookie('odrthink_language') || 'zh-tw';
      this.langList.forEach((item, index) => {
        if (item.lang === lang) {
          this.seleLang = item.name;
          this.langIndex = index;
        }
      });
    },
    methods: {
      init_ipt() {
        this.send_num = '';
        this.phone_code = '';
        this.pwd = '';
        this.repwd = '';
        this.pwdtrade = '';
        this.repwdtrade = '';
        this.val_mark = '';
      },
      changeSelectBol() {
        this.selectBol = !this.selectBol
      },
      changeSele_tBol() {
        this.sele_tBol = !this.sele_tBol
      },
      changeWaBol(bol) {
        this.init_ipt();
        this.wayBol = bol;
        this.userPlacehoider = bol ? this.$t('content_text.lang_list_107') : this.$t('content_text.lang_list_108');
        this.send_type = bol ? 'mobile' : 'email';
        this.reg_url = bol ? '/users/regformobile' : '/users/emailAddReg';
      },
      changeLang(item, index) {
        this.langIndex = index;
        this.seleLang = item.name;
        this.changeSelectBol();
        document.cookie = 'odrthink_language=' + item.lang;
        location.reload()
      },
      changeCountryShow() {
        this.countryShow = !this.countryShow;
      },
      getCountryList() {
        reg_post('/users/countrylist').then(res => {
          if (res.code == 10000) {
            this.countryList = res.result
          }
        })
      },
      getCountryNum(item) {
        this.country_code = item.countrycode;
        this.country_name = item.name;
      },
      get_code(data) {
        this.$loading.open();
        let from_data = {
          send_num: this.send_num,
          send_type: this.send_type,
          validate: data.validate,
          country_code: this.country_code
        };
        reg_post('/users/sendInfo', from_data).then(res => {
          this.captchaIns.refresh();
          if (res.code == 10000) {
            Toast(res.message);
            this.val_mark = res.result.val_mark;
            let time = 60;
            this.get_code_bol = false;
            let inT_id = setInterval(() => {
              if (time < 1) {
                this.get_code_bol = true;
                this.get_code_text = this.$t('content_text.lang_list_110');
                clearInterval(inT_id)
              } else {
                time--;
                this.get_code_text = time + ' s '
              }
            }, 1000);
          }
          this.$loading.close();
        })
      },


      captcha_popup() {
        if (this.send_num != '') {
          if (this.get_code_bol) {
            this.captchaIns.popUp();
          }
        } else {
          Toast(this.userPlacehoider);
        }
      },
      registered() {
        let reg_data;
        if (this.wayBol) {
          reg_data = {
            phone: this.send_num,
            phone_code: this.phone_code,
            pwd: this.pwd,
            repwd: this.repwd,
            pwdtrade: this.pwdtrade,
            repwdtrade: this.repwdtrade,
            val_mark: this.val_mark,
            country_code: this.country_code,
            pid: this.pid
          }
        } else {
          reg_data = {
            email: this.send_num,
            email_code: this.phone_code,
            pwd: this.pwd,
            repwd: this.repwd,
            pwdtrade: this.pwdtrade,
            repwdtrade: this.repwdtrade,
            val_mark: this.val_mark,
            pid: this.pid
          }
        }
        if (this.sele_tBol) {
          if (this.send_num != '' &&
            this.phone_code != '' &&
            this.pwd != '' &&
            this.repwd != '' &&
            this.pwdtrade != '' &&
            this.repwdtrade != '') {
            reg_post(this.reg_url, reg_data).then(res => {
              if (res.code == 10000) {
                Toast(res.message);
                let out_id = setTimeout(() => {
                  clearTimeout(out_id);
                  location.href = 'http://d.igc.one/hj';
                }, 1000);
              }
            });
          } else {
            if (this.send_num == '') {
              Toast(this.$t('content_text.lang_list_119'))
            } else if (this.phone_code == '') {
              Toast(this.$t('content_text.lang_list_109'))
            } else if (this.pwd == '') {
              Toast(this.$t('content_text.lang_list_120'))
            } else if (this.repwd == '') {
              Toast(this.$t('content_text.lang_list_121'))
            } else if (this.pwdtrade == '') {
              Toast(this.$t('content_text.lang_list_122'))
            } else if (this.repwdtrade == '') {
              Toast(this.$t('content_text.lang_list_123'))
            }
          }
        }
      }
    },
    mounted() {
      //调易盾滑块验证
      let self = this;
      initNECaptcha(
        {
          captchaId: "b0487c82b2de43558aac9d29bfbda686",
          element: "#captcha",
          mode: "popup",
          width: 240,
          onVerify(err, data) {
            if (!err) {
              self.captchaIns.refresh();
              self.get_code(data)
            }
          }
        },
        instance => {
          // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
          self.captchaIns = instance;
        })
    },
  }
</script>

<style lang="less" scoped>
  @import url("../../styles/base.less");

  .register {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
    padding: 0 2rem;
    background: #F4F4F4;
    color: #666;
    font-size: 1.2rem;
    /*卻換語言*/
    > .reg_t {

      height: 3rem;
      color: #6189C5;
      font-size: 1.2rem;
      float: right;
      line-height: 3rem;

      > div {
        padding: 0 .5rem;
        display: flex;
        align-items: center;
        > span {
          margin-top: .3rem;
          display: inline-block;
          height: 1.2rem;
          width: 1.2rem;
          background: url("images/reg_dowm.png") no-repeat center;
        }
      }
      > ul {
        text-align: center;
        transition: height .2s, transform .2s;
        height: 0;
        transform: scale(0);
        color: #666;
        margin-top: .5rem;
        position: absolute;
        z-index: 9;
        &.active {
          transform: scale(1);
        }
        > li {
          padding: 0 1rem;
          background: #f5f5f5;
          border: 1px solid #ccc;
          height: 3rem;
          line-height: 3rem;
          border-bottom: none;
          &:nth-last-child(1) {
            border-bottom: 1px solid #ccc;
          }
          &.active {
            color: #6189C5;
          }
        }
      }
    }
    /*註冊*/
    > .reg_content {
      margin-top: 4rem;
      /*註冊方式*/
      > .reg_content_way {
        height: 3rem;
        display: flex;
        text-align: center;
        line-height: 3rem;
        font-size: 1.3rem;
        > p {
          flex: 1;
          height: 3rem;
          > span {
            display: inline-block;
            height: 2.8rem;
            padding: 0 1rem;
            &.active {
              color: #6189C5;
              border-bottom: .2rem solid #6189C5;
            }
          }
        }
      }
      /*國家*/
      .seleCountry {
        width: 30%;
        height: 2rem;
        font-size: 1.2rem;
        line-height: 2rem;
        > span {
          display: inline-block;
          height: 1.2rem;
          width: 1.2rem;
          background: url("images/reg_dowm.png") no-repeat center;
        }
      }

      .reg_content_ipt_box, .user_text_box {
        margin-top: 1rem;
        height: 3rem;
        border-bottom: 1px solid #ccc;
        line-height: 3rem;
        display: flex;
        align-items: center;
        position: relative;
        > span {
          padding: 0 .5rem;
          &.r_icom {
            height: 1.5rem;
            width: 1.5rem;
            line-height: 1.5rem;
            font-size: 1.5rem;
            text-align: center;
            padding: 0;
            display: inline-block;
            background: #F7A003;
            border-radius: 50%;
            color: #fff;
            position: absolute;
            right: 0;
          }
          &.r_btn {
            height: 2rem;
            line-height: 2rem;
            background: #F7A003;
            color: #fff;
            position: absolute;
            right: 0;
            &.active {
              background: #cccccc;
            }
          }
          &.sele_t {
            height: 1.2rem;
            width: 1.2rem;
            line-height: 1.2rem;
            border-radius: .2rem;
            border: 1px solid #ccc;
            color: #ccc;
            padding: 0;
            text-align: center;
            margin-right: .2rem;
            &.active {
              border-color: #6189C5;
              color: #6189C5;
            }
          }
          &.user_text {
            color: #6189C5;
          }
        }
        > input {
          height: 3rem;
          border: none;
          background: none;
          text-align: left;
          color: #999999;
          width: 100%;
        }
      }

      .user_text_box {
        border-bottom: none;
      }

      .reg_content_btn {
        height: 4rem;
        background: #F7A003;
        box-shadow: 0px 3px 8px 0px rgba(21, 22, 25, 0.36);
        border-radius: .6rem;
        line-height: 4rem;
        color: rgba(255, 255, 255, 1);
        font-size: 1.3rem;
        text-align: center;
      }
    }

    .country_box {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      align-items: center;
      justify-content: center;
      display: none;
      &.active {
        display: flex;
      }
      > ul {
        width: 80%;
        height: 60%;
        background-color: #fff;
        border-radius: .6rem;
        overflow: scroll;
        > li {
          height: 3rem;
          line-height: 3rem;
          text-indent: 1rem;
          border-bottom: 1px solid #ccc;

        }
      }
    }
  }
</style>
