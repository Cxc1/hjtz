<template>
  <div>
    <Header :title="$t('header.lang_list_45')" gobackShowBol="true">
    </Header>
    <div class="main">
      <div class="ifn_content_box">
        <div class="ifn_content">
          <h2>{{$t('content_text.lang_list_46')}}</h2>
          <p>{{user_info.invite_code}}</p>
          <p>{{$t('content_text.lang_list_47')}}</p>
          <p>
            <input type="text" v-model="message" readonly="readonly">
            <span
              v-clipboard:copy="message"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">{{$t('btnTxt.lang_list_48')}}</span>
          </p>
          <p>{{$t('content_text.lang_list_49')}} </p>
          <img
            :src="`${this.src_api}/users/invite_qrcode?token=${this.token}&mark=${this.mark}`">
          <p>{{$t('content_text.lang_list_50')}}</p>
          <p>{{$t('content_text.lang_list_51')}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import fun from '@/method/method'
  import {Toast} from 'mint-ui';

  export default {
    name: "InviteFriends",
    components: {
      Header
    },
    data() {
      return {
        token: '',
        mark: '',
        src_api: '',
        message: '',//链接
        user_info: '',
      }
    },
    created() {
      if (location.origin.indexOf('http://localhost:') >= 0) {
        this.src_api = '//i.hjtz.com/mobile';
        this.token = 'p6glf1v2w4my5nmr3t28krznodq1goif';
        this.mark = '7642e0098e812f79e67d161fbf0c7ae5';
      } else {
        this.src_api = '/mobile';
        this.token = fun.getCookie('token');
        this.mark = fun.getCookie('mark');
      }
      this.$post('/Users/getuserinfo').then(res => {
        this.user_info = res.result;
        this.message =location.origin + '/#/register?invite_code=' + this.user_info.invite_code
      })
    },
    methods: {
      // dowmLoadImg() {
      //   if (fun.client() == 'android') {
      //     apps.download(this.img_url);
      //   } else if (fun.client() == 'ios') {
      //     window.webkit.messageHandlers.iosAction.postMessage("download," + this.img_url);
      //   }
      // },
      onCopy() {
        Toast(this.$t('msgs.lang_list_52'));
      },
      onError() {
        Toast(this.$t('msgs.lang_list_53'));
      },
      get_img_src() {
        this.$post('/users/invite_qrcode').then(res => {
          this.img_src = res.result;
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .ifn_content_box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: url("images/bj.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;

  }

  .ifn_content {
    width: 80%;
    background: linear-gradient(0deg, rgba(204, 65, 44, .5), rgba(247, 190, 131, .5));
    box-shadow: 0px 5px 16px 0px rgba(71, 65, 65, 0.34);
    margin: 0 auto;
    border-radius: 8px;
    padding: .5rem 0;
    text-align: center;
    font-size: 1.2rem;
    h2 {
      height: 2rem;
      width: 100%;
      line-height: 2rem;
      background-size: 100% 100%;
      color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      padding: 0 1rem;
      box-sizing: border-box;
      justify-content: space-between;
      font-size: 1.3rem;
      &::before, &::after {
        content: '';
        display: block;
        height: 1px;
        width: 24%;
        background: rgba(255, 255, 255, .5);
      }
    }
    :nth-child(2) {
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      font-size: 2.5rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);

    }
    :nth-child(3) {
      width: 100%;
      line-height: 2.5rem;
      font-size: 1.2rem;
      color: rgba(238, 238, 238, 1);
    }
    :nth-child(4) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3rem;
      padding: 0 .5rem;
      box-sizing: border-box;
      input {
        height: 2rem;
        border: 1px solid #9D3019;
        box-sizing: border-box;
        color: rgba(157, 48, 25, 1);
        font-size: 1rem;
        background-color: transparent;
        text-indent: .5rem;
        width: 60%;
        border-radius: 0;
      }
      span {
        background: #9D3019;
        color: white;
        font-size: 1rem;
        height: 2rem;
        padding: 0 .5rem;
        line-height: 2rem;
        width: auto;
      }
    }
    :nth-child(5) {
      height: 3rem;
      line-height: 3rem;
      font-size: 1.4rem;
      margin-top: 0.5rem;
      color: #9C3018;
    }
    :nth-child(6) {
      height: 10rem;
      width: 10rem;
      margin: 1rem 0;

    }
    :nth-child(7), :nth-child(8) {
      /*height: 2rem;*/
      line-height: 2rem;
      color: rgba(255, 255, 255, .8);
      font-size: 1rem;
      /*overflow: hidden;*/
      /*text-overflow: ellipsis;*/
      /*white-space: nowrap;*/
    }
  }
</style>
