<template>
  <div>
    <Header :title="$t('header.lang_list_73')" gobackShowBol="true">
    </Header>
    <div class="main">
      <div class="ipt_box">
        <p>{{$t('content_text.lang_list_74')}}</p>
        <div class="ipt_box_item">
          <input type="text" @blur="mblur" maxlength="30" v-model="userName"
                 :placeholder="$t('content_text.lang_list_81')">
        </div>
        <p>{{$t('content_text.lang_list_75')}}</p>
        <div class="ipt_box_item">
          <input type="text" @blur="mblur" maxlength="11" v-model="userId"
                 :placeholder="$t('content_text.lang_list_82')">
        </div>
        <div class="ipt_box_btn" @click="getUserInfo">{{$t('btnTxt.lang_list_79')}}</div>
      </div>
      <h2 class="result">
        <span>{{$t('content_text.lang_list_9')}}</span>
      </h2>
      <div class="no_result" v-if="resultBol">
        {{resultTxt}}
      </div>
      <div class="menber_box_log" v-else>
        <div class="menber_box_log_top">
          <!--左侧头像-->
          <div class="menber_box_log_top_l">
            <span></span>
          </div>
          <!--右侧详细信息-->
          <div class="menber_box_log_top_r">
            <div class="menber_box_log_top_r_t">
              <p>{{userData.user_nickname}}</p>
            </div>
            <div class="menber_box_log_top_r_b">
              <div class="menber_box_log_top_r_b_l">
                <p>{{$t('content_text.lang_list_10')}}：{{userData.user_mobile}}</p>
                <p>ID：{{userData.user_id}} <span></span></p>
              </div>
              <div class="menber_box_log_top_r_b_r">
                <p @click="activationUser">{{$t('btnTxt.lang_list_80')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import Header from '@/components/Header.vue'
  import {Toast} from 'mint-ui';

  export default {
    name: "applications",
    components: {
      Header
    },
    data() {
      return {
        //搜索结果显示隐藏
        resultBol: true,
        //按钮文字
        resultTxt: this.$t('msgs.lang_list_14'),
        //用户名
        userName: '',
        //用户id
        userId: '',
        //
        userData: [],
      }
    },
    created() {

    },
    methods: {

      mblur() {
        window.scroll(0, 0);
      },
      //搜索要绑定的社员
      getUserInfo() {
        if (this.userName !== '' && this.userId !== '') {
          this.$loading.open();
          let data = {
            user_mobile: this.userName,
            user_id: this.userId
          };
          this.$post('/Money/getInviteUserInfo', data).then(res => {
            if (res.code == 10000) {
              this.userData = res.result;
              this.resultBol = false;
            } else {
              this.resultTxt = res.message;
              this.resultBol = true;
            }
            this.$loading.close();
          })
        }
      },

      //申请加入社区
      activationUser() {
        this.$loading.open();
        this.$post('/Money/bindInviteUser', {user_id: this.userData.user_id}).then(res => {
          this.$loading.close();
          if (res.code == 10000) {
            this.$router.go(-1)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  /*输入*/
  .ipt_box {
    height: 21rem;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    background: #fff;
    > p {
      height: 3rem;
      line-height: 3rem;
      font-size: 1.3rem;
      color: rgba(34, 34, 34, 1);
    }
    > div {
      height: 3.5rem;
      width: 100%;
      &.ipt_box_item {
        border: 1px solid #999;
      }
      > input {
        text-indent: .5rem;
        text-align: left;
        height: 3.5rem;
        width: 100%;
        box-sizing: border-box;
        color: #999999;
        border: none;
      }
    }
    > .ipt_box_btn {
      height: 4rem;
      width: 100%;
      line-height: 4rem;
      margin-top: 1rem;
      font-size: 1.3rem;
      background: rgba(247, 160, 3, 1);
      box-shadow: 0px 3px 8px 0px rgba(21, 22, 25, 0.36);
      border-radius: .6rem;
      color: #fff;
      text-align: center;
    }
  }

  /*搜索结果*/
  .result {
    height: 3rem;
    line-height: 3.5rem;
    font-size: 1.3rem;
    color: rgba(34, 34, 34, 1);
    padding: 0 .5rem;

    > span {
      padding-left: .5rem;
      border-left: .3rem solid #F7A003;
    }
  }

  /*没有输入*/
  .no_result {
    height: 6.5rem;
    line-height: 6.5rem;
    color: #DB1414;
    text-align: center;
    background: #fff;
  }

  .menber_box_log {
    width: 100%;
    /*height: 12rem;*/
    background: #fff;
    padding: .5rem 1rem;
    box-sizing: border-box;
    margin-bottom: .5rem;

    > .menber_box_log_top {
      height: 6rem;
      width: 100%;
      display: flex;
      &.bor_btm_no {
        border: none;
      }
      /*头像*/
      > .menber_box_log_top_l {
        width: 4.5rem;
        height: 100%;
        padding-top: .5rem;
        box-sizing: border-box;
        > span {
          display: inline-block;
          width: 100%;
          height: 4.5rem;
          background: url("images/user_icon_phto.png") no-repeat center;
          background-size: 100%;
        }
      }
      /*个人信息*/
      > .menber_box_log_top_r {
        width: calc(100% - 4.5rem);
        padding-left: .5rem;

        > .menber_box_log_top_r_t {
          height: 2rem;
          line-height: 2rem;
          display: flex;
          justify-content: space-between;
          > p {
            font-size: 1rem;
            color: rgba(102, 102, 102, 1);
            &:nth-child(1) {
              font-size: 1.3rem;
              color: #222222;
            }
          }
        }

        > .menber_box_log_top_r_b {
          height: 3rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          > .menber_box_log_top_r_b_l {
            > p {
              height: 1.5rem;
              line-height: 1.5rem;
              font-size: 1rem;
              color: rgba(102, 102, 102, 1);
              > span {
                margin-left: 2rem;
              }
            }
          }
          > .menber_box_log_top_r_b_r {
            > p {
              background: rgba(247, 160, 3, 1);
              padding: .5rem 1rem;
              height: 2rem;
              line-height: 2rem;
              text-align: center;
              border-radius: .5rem;
              color: rgba(255, 255, 255, 1);
              &.revoke_color {
                background: rgba(167, 178, 182, 1);
              }
            }
          }
        }
      }
    }

    > .menber_box_log_bottom {
      height: 3rem;
      padding-top: .5rem;
      box-sizing: border-box;
      width: 100%;
      line-height: 2rem;
      color: rgba(102, 102, 102, 1);
      font-size: 1rem;
      > div {
        display: flex;
        justify-content: space-between;
      }
    }
  }

</style>
