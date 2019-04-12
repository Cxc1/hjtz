<template>
  <div>
    <Header :title="$t('header.lang_list_17')" gobackShowBol="true">
    </Header>
    <div class="main">
      <h2 class="innerh_title">{{innerh_txt.title}}</h2>
      <p class="innerh_time">{{innerh_txt.add_time}}</p>
      <div class="innerh_txt_box" v-html="innerh_txt.content">

      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: "detail",
    components: {
      Header
    },
    data() {
      return {
        innerh_txt: ''
      }
    },
    created() {
      let article_id = this.$route.params.id;
      this.$post('/news/newsDetails', {article_id}).then(res => {
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
    height: 2rem;
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
