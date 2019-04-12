<template>
  <div>
    <Header :title="title" gobackShowBol="true">
    </Header>
    <div class="main" id="captcha">
      <div class="main_son">
        <div class="awards_top">
          <div class="awards_top_txt">
            <div>
              <p>{{$t('content_text.lang_list_61')}}</p>
              <p>{{init_data.total_money}}</p>
            </div>
            <div>
              <p>{{$t('content_text.lang_list_62')}}</p>
              <p>{{init_data.rate}}%</p>
            </div>
            <div>
              <p>{{$t('content_text.lang_list_63')}}</p>
              <p>{{init_data.today_money}}</p>
            </div>
          </div>
          <div class="awards_top_btn" :class="{m_active:init_data.status != 1}" @click="incomeReceive">{{btn_txt}}</div>
        </div>

        <div v-if="DataShow" class="awards_record_box">
          <ul class="awards_record_box_scroll"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loadBol"
              infinite-scroll-distance="0"
          >
            <li class="awards_record_list" v-for="(item ,index ) in record_list" :key="item.id">
              <div class="awards_record_list_l">
                <span>{{$t('content_text.lang_list_65')}}</span>
              </div>
              <div class="awards_record_list_r">
                <p>
                  <span>{{item.type_name}}</span>
                  <span>{{item.time}}</span>
                </p>
                <div class="awards_record_list_r_b">
                  <div class="awards_record_list_r_b_l">
                    <p>{{$t('content_text.lang_list_67')}}：{{item.rate}}%</p>
                    <p>{{$t('content_text.lang_list_98')}}：{{item.fee_value}}IGK</p>
                  </div>
                  <div class="awards_record_list_r_b_r">+{{item.actual_money}} IGK</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!--暫無數據-->
        <div v-else class="not_data">
          <div>
            <img src="@/assets/zwjl_icon.png" alt="">
            <p>{{$t('content_text.lang_list_18')}}</p>
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
    name: "receiveAwards",
    components: {
      Header
    },
    data() {
      return {
        loadBol: true,
        //標題
        title: '',
        //獎勵初始數據接口地址
        init_url: '',
        //獎勵記錄接口地址
        record_url: '',
        //領取獎勵接口地址
        income_url: '',
        //初始數據
        init_data: [],
        //領取記錄
        record_list: [],
        //按鈕狀態
        btn_txt: '',

        status: false,
        p: 1,
        ps: 10,
        //
        DataShow: true,
        //易盾驗證
        captchaIns: '',
      };
    },
    created() {
      const receive_type = this.$route.query.type;
      //基礎獎勵
      if (receive_type == 1) {
        this.title = this.$t("header.lang_list_70");
        this.init_url = '/Money/IGKBaseIncomeInit';
        this.record_url = '/Money/IGKBaseIncomeLog';
        this.income_url = '/Money/IGKBaseIncomeReceive';
      } else if (receive_type == 2) {
        //分享獎勵
        this.title = this.$t("header.lang_list_71");
        this.init_url = '/Money/IGKShareIncomeInit';
        this.record_url = '/Money/IGKShareIncomeLog';
        this.income_url = '/Money/IGKShareIncomeReceive';
      } else if (receive_type == 3) {
        //直推獎勵
        this.title = this.$t("header.lang_list_72");
        this.init_url = '/Money/IGKZhituiIncomeInit';
        this.record_url = '/Money/IGKZhituiIncomeLog';
        this.income_url = '/Money/IGKZhituiIncomeReceive';
      }
      this.getIncomeInit();
      this.getIncomeRecord();
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
              self.$post(self.income_url, {validate: data.validate}).then(res => {
                if (res.code == 10000) {
                  Toast(res.message);
                  self.record_list = [];
                  self.p = 1;
                  self.getIncomeInit();
                  self.getIncomeRecord();
                }
              })
            }
          }
        },
        instance => {
          // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
          this.captchaIns = instance;
        })
    },
    methods: {
      //上拉加載
      loadMore() {
        this.p++;
        this.loadBol = true;
        this.getIncomeRecord();
      },
      //獲取初始數據
      getIncomeInit() {
        this.$post(this.init_url).then(res => {
          if (res.code == 10000) {
            this.init_data = res.result;
            this.btn_txt = res.result.status == 1 ? this.$t('btnTxt.lang_list_99') : res.result.status == 2 ? this.$t('btnTxt.lang_list_100') : this.$t('btnTxt.lang_list_101');
            this.status = res.result.status == 1 ? true : false;
          }
        })
      },
      //獲取記錄數據
      getIncomeRecord() {
        this.$loading.open();
        this.$post(this.record_url, {p: this.p, ps: this.ps}).then(res => {
          if (res.code == 10000) {
            this.record_list = this.record_list.concat(res.result);
            if (res.result.length >= 10) {
              this.loadBol = false;
            }
            let len = this.record_list.length;
            this.DataShow = len > 0 ? true : false;
          }
          this.$loading.close();

        });
      },
      //調取易盾驗證
      incomeReceive() {
        if (this.init_data.status == 1) {
          this.captchaIns.popUp();
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  .main_son {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .awards_top {
    height: 9rem;
    padding: 2rem 1rem;
    box-sizing: border-box;
    width: 100%;
    background: white;
    > .awards_top_txt {
      height: 5rem;
      width: 100%;
      display: flex;
      > div {
        flex: 1;
        > p {
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          font-size: 1.2rem;
          color: rgba(51, 51, 51, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    > .awards_top_btn {
      height: 3.5rem;
      width: 64%;
      margin: auto;
      background: rgba(247, 160, 3, 1);
      border-radius: .6rem;
      color: rgba(255, 255, 255, 1);
      font-size: 1.2rem;
      line-height: 3.5rem;
      text-align: center;
      &.m_active {
        background: rgba(204, 204, 204, 1);
      }
    }
  }

  .not_data {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #999;
    > div {
      text-align: center;
      > img {
        height: 8rem;
      }
    }
  }

  .awards_record_box, .not_data {
    position: absolute;
    top: 12rem;
    bottom: 0;
    left: 0;
    right: 0;
    /*overflow: scroll;*/
    > .awards_record_box_scroll {
      width: 100%;
      height: 100%;
      overflow: scroll;
      > .awards_record_list {
        width: 100%;
        background: white;
        padding: .5rem 1rem;
        box-sizing: border-box;
        display: flex;
        margin-bottom: .5rem;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
        /*左*/
        > .awards_record_list_l {
          width: 4rem;
          text-align: center;
          margin-top: 1rem;
          > span {
            display: inline-block;
            width: 2.5rem;
            line-height: 2.5rem;
            height: 2.5rem;
            border: 1px solid #999999;
            border-radius: 50%;
            margin: auto;
            color: #222222;
            font-size: 1.3rem;
          }
        }
        /*右*/
        > .awards_record_list_r {
          width: calc(100% - 4rem);
          > p {
            height: 2rem;
            line-height: 2rem;
            display: flex;
            justify-content: space-between;
            > span {
              color: #999999;
              &:nth-child(1) {
                color: #222;
                font-size: 1.2rem;
              }
            }
          }
          > .awards_record_list_r_b {
            height: 3rem;
            display: flex;
            justify-content: space-between;
            > div {
              color: rgba(102, 102, 102, 1);
              font-size: 1rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              > p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              &.awards_record_list_r_b_r {
                color: rgba(34, 34, 34, 1);
                font-size: 1.3rem;
              }
            }
          }
        }
      }
    }
  }
</style>
