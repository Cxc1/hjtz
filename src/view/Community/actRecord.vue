<template>
  <div>
    <Header :title="$t('header.lang_list_4')" gobackShowBol="true">
    </Header>
    <div class="main">
      <nav class="tabbar">
        <p v-for="(item ,index) in seleAct">
          <span :class="{seleAct:index==seleIndex}" @click="changeIndex(index)">{{item}}</span>
        </p>
      </nav>
      <div class="actRecord_noData" v-if="noDataShow">
        <!--暫無數據-->
        <div>
          <img src="@/assets/zesj.png" alt="">
          <p>{{$t('content_text.lang_list_18')}}</p>
        </div>
      </div>
      <div v-else class="menber_scroll">
        <ul class="menber_box"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loadBol"
            infinite-scroll-distance="0"
        >
          <li class="menber_box_log" v-for="(item ,index) in activeList" :key="item.id">
            <div class="menber_box_log_top bor_btm_no">
              <!--左侧头像-->
              <div class="menber_box_log_top_l">
                <span></span>
              </div>
              <!--右侧详细信息-->
              <div class="menber_box_log_top_r">
                <div class="menber_box_log_top_r_t">
                  <p>{{item.user_nickname}}</p>
                  <!--<p>激活時間：2019-1-24</p>-->
                </div>
                <div class="menber_box_log_top_r_b">
                  <div class="menber_box_log_top_r_b_l">
                    <p>{{$t('content_text.lang_list_10')}}：{{item.user_mobile}}</p>
                    <p>ID：{{item.user_id}} <span></span></p>
                  </div>
                  <div class="menber_box_log_top_r_b_r">
                    <p :class="{revoke_color:item.status == 3 }">{{item.status_name}}</p>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="menber_box_log_bottom">-->
            <!--<div>-->
            <!--<p>當前入金：1010000</p>-->
            <!--<p>審核人：132****3241</p>-->
            <!--</div>-->
            <!--<div>-->
            <!--<p>團隊入金：100000000</p>-->
            <!--<p>TA的社員：351</p>-->
            <!--</div>-->
            <!--</div>-->
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: "actRecord",
    components: {
      Header
    },
    data() {
      return {
        loadBol: true,
        p: 1,
        ps: 10,
        //类型 0 全部 1 已审核 2 已撤销
        type: 0,
        //记录
        activeList: [],
        //导航
        seleAct: [this.$t('content_text.lang_list_20'), this.$t('content_text.lang_list_22'),this.$t('content_text.lang_list_21')],
        //默认全部
        seleIndex: 0,
        //暂未数据
        noDataShow: true,
      }
    },
    created() {
      this.getCommunityActivationList();
    },
    methods: {
      //上拉加载
      loadMore() {
        this.p++;
        this.getCommunityActivationList();
      },

      //导航切换
      changeIndex(i) {
        this.seleIndex = i;
        this.type = i;
        this.p = 1;
        this.activeList = [];
        this.getCommunityActivationList();
      },

      //获取记录数据
      getCommunityActivationList() {
        this.$loading.open();
        this.loadBol = true;
        let data = {
          p: this.p,
          ps: this.ps,
          type: this.type
        };
        this.$post('/Money/getCommunityActivationList', data).then(res => {
          if (res.code == 10000) {
            this.activeList = this.activeList.concat(res.result);
            let len = this.activeList;
            if (len <= 0) {
              this.noDataShow = true;
            } else {
              this.noDataShow = false;
            }
            if (res.result.length >= 10) {
              this.loadBol = false;
            }

          }
          this.$loading.close();
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../styles/menberRecord.less");

  .tabbar {
    height: 3.5rem;
    width: 100%;
    line-height: 3.5rem;
    padding: 0 1rem;
    box-sizing: border-box;
    font-size: 1.3rem;
    color: rgba(51, 51, 51, 1);
    display: flex;
    justify-content: left;
    > p {
      padding-right: 3rem;
      > span {
        display: inline-block;
        height: 3.3rem;
        position: relative;
        &.seleAct {
          border-bottom: .2rem solid #F7A003;
          color: #F7A003;
        }

      }
    }
  }

  .menber_scroll {
    height: calc(100% - 3.5rem);
    width: 100%;
    overflow: scroll;
  }

  .actRecord_noData {
    height: calc(100% - 4rem);
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #999;
    > div {
      text-align: center;
      > img {
        width: 4rem;
      }
    }
  }

</style>
