<template>
  <div>
    <Header :title="$t('header.lang_list_87')+'（'+ ps + $t('content_text.lang_list_34')+'）'" gobackShowBol="true">
    </Header>
    <div class="main">
      <div class="myMember_noData" v-if="myMember_noData_show">
        <!--暫無數據-->
        <div>
          <img src="@/assets/zesj.png" alt="">
          <p>{{$t('content_text.lang_list_88')}}</p>
        </div>
      </div>
      <ul v-else class="menber_box"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loadBol"
          infinite-scroll-distance="0"
      >
        <li class="myfrends_list" v-for="(item, index) in myMemberList" :key="item.id">
          <div class="myfrends_list_left">
            <img src="../../assets/user_icon_phto.png" alt="">
          </div>
          <div class="myfrends_list_right">
            <p>{{$t('content_text.lang_list_10')}}：{{item.user_mobile}}</p>
            <p class="join_time">
              <span>ID：{{item.user_id}}</span>
              <span>{{$t('content_text.lang_list_89')}}：{{item.user_reg_time}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: "myFriends",
    components: {
      Header
    },
    data() {
      return {
        loadBol: false,
        myMemberList: [],
        p: 1,
        ps: 0,
        myMember_noData_show: true,
      }
    },
    created() {
      this.getCommunityMemberList();
    },
    methods: {
      loadMore() {
        this.p++;
        this.getCommunityMemberList();
      },
      getCommunityMemberList() {
        this.$loading.open();
        this.loadBol = true;
        let data = {
          page: this.p
        };
        this.$post('/users/my_good_friends', data).then(res => {
          if (res.code == 10000) {
            this.myMemberList = this.myMemberList.concat(res.result.list);
            this.ps = res.result.count;
            let len = this.myMemberList;
            if (len <= 0) {
              this.myMember_noData_show = true;
            } else {
              this.myMember_noData_show = false;
            }
            if (res.result.list.length >= 10) {
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

  .myMember_noData {
    height: 100%;
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

  .myfrends_list {
    height: 6.5rem;
    width: 100%;
    margin-bottom: 1rem;
    background: white;
    padding: 1rem 1rem;
    box-sizing: border-box;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  .myfrends_list_left {
    float: left;
    width: 4.5rem;
    height: 4.5rem;
    // background: url("../../assets/user_icon_phto.png") no-repeat center;
    background-size: 100%;
  }

  .myfrends_list_right {
    float: left;
    width: calc(100% - 6.5rem);
    padding-left: 1.5rem;
    padding-top: 1rem;
    color: #666666;
    font-size: 1rem;
    .join_time {
      display: flex;
      justify-content: space-between;
      padding-top: 0.2rem;
      span:nth-child(2) {
        font-size: 0.8rem;
      }
    }
  }

</style>
