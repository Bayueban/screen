<!-- 人体识别跟踪 -->
<template>
  <div id="box">
    <img class="cutVideo" :src="'data:image/jpg;base64,'+this.classification" alt="wu">
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      classification: "",
      websock: null,
      sock: null
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initWebSocket();
  },
  destroyed() {
    clearInterval(this.sock)
    this.websock.close(); //离开路由之后断开websocket连接
  },
  mounted() {},
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsurl = `ws:${location.host}/video`;
      debugger
      // const wsurl = `ws:127.0.0.1/video`;
      this.websock = new WebSocket(wsurl);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      this.sock = setInterval(() => {
        let actions = { type: "video" };       
        this.websocketsend(JSON.stringify(actions));
      }, 1000);
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      this.classification = redata.image;
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose() {
      //关闭
      // console.log("断开连接", e);
    }
  }
};
</script>
<style lang="scss" scoped>
#box {
  // border: 1px solid red;
  height: 100%;
  width: 100%;
  .cutVideo {
    height: 100%;
    width: 100%;
  }
}
</style>
