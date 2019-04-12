<template>
  <div>
    <Header :title="innerh_txt.title_name" gobackShowBol="true">
    </Header>
    <div class="main">
      <div class="innerh_txt_box" v-html="innerh_txt.content">
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  export default {
    name: "reg_ag",
    components: {
      Header
    },
    data() {
      return {
        innerh_txt: '',
      }
    },
    created() {
      let position_id = this.$route.params.id;
      this.$post('/news/newsDetails', {position_id}).then(res => {
        if (res.code == 10000) {
          this.innerh_txt = res.result
        }
      }).catch(error => {
        console.log(error);
      })
    },
    mouthed() {

    }
  }
</script>

<style lang="less" scoped>

  .innerh_title {
    font-size: 1.3rem;
    text-indent: 1rem;
    color: #F7A003;
    line-height: 2rem;
  }

  .innerh_time {
    height: 2rem;
    line-height: 2rem;
    display: inline-block;
    padding-left: 1rem;
    font-size: 1rem;
    color: #999;
  }

  .innerh_txt_box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /*overflow: scroll;*/
    padding: 0 1rem;
    color: #333;
  }

</style>
