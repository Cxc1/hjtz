<template>
  <div>
    <Header :title="$t('header.lang_list_37')" gobackShowBol="true">

    </Header>
    <div class="main" id="captcha">
      <!--公告-->
      <div class="notice" v-if="false">
        <div class="notice_icon">
          <span></span>
        </div>
        <div class="notice_txt">你的收付款額度超過限額(1萬/筆，5萬/月)，目前已經...</div>
        <div class="notice_next">
          <span></span>
        </div>
      </div>
      <!--锁仓  社区等级-->
      <div class="lock_grade">
        <!--锁仓-->
        <div class="lock_grade_lg">
          <div class="lock_grade_lg_icon">
            <span class="lock_grade_lg_icon_one"></span>
          </div>
          <div class="lock_grade_lg_content">{{$t('content_text.lang_list_38')}}： {{init_data.igk_lock_money}} IGK</div>
          <!--<div class="lock_grade_lg_r">增投</div>-->
        </div>
        <!--社区等级-->
        <div class="lock_grade_lg">
          <div class="lock_grade_lg_icon">
            <span class="lock_grade_lg_icon_two"></span>
          </div>
          <div class="lock_grade_lg_content">{{$t('content_text.lang_list_24')}}： LV {{init_data.zhitui_level}}</div>
          <router-link tag="div" to="/comLevel" class="lock_grade_lg_r" >
            {{$t('content_text.lang_list_39')}}
          </router-link>
        </div>

      </div>
      <!--奖励-->
      <div class="reward">
        <router-link tag="div" to="/receiveAwards?type=1" class="reward_item">
          <div class="reward_item_icon">
            <span class="reward_item_icon_one"></span>
          </div>
          <div class="reward_item_content">
            <p>{{$t('content_text.lang_list_70')}}： +{{init_data.base_income}}</p>
            <span></span>
          </div>
          <div class="reward_item_r">
            <span></span>
          </div>
        </router-link>
        <router-link tag="div" to="/receiveAwards?type=2" class="reward_item">
          <div class="reward_item_icon">
            <span class="reward_item_icon_two"></span>
          </div>
          <div class="reward_item_content">
            <p>{{$t('content_text.lang_list_71')}}： +{{init_data.share_income}}</p>
            <span></span>
          </div>
          <div class="reward_item_r">
            <span></span>
          </div>
        </router-link>
        <router-link tag="div" to="/receiveAwards?type=3" class="reward_item">
          <div class="reward_item_icon">
            <span class="reward_item_icon_st"></span>
          </div>
          <div class="reward_item_content">
            <p>{{$t('content_text.lang_list_72')}}： +{{init_data.zhitui_income}}</p>
            <span></span>
          </div>
          <div class="reward_item_r">
            <span></span>
          </div>
        </router-link>
      </div>
      <!--我的社员-->
      <router-link tag="div" :to="'myMember?member_num='+init_data.member_num" class="member_item">
        <div class="member_item_icon">
          <span class="member_item_icon_one"></span>
        </div>
        <div class="member_item_content">
          <p>{{$t('content_text.lang_list_40')}}： +{{init_data.member_num}}</p>
        </div>
        <div class="member_item_r">
          <span></span>
        </div>
      </router-link>

      <!--一键领取奖励-->
       <div class="get_btn " :class="{active:init_data.income_status != 1}" @click="showCaptcha">{{get_btn_txt}}</div>
      <!--激活会员-->
      <router-link tag="div" to="/actMembers" class="get_btn">{{$t('content_text.lang_list_3')}}</router-link>
    </div>

  </div>

</template>

<script>
  import Header from '@/components/Header.vue'
  import {MessageBox, Toast} from 'mint-ui';

  export default {
    name: "community",
    components: {
      Header
    },
    data() {
      return {
        //初始数据
        init_data: '',

        // 一件领取按钮文字说明
        get_btn_txt: '',

        //易盾
        captchaIns: '',
      }
    },
    created() {
      //获取初始数据
      this.getCommunityInit();
    },

    methods: {
      getCommunityInit() {
        this.$loading.open();
        this.$post('/Money/IGKCommunityInit').then(res => {
          if (res.code == 10000) {
            this.init_data = res.result;
            this.get_btn_txt = this.init_data.income_status == 1 ? this.$t('btnTxt.lang_list_41') : this.init_data.income_status == 2 ? this.$t('btnTxt.lang_list_125') : this.$t('btnTxt.lang_list_126');
            this.$loading.close();
          }

        })
      },
      //暂未开放
      goToReceiveAwards() {
        MessageBox({
          title: this.$t('msgs.lang_list_43'),
          message: this.$t('msgs.lang_list_97'),
          confirmButtonText: this.$t('msgs.confirm'),
        })
      },
      showCaptcha() {
        if (this.init_data.income_status == 1) {
        this.captchaIns.popUp();
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
              self.$post('/Money/IGKIncomeOneKey', {validate: data.validate}).then(res => {
                if (res.code == 10000) {
                  Toast(res.message);
                  self.getCommunityInit();
                }
              })
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

  /*公告*/
  .notice {
    width: 100%;
    height: 3.33rem;
    position: relative;
    line-height: 3.33rem;
    background-color: #fff;
    margin-bottom: .3rem;
    /*公告喇叭,下一步公共样式 */
    > .notice_icon, > .notice_next {
      width: 3.33rem;
      height: 100%;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      > span {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    /*公告喇叭*/
    > .notice_icon {

      left: 0;
      > span {
        background: url("images/laba2_icon.png") no-repeat center;
        background-size: 100%;
      }
    }

    /*公告右侧*/
    .notice_next {
      right: 0;
      > span {
        width: .8rem;
        background: url("images/gd1_icon.png") no-repeat center;
        background-size: 100%;
      }
    }

    /*广告内容*/
    .notice_txt {
      width: calc(100% - 6.66rem);
      margin: auto;
      font-size: 1rem;
      font-family: HiraginoSansGB-W3;
      color: rgba(102, 102, 102, 1);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

  }

  /*锁仓  社区等级*/
  .lock_grade {
    width: 100%;
    height: 9.6rem;
    padding: 1rem;
    box-sizing: border-box;
    margin-bottom: .3rem;
    background: rgba(255, 255, 255, 1);

    > .lock_grade_lg {
      height: 3.8rem;
      line-height: 3.8rem;
      font-size: 1.3rem;
      width: 100%;
      display: flex;
      /*左侧图标*/
      > .lock_grade_lg_icon {
        width: 2.8rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .3rem;
        > span {
          width: 2rem;
          height: 1.3rem;
          &.lock_grade_lg_icon_one {
            background: url("images/scang_icon.png") no-repeat center;
            background-size: 100%;
          }
          &.lock_grade_lg_icon_two {
            height: 2rem;
            background: url("images/sqgl_icon_2.png") no-repeat center;
            background-size: 100%;
          }
        }
      }

      /*中间*/
      > .lock_grade_lg_content {
        min-width: 65%;
        max-width: 75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 1rem;
        color: rgba(34, 34, 34, 1);
      }

      /*右侧*/
      > .lock_grade_lg_r {
        color: #6189C5;
      }
    }
  }

  /*奖励*/
  .reward {
    width: 100%;
    height: 12rem;
    margin-bottom: .3rem;
    padding: 0 1rem;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    > .reward_item {
      height: 4rem;
      line-height: 4rem;
      box-sizing: border-box;
      border-bottom: 1px solid #EEEEEE;
      font-size: 1.3rem;
      display: flex;
      &:nth-last-child(1) {
        border: none;
      }
      > .reward_item_icon {
        width: 2.8rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .3rem;
        > span {
          width: 2rem;
          height: 1.3rem;
          &.reward_item_icon_one {
            background: url("images/scang_icon.png") no-repeat center;
            background-size: 100%;
          }
          &.reward_item_icon_two {
            height: 2rem;
            background: url("images/sqgl_icon_4.png") no-repeat center;
            background-size: 100%;
          }
          &.reward_item_icon_st {
            height: 2rem;
            background: url("images/sqgl_icon_5.png") no-repeat center;
            background-size: 100%;
          }
        }
      }

      /*中间*/
      > .reward_item_content {
        width: calc(100% - 4.8rem);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 1rem;
        display: flex;
        align-items: center;
        color: rgba(34, 34, 34, 1);
        > span {
          display: inline-block;
          margin-left: .5rem;
          width: 2rem;
          height: 2rem;
          background: url("images/IGK.png") no-repeat center;
          background-size: 100%;
        }
      }

      /*右侧*/
      > .reward_item_r {
        width: 2rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          width: .8rem;
          height: 1.3rem;
          background: url("images/gd1_icon.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
  }

  /*我的社员*/
  .member_item {
    height: 4rem;
    line-height: 4rem;
    padding: 0 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid #EEEEEE;
    font-size: 1.3rem;
    display: flex;
    background: #fff;
    margin-bottom: 10rem;
    > .member_item_icon {
      width: 2.8rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: .3rem;
      > span {
        width: 2rem;
        height: 2rem;
        &.member_item_icon_one {
          background: url("images/sqgl_icon_6.png") no-repeat center;
          background-size: 100%;
        }
      }
    }

    /*中间*/
    > .member_item_content {
      width: calc(100% - 4.8rem);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 1rem;
      display: flex;
      align-items: center;
      color: rgba(34, 34, 34, 1);
    }

    /*右侧*/
    > .member_item_r {
      width: 2rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        width: .8rem;
        height: 1.3rem;
        background: url("images/gd1_icon.png") no-repeat center;
        background-size: 100%;
      }
    }
  }

  /*底部按钮*/
  .get_btn {
    width: 80%;
    height: 4rem;
    line-height: 4rem;
    margin: 0 auto 1rem;
    background: rgba(247, 160, 3, 1);
    border-radius: .8rem;
    font-size: 1.3rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    &.active {
      background: #ccc;
    }
  }

</style>
