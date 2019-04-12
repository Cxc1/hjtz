
<template>
  <div class="chat_wrap">
    <Header :title="$t('header.lang_list_83')" gobackShowBol="true"></Header>
      <p class="promt">{{$t('content_text.lang_list_84')}}</p>
    <div id="scorllWrap" ref="scorllWrap">
        <vuescroll
            ref="vs"
            :ops="ops"
            @handle-scroll="handleScroll"
            @handle-scroll-complete="handleComplete"
        >
            <ul ref="wrapper"  class="wrapper" id="wrapper">
                    <li v-for="(item,index) in msglist" :key="index">
                        <div class="left_box" v-if="item._position == 'l'">
                            <div class="left_userinfo">
                                <img :src=item.head >
                                <p>{{item.nick}}</p>
                            </div>
                            <p>{{item.msg_time}}</p>
                            <div class="leftuser">
                                <p  v-if="item.type == 'txt'">{{item.msg_content}} </p>
                                 <img :src= item.msg_content class="small" v-if="item.type == 'image'">
                            </div>
                         </div>
                         <div  class="right_box" v-if="item._position == 'r'">
                            <div class="rightuser">
                                <p v-if="item.type == 'txt'">{{item.msg_content}}</p>
                                <img :src= item.msg_content class="small" v-if="item.type == 'image'" @click="glass(item.msg_content)">
                            </div>
                            <p>{{item.msg_time}}</p>
                         </div>
                    </li>
                </ul>
        </vuescroll>
    </div>
    <div class="bigimg" v-if="flag1">
      <img :src=smallImgSrc alt="" @click="reduce">
    </div>
    <!-- 留言 -->
    <div class="send_message">
      <p>{{$t('content_text.lang_list_85')}}</p>
      <textarea name="" id="message_val" cols="30" rows="10" :placeholder="$t('content_text.lang_list_102')" v-model="msg_val"></textarea>
      <div class="send_btn">
        <img src alt @click="_click">
        <span @click="send_msg">{{$t('btnTxt.lang_list_86')}}</span>
      </div>
      <input type="file" class="upload" hidden accept="image/*" ref="upload" @change="uploadFn">
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import vuescroll from "vuescroll";
export default {
  name: "chat",
  components: {
    Header,
    vuescroll
  },
  data() {
    return {
     noData: false,
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true,

        },
        scrollPanel: {
          initialScrollY: "100%",
          initialScrollX: false,
          scrollingX: true,
          scrollingY: true,
          speed: 500,
          easing: "easeInQuad",
          verticalNativeBarPos: "right"
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#c1c1c1',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        }
      },
      scrollTopVal:0,//离顶不距离标识
      flag:0, //第一次进入页面时 不重复请求接口标识
      flag1:false,//点击图片放大标识
      msg_val:"",//发送消息的内容
      smallImgSrc:"",//点击图片的地址
      msglist :[],//聊天内容列表
    };
  },
  methods: {
    _click() {
      this.$refs.upload.click();
    },
    //滚动到指定区域 值可是（10 or 10%）number或百分比
    scrollTopadd(){
        this.$refs['vs'].scrollTo({
            y:'100%',
        },400);
    },
    //正在滚动的触发事件
    handleScroll(vertical, horizontal, nativeEvent) {
          if( this.scrollTopVal == vertical.scrollTop && this.flag > 0){
                  this.getMSG();
          }
       
          if( this.scrollTopVal <= vertical.scrollTop){
               this.scrollTopVal = vertical.scrollTop;
          }
    },
    //滚动结束时触发事件
    handleComplete(vertical, horizontal){
            this.flag++ ;
    },
    // 发送消息
    send_msg(){
        if(this.msg_val != ""){
            let data = {msg_body:this.msg_val,};
            this.$loading.open();
            this.$post("/chat/send_messages",data)
            .then(res => {
                if (res.code == 10000) {
                    this.msg_val = "";
                     this.getMSG();
                }
                   this.$loading.close();
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    // 发送图片
    uploadFn() {
      let that = this;
      var file = this.$refs.upload.files[0];
      if (file.type.indexOf("image") != -1) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          var dx = e.total / 1024 / 1024;
          if (this.result) {
            let data = {img:this.result};
            that.$loading.open();
            that.$post("/chat/upload",data)
            .then(res => {
                if (res.code == 10000) {
                    that.getMSG();
                }
                 that.$loading.close();
            })
            .catch(error => {
                console.log(error);
            });
          }
        };
      }
    },
    //获取聊天内容
    getMSG(){
        this.$post("/chat/get_messages")
        .then(res => {
            if (res.code == 10000) {
                this.msg_val = "";
                this.msglist = res.result;
            }
        })
        .then(() =>{
            this.scrollTopadd();
        })
        .catch(error => {
            console.log(error);
        });
    },
    //放大图片
    glass(src){
      this.flag1 = true;
      this.smallImgSrc = src;
    },
    //点击放大的图片
    reduce(){
      this.flag1 = false; 
    }
  },
  created() {
    this.getMSG();
  },
  mounted() {
        //当内容高度不够时
         setTimeout(() => {
          if(this.$refs.wrapper.offsetHeight < this.$refs.scorllWrap.offsetHeight){
                      console.log(this.$refs.scorllWrap.offsetHeight)
                this.$refs.wrapper.style.height = (this.$refs.scorllWrap.offsetHeight + 40)+'px';
            }
        }, 300);
  },
};
</script>

<style lang="less" scoped>
#scorllWrap {
  background: #f4f4f4;
  width: 100%;
  top: 78px;
  bottom: 12rem;
  overflow: hidden;
  position: fixed;
}

.wrapper{
    min-height: 100% !important;
    padding: 0 1rem;
    // height: 500px;
}
.send_message {
  position: fixed;
  background: #f4f4f4;
  padding: 0 1rem;
  height: 12rem;
  bottom: 0rem;
  left: 0;
  right: 0;
  z-index: 9;
}
.send_message textarea {
  height: 5rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}
.send_message > p {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
.send_btn {
  display: flex;
  justify-content: flex-start;
  padding-top: 0.7rem;
}
.send_btn > img {
  width: 2.6rem;
  height: 2.3rem;
  background: url("./images/message.png") no-repeat center;
  background-size: 100% 100%;
}
.send_btn > span {
  padding: 0 1.5rem;
  height: 2.3rem;
  line-height: 2.3rem;
  color: #fff;
  background: #f7a003;
  margin-left: 1.5rem;
  border-radius: 0.3rem 0.3rem 0.3rem 0;
  font-size: 1.1rem;
}
.left_box > p,
.right_box > p {
  text-align: center;
  color: #999999;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.left_userinfo {
  display: flex;
  justify-content: flex-start;
}
.leftuser {
  position: relative;
  display: inline-block;
  background: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  color: #222;
  font-size: 1rem;
  /* min-height: 4rem; */
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.36);
}
.leftuser::before {
  position: absolute;
  display: inline-block;
  top: -0.8rem;
  left: 0rem;
  width: 0;
  height: 0px;
  content: "";
  border-style: solid;
  border-width: 0 1rem 1rem 0;
  border-color: #fff transparent;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.36);
}
.leftuser > p {
  font-size: 1.2rem;
  word-break: break-word;
}
.left_userinfo > img {
  align-content: center;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 3.5rem;
}
.left_userinfo > p {
  align-content: center;
  height: 3.5rem;
  line-height: 3.5rem;
  padding-left: 1rem;
  color: #222222;
  font-size: 1.2rem;
}
.right_box {
  text-align: right;
}
.rightuser p {
  word-break: break-word;
  text-align: left;
}
.rightuser {
  background: #f7a003;
  position: relative;
  right: 0;
  display: inline-block;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem 0.5rem 0 0.5rem;
  color: #fff;
  font-size: 1rem;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.36);
}
.rightuser::before {
  position: absolute;
  display: inline-block;
  bottom: -0.8rem;
  right: 0rem;
  width: 0;
  height: 0px;
  content: "";
  border-style: solid;
  border-width: 0 1rem 1rem 0;
  border-color: transparent #f7a003;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.36);
}
.bigimg {
  background: #222;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100000;
}
.bigimg > img {
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  width: 100%;
}
.small {
  height: 5rem;
}
.promt {
  position: fixed;
  top: 44px;
  height: 34px;
  left: 0;
  right: 0;
  line-height: 34px;
  text-align: center;
  color: #666;
  font-size: 1rem;
  z-index: 99999;
  background: #f4f4f4;
}
.__vuescroll {
  position: fixed !important;
  height: auto !important;
  background: #f4f4f4;
  width: 100%;
  top: 78px;
  bottom: 12rem;
  overflow: hidden;
}
</style>
