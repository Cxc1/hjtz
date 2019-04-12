<template>
  <div>
    <Header :title="$t('header.lang_list_78')" gobackShowBol="true">
    </Header>
    <div v-if="IGKInit != 3" class="main">
      <div class="banner"></div>
      <div class="Igkcom_txt">
        <h2 class="Igkcom_txt_title">{{$t('content_text.lang_list_94')}}</h2>
        <div class="Igkcom_txt_content">
          <div class="Igkcom_txt_content_l">{{Igk_community}}
          </div>
          <div class="Igkcom_txt_content_r">
            <span>

            </span>
          </div>
        </div>
      </div>
      <div class="Igkcom_btn " :class="{moanger :IGKInit== 2,gray:IGKInit == 3}" @click="goto_next">
        {{btn_txt}}
      </div>
    </div>
    <div v-else class="main">
      <div class="sh_top">
        <p>
          <span></span>
        </p>
        <p>{{$t('content_text.lang_list_90')}}</p>
        <p>{{$t('content_text.lang_list_91')}}</p>
      </div>
      <h2 class="sh_title">{{$t('content_text.lang_list_92')}}</h2>
      <div class="menber_box_log">
        <div class="menber_box_log_top">
          <!--左侧头像-->
          <div class="menber_box_log_top_l">
            <span></span>
          </div>
          <!--右侧详细信息-->
          <div class="menber_box_log_top_r">
            <div class="menber_box_log_top_r_t">
              <p>{{ApplyInfo.user_nickname}}</p>
            </div>
            <div class="menber_box_log_top_r_b">
              <p>{{$t('content_text.lang_list_10')}}：{{ApplyInfo.user_mobile}}</p>
              <p>ID：{{ApplyInfo.user_id}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="sh_btn" @click="cancelApplica">
        {{$t('btnTxt.lang_list_93')}}
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: "Igkcom",
    components: {
      Header
    },
    data() {
      return {
        //按钮显示的文字
        btn_txt: '',
        //社区初始状态
        IGKInit: '',

        ApplyInfo: [],
        Igk_community: '',
      }
    },
    created() {
      this.getMineIGKInit();
    },
    methods: {
      getMineIGKInit() {
        this.$loading.open();
        this.$post('/Money/mineIGKInit').then(res => {
          this.getIgk_community();
          if (res.code == 10000) {
            this.IGKInit = res.result.is_join;
            this.btn_txt = this.IGKInit == 1 ? this.$t('btnTxt.lang_list_77') : this.IGKInit == 2 ? this.$t('btnTxt.lang_list_76') : '審核中';
            if (this.IGKInit == 3) {
              this.getCommunityApplyInfo();
            }
          }
          this.$loading.close();
        })
      },
      getIgk_community() {
        this.$post('/news/igk_community').then(res => {
          if (res.code == 10000) {
            this.Igk_community = res.result
          }
        })
      },
      goto_next() {
        this.IGKInit == 1 ? this.$router.push('/community') : this.$router.push('/applications')
      },
      getCommunityApplyInfo() {
        this.$loading.open();
        this.$post('/Money/getCommunityApplyInfo').then(res => {
          if (res.code == 10000) {
              this.ApplyInfo = res.result
          }
          this.$loading.close();
        })
      },
      cancelApplica() {
        MessageBox({
          message: this.$t('msgs.lang_list_96'),
          title: this.$t('msgs.lang_list_95'),
          $type: 'confirm',
          showCancelButton: true,
          confirmButtonText: this.$t('msgs.confirm'),
          cancelButtonText: this.$t('msgs.cancel'),
        }).then(action => {
          console.log(MessageBox);
          this.$post('/Money/cancelCommunityApply').then(res => {
            if (res.code == 10000) {
              Toast(res.message);
              let set_id = setTimeout(() => {
                this.$router.go(0);
                clearTimeout(set_id)
              }, 1000);
            }
          })
        }).catch(error => {
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .banner {
    height: 13rem;
    padding: 1rem 0;
    width: 100%;
    background: url("images/banner.png") no-repeat center;
    background-size: 100%;
  }

  .Igkcom_txt {
    height: 25rem;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    background: #fff;
    > .Igkcom_txt_title {
      height: 2rem;
      line-height: 2rem;
      font-size: 1.2rem;
      color: #222222;
      text-indent: .5rem;
      &::before {
        content: '';
        display: block;
        height: 2rem;
        width: .3rem;
        background: #F7A003;
        float: left;
      }
    }
    > .Igkcom_txt_content {
      height: 20rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      > .Igkcom_txt_content_l {
        width: 60%;
        font-size: 1.1rem;
        color: #666666;
      }
      > .Igkcom_txt_content_r {
        display: flex;
        justify-content: center;
        width: 40%;
        > span {
          width: 10rem;
          height: 10rem;
          background: url("images/igkcom_s.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
  }

  .Igkcom_btn {
    width: 90%;
    height: 4rem;
    background: rgba(247, 160, 3, 1);
    border-radius: .6rem;
    margin: 2rem auto 0;
    text-align: center;
    line-height: 4rem;
    color: rgba(255, 255, 255, 1);
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.moanger {
      background: #F77003;
    }
    &.gray {
      background: #CCCCCC;
    }
  }

  .sh_top {
    margin: 1rem 0;
    height: 10rem;
    width: 100%;
    padding: 2rem 0;
    text-align: center;
    background: #fff;
    > p:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        width: 5rem;
        height: 5rem;
        background: url("images/fabu_icon_eb@2x@3x.png") no-repeat center;
        background-size: 100%;
      }
    }
    > p:nth-child(2) {
      font-size: 1.3rem;
      color: rgba(34, 34, 34, 1);
      height: 3rem;
      line-height: 3rem;
    }
    > p:nth-child(3) {
      color: #666666;
      height: 2.5rem;
      line-height: 2.5rem;
    }
  }

  .sh_title {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.3rem;
    color: #222222;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      width: .3rem;
      height: 2rem;
      display: block;
      margin-left: 1rem;
      margin-right: 1rem;
      background-color: #F7A003;

    }
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
            font-size: 1.3rem;
            color: #222222;
          }
        }
        > .menber_box_log_top_r_b {
          height: 3rem;
          width: 100%;
          > p {
            height: 2rem;
            line-height: 2rem;
            font-size: 1rem;
            color: #666;
            > span {
              margin-left: 2rem;
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

  .sh_btn {
    width: 90%;
    height: 3.5rem;
    border: 1px solid rgba(247, 160, 3, 1);
    border-radius: .6rem;
    margin: 8rem auto 0;
    text-align: center;
    line-height: 3.5rem;
    color: rgba(247, 160, 3, 1);
    font-size: 1.3rem;

  }
</style>
