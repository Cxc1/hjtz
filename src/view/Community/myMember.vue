<template>
  <div>
    <Header :title="$t('header.lang_list_54')+'（'+ member_num + $t('content_text.lang_list_34')+'）'" gobackShowBol="true">
    </Header>
    <div class="main">
      <div class="myMember_noData" v-if="myMember_noData_show">
        <!--暫無數據-->
        <div>
          <img src="@/assets/zesj.png" alt="">
          <p>{{$t('content_text.lang_list_55')}}</p>
        </div>
      </div>
      <ul v-else class="menber_box"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loadBol"
          infinite-scroll-distance="0"
      >
        <li class="menber_box_log" v-for="(item, index) in myMemberList" :key="item.id">
          <div class="menber_box_log_top">
            <!--左侧头像-->
            <div class="menber_box_log_top_l">
              <span></span>
            </div>
            <!--右侧详细信息-->
            <div class="menber_box_log_top_r">
              <div class="menber_box_log_top_r_t">
                <p>{{item.user_nickname}}</p>
                <p>{{$t('content_text.lang_list_19')}}：{{item.act_time}}</p>
              </div>
              <div class="menber_box_log_top_r_b">
                <div class="menber_box_log_top_r_b_l">
                  <p>{{$t('content_text.lang_list_10')}}：{{item.user_mobile}}</p>
                  <p>ID：{{item.user_id}} <span>LV{{item.zhitui_level}}</span></p>
                </div>
                <!--<div class="menber_box_log_top_r_b_r">-->
                  <!--<p>{{item.status_name}}</p>-->
                <!--</div>-->
              </div>
            </div>
          </div>
          <div class="menber_box_log_bottom">
            <div>
              <p>{{$t('content_text.lang_list_57')}}：{{item.igk_lock_money}}</p>
              <p>{{$t('content_text.lang_list_58')}}：{{item.check_user}}</p>
            </div>
            <div>
              <p>{{$t('content_text.lang_list_59')}}：{{item.team_lock_money}}</p>
              <p>{{$t('content_text.lang_list_60')}}：{{item.member_num}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: "myMember",
    components: {
      Header
    },
    data() {
      return {
        loadBol: true,
        //我的社员列表
        myMemberList: [],
        //社员数量
        member_num: this.$route.query.member_num,
        p: 1,
        ps: 10,
        //无社员时页面显示
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
          p: this.p,
          ps: this.ps
        };
        this.$post('/Money/getCommunityMemberList', data).then(res => {
          if (res.code == 10000) {
            this.myMemberList = this.myMemberList.concat(res.result);
            let len = this.myMemberList;
            if (len <= 0) {
              this.myMember_noData_show = true;
            } else {
              this.myMember_noData_show = false;
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

</style>
