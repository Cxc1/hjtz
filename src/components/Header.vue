<template>
  <div>
    <header>
      <span class="back" v-show="gobackShowBol" @click="goback"></span>
      <h2>{{title}}</h2>
      <slot></slot>
    </header>
  </div>
</template>

<script>
  import fun from '@/method/method';

  export default {
    name: "Header",
    props: ['title', 'gobackShowBol'],
    data() {
      return {}
    },
    created() {
      window.goback = this.goback
    },
    methods: {
      goback() {
        if (this.$route.name === 'Igkcom' ||
          this.$route.name === 'inviteFriends' ||
          this.$route.name === 'reg_ag' ||
          this.$route.name === 'treasureRecord' ||
          this.$route.name === 'myFriends' ||
          this.$route.name === 'chat' ||
          this.$route.name === 'detail') {
          if (this.$route.name === 'reg_ag') {
            if (this.$route.query.type == 'h5') {
              this.$router.goBack();
            }else {
              fun.exit();
            }
          } else {
            fun.exit();
          }
        } else {
          this.$router.goBack();
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  header {
    height: 44px;
    width: 100%;
    background: #F7A003;
    position: fixed;
    top: 0;
    display: flex;
    align-content: center;
    text-indent: 3rem;
    color: #fff;
    line-height: 44px;
  }

  header > h2 {
    line-height: 44px;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
  }

  .back {
    position: absolute;
    left: 0;
    width: 3rem;
    height: 100%;
    background: url("images/fanhui_icon.png") no-repeat center;
    background-size: 30%;
  }

  .slot {
    text-align: center;
    padding: 0 1rem;
    text-indent: 0;
    position: absolute;
    right: 0;
    font-size: 1.2rem;
  }
</style>
