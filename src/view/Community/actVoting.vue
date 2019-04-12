<template>
  <div>
    <Header title="激活社員(投票)" gobackShowBol="true">
    </Header>
    <div class="main">
      <!--我的信息-->
      <div class="user_data">
        <h3>我的信息</h3>
        <div class="user_data_list">
          <div class="user_data_list_l">
            <span class="user_data_list_l_1"></span>
          </div>
          <div class="user_data_list_r">當前競選： 3票</div>
        </div>
        <div class="user_data_list">
          <div class="user_data_list_l">
            <span class="user_data_list_l_2"></span>
          </div>
          <div class="user_data_list_r">票數容積： 600 <span></span></div>
        </div>
        <div class="user_data_list">
          <div class="user_data_list_l">
            <span class="user_data_list_l_3"></span>
          </div>
          <div class="user_data_list_r">當前激活社員最低票數：1票</div>
        </div>
      </div>
      <!--選擇激活票數-->

      <div class="active_munber">
        <h3>選擇激活票數</h3>
        <div class="active_munber_mun">投票數量</div>
        <div class="active_munber_ipt">
          <input type="number">
          <span class="active_munber_del"></span>
          <span class="active_munber_add"></span>
        </div>
        <p>當前投票上線：10票</p>
      </div>

      <!-- 確認按钮-->
      <div class="btn">
        確認
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: "actVoting",
    components: {
      Header
    }
  }
</script>

<style lang="less" scoped>

  /*我的信息*/
  .user_data {
    /*height: 16rem;*/
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    background: white;
    > h3 {
      height: 2rem;
      color: rgba(34, 34, 34, 1);
    }
    > .user_data_list {
      height: 4rem;
      line-height: 4rem;
      color: rgba(34, 34, 34, 1);
      font-size: 1.3rem;
      display: flex;
      > .user_data_list_l {
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          width: 2rem;
          height: 2rem;
          &.user_data_list_l_1 {
            background: url("images/sqgl_icon_7.png") no-repeat center;
            background-size: 100%;
          }
          &.user_data_list_l_2 {
            background: url("images/sqgl_icon_8.png") no-repeat center;
            background-size: 100%;
          }
          &.user_data_list_l_3 {
            background: url("images/sqgl_icon_2.png") no-repeat center;
            background-size: 100%;
          }
        }
      }
      > .user_data_list_r {
        margin-left: .5rem;
        display: flex;
        align-items: center;
        >span{
          display: inline-block;
          height: 1.5rem;
          margin-left: .5rem;
          width: 1.5rem;
          background: url("images/IGK.png") no-repeat center;
          background-size: 100%;
        }
      }
    }
  }

  /*選擇激活票數*/
  .active_munber{
    margin-top: .5rem;
    height: 16rem;
    padding: 1rem;
    background: #fff;
    color: rgba(34, 34, 34, 1);
    >h3{
      height: 2rem;
    }
    >.active_munber_mun{
      height: 6rem;
      line-height: 6rem;
      text-align: center;
      font-size: 1.8rem;
    }
    >.active_munber_ipt{
      height: 5rem;
      line-height: 5rem;
      font-size: 1.8rem;
      width: 95%;
      margin: auto;
      position: relative;
      border: 1px solid #F7A003;
      border-radius: 2.5rem;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 2rem;
      padding-right: 1rem;
      justify-content: space-between;
      >input{
        width: calc(100% - 8rem);
        height:4rem;
        border: none;
        text-align: left;
        font-size: 1.8rem;
      }
      >span{
        height: 3rem;
        width: 3rem;
        text-align: center;
        color: #fff;
        &.active_munber_del{
          background: url("images/del.png") no-repeat center;
          background-size: 100%;
        }
        &.active_munber_add {
          background: url("images/add.png") no-repeat center;
          background-size: 100%;
        }

      }
    }
    >p{
      width: 95%;
      height: 2rem;
      margin: auto;
      line-height: 2rem;
      text-indent: 2rem;
    }
  }

  /*確認按钮*/
  .btn{
    margin: 3rem auto;
    width: 90%;
    height:4rem;
    background:rgba(247,160,3,1);
    box-shadow:0px 3px 8px 0px rgba(21,22,25,0.36);
    border-radius:.6rem;
    font-size: 1.3rem;
    text-align: center;
    line-height: 4rem;
    color: #fff;
  }
</style>
