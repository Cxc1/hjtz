<template>
  <transition id="app" :name="transitionName">
    <router-view class="Router"/>
  </transition>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: '', // 默认动态路由变化为slide-right
      };
    },
    watch: {
      '$route'(to, from) {
        if (from.name) {
          let isBack = this.$router.isBack;
          if (isBack) {
            this.transitionName = 'slide-right';
          } else {
            this.transitionName = 'slide-left';
          }
          this.$router.isBack = false
        }
      }
    }
  };
</script>

<style lang="less">
  html,body,#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: HiraginoSansGB-W3;
  }

  .Router {
    transition: all .5s ease;
  }

  .slide-left-enter,
   .slide-right-leave-active {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    opacity: 0.5;
  }

  .slide-left-leave-active,
  .slide-right-enter {
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
    opacity: 0.5;
  }
</style>
