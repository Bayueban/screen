<!-- 首页盒子插槽 -->
<template>
  <div class="index_box_html flex">
    <div class="index_box_header flex">
      <img
        style="margin-right:6px"
        src="@/assets/index_box_left_icon.png"
        alt=""
      />
      {{ title }}
      <img
        style="margin-left:6px"
        src="@/assets/index_box_right_icon.png"
        alt=""
      />
    </div>
    <div class="index_box_body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ""
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.index_box_html {
  width: 452px;
  height: 288px;
  flex-direction: column;
  background-image: url("../assets/index_box_bg.png");
  background-size: 100% 100%;
  margin-top: 18px;
  .index_box_header {
    font-family: SourceHanSansCN-Medium;
    font-size: 18px;
    color: #1be9e9;
    justify-content: center;
    align-items: center;
    height: 38px;
    margin-top: 12px;
    background-image: url("../assets/index_box_header_bg.png");
    background-size: 100% 100%;
    img {
      width: 21px;
      height: 11px;
      margin-bottom: 4px;
    }
  }
  .index_box_body {
    flex: 1;
    position: relative;
    overflow: initial;
  }
}
</style>
