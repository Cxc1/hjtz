<template>
  <div>
    <Header :title="$t('header.lang_list_23')" gobackShowBol="true">
    </Header>
    <div class="main">
      <!--个人数据-->
      <div class="com_user_data">
        <div class="com_user_data_l">
          <span></span>
        </div>
        <div class="com_user_data_r">
          <div class="com_user_data_r_name">
            <p>{{levelDetail.user_nickname}}</p>
            <p>ID：{{levelDetail.user_id}}</p>
          </div>
          <div class="com_user_data_r_grade">
            <p>{{$t('content_text.lang_list_24')}}：LV{{levelDetail.zhitui_level}}</p>
            <p>{{$t('content_text.lang_list_26')}}：LV{{next_level.level}}</p>
          </div>
        </div>
      </div>

      <!--会员数 票数-->
      <div class="com_number">
        <div class="com_number_list">
          <p>{{$t('content_text.lang_list_33')}}</p>
          <p><span :style="'width:'+ rote_1 +'%'"></span></p>
          <p>
            <span>LV{{levelDetail.zhitui_level}}</span>
            <span>LV{{next_level.level}}</span>
          </p>
          <p>
            <span>{{levelDetail.valid_member_num}}{{$t('content_text.lang_list_34')}}</span>
            <span>{{next_level.valid_member_num}}{{$t('content_text.lang_list_34')}}</span>
          </p>
        </div>
        <div class="com_number_list">
          <p>{{$t('content_text.lang_list_127')}}</p>
          <p><span :style="'width:'+ rote_2 +'%'"></span></p>
          <p>
            <span>LV{{levelDetail.zhitui_level}}</span>
            <span>LV{{next_level.level}}</span>
          </p>
          <p>
            <span>{{levelDetail.total_money}} IGK</span>
            <span>{{next_level.total_money}} IGK</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: "ComLevel",
    components: {
      Header
    },
    data() {
      return {
        //等级详情
        levelDetail: '',
        //下一等级
        next_level: '',
      }
    },
    created() {
      this.getLevelDetail();
    },
    methods: {
      getLevelDetail() {
        this.$post('/Money/IGKCommunityLevelDetail').then(res => {
          if (res.code == 10000) {
            this.levelDetail = res.result;
            this.next_level = res.result.next_level;
          }
        })
      }
    },
    computed: {
      //有效社区员数比例
      rote_1() {
        let rote = ((this.levelDetail.valid_member_num / this.next_level.valid_member_num) * 100).toFixed(0);
        return rote >= 100 ? 100 : rote
      },
      //总业绩比例
      rote_2() {
        let rote = ((this.levelDetail.total_money / this.next_level.total_money) * 100).toFixed(0);
        return rote >= 100 ? 100 : rote
      }
    }
  }
</script>

<style lang="less" scoped>
  /*个人信息*/
  .com_user_data {
    height: 10rem;
    padding: 1rem;
    box-sizing: border-box;
    background: white;
    display: flex;
    > .com_user_data_l {
      width: 6rem;
      > span {
        display: block;
        width: 4rem;
        height: 4rem;
        margin: auto;
        background: url("images/user_icon_phto.png") no-repeat center;
        background-size: 100%;
      }
    }
    > .com_user_data_r {
      line-height: 1.5rem;
      color: #222;
      > div {
        height: 4rem;
        line-height: 2rem;
        &.com_user_data_r_name {

          font-size: 1.33rem;
          > p {
            height: 2rem;
          }
          > p:nth-child(2) {
            height: 1.5rem;
            color: #666;
            line-height: 1.5rem;
            font-size: 1rem;
          }
        }
      }
    }
  }

  /*会员数 票数*/
  .com_number {
    padding: 1rem;
    background: #fff;
    margin-top: .5rem;
    > .com_number_list {
      padding: .5rem 1rem;
      > p {
        color: rgba(102, 102, 102, 1);
        height: 1.5rem;
        display: flex;
        justify-content: space-between;
        &:nth-child(1) {
          height: 2rem;
          font-size: 1.2rem;
          color: #222;
        }
        &:nth-child(2) {
          background: #ccc;
          border-radius: .75rem;
          > span {
            background: #3284CA;
            border-radius: .75rem;
          }
        }
      }
    }
  }
</style>
