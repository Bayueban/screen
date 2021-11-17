<template>
  <div id="app">
    <div id="nav" v-if="loading">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      htmlType: null
    };
  },
  mounted() {
    // let taht = this;
    // window.onresize = function() {
    //   taht.loading = false;
    //   if (taht.htmlType === null) {
    //     taht.htmlType = setTimeout(() => {
    //       taht.loading = true;
    //       taht.htmlType = null;
    //     }, 1000);
    //   }
    //   // taht.$nextTick(() => {
    //   //   taht.loading = true;
    //   // });
    // };
  }
};
</script>

<style lang="scss">
#nav {
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/html_bg.png");
  background-size: 100% 100%;
  overflow: hidden;
  overflow-y: auto;
}
</style>
