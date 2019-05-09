<template>
  <div>
    <Header :title="$t('header.lang_list_103')" gobackShowBol="true">
    </Header>
    <div class="main">
      <!--暫無數據-->
      <div v-if="noDataShow" class="not_data">
        <div>
          <img src="@/assets/zesj.png" alt="">
          <p>{{$t('content_text.lang_list_18')}}</p>
        </div>
      </div>
      <!--記錄數據-->
      <div v-else class="awards_record_box">
        <ul class="awards_record_box_scroll"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loadBol"
            infinite-scroll-distance="0"
        >
          <li class="awards_record_list" v-for="(item ,index) in userbcblist" :key="item.id">
            <div class="awards_record_list_l">
              <span>{{$t('content_text.lang_list_65')}}</span>
            </div>
            <div class="awards_record_list_r">
              <div class="awards_record_list_r_b">
                <div class="awards_record_list_r_b_l">
                  <p>+{{item.cl_value}} {{item.cy_name}}</p>
                  <p>{{item.cl_time}}</p>
                </div>
                <div class="awards_record_list_r_b_r">{{$t('content_text.lang_list_104')}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: "treasureRecord",
    components: {
      Header
    },
    data() {
      return {
        //加载数据bol值
        loadBol: true,
        //默认加载第一页
        page: 1,
        //一页加载15条
        rows: 15,
        //列表数据
        userbcblist: [],
        //控制没有数据页面的显示隐藏
        noDataShow: false,
      }
    },
    created() {
      //获取挖矿记录方法调用
      this.getuserbcblist();

    },
    methods: {
      //上拉加载
      loadMore() {
        this.page++;
        this.getuserbcblist();
      },
      //获取挖矿记录方法
      getuserbcblist() {
        this.$loading.open();
        this.loadBol = true;
        this.$post('/TreasuryLog/getuserbcblist', {page: this.page, rows: this.rows}).then(res => {
          if (res.code == 10000) {
            this.userbcblist = this.userbcblist.concat(res.result);
            let len = this.userbcblist;
            if (len <= 0) {
              this.noDataShow = true;
            } else {
              this.noDataShow = false;
            }
            //判断数据是否加载完毕
            if (res.result.length >= 15) {
              this.loadBol = false;
            }
          }
          this.$loading.close();
        })
      }
    },

  }
</script>

<style lang="less" scoped>
  /*没有数据时显示的页面*/
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
        height: 5rem;
      }
    }
  }

  .awards_record_box, .not_data {
    width: 100%;
    height: 100%;
    overflow: scroll;
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
        margin-bottom: .2rem;
        height: 4rem;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
        /*左*/
        > .awards_record_list_l {
          width: 4rem;
          text-align: center;
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
          > .awards_record_list_r_b {
            height: 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > div {
              color: rgba(102, 102, 102, 1);
              font-size: 1rem;
              > p:nth-child(1) {
                font-size: 1.2rem;
                color: rgba(34, 34, 34, 1);
              }
              &.awards_record_list_r_b_r {
                color: rgba(34, 34, 34, 1);
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
</style>
