<!-- 任务&机械臂状态 -->
<template>
  <IndexBox :title="title">
    <div class="robot_task_html flex">
      <div class="robot_task">
        <img src="../../assets/task.png" alt="" />
        <div class="robot_list flex">
          <div class="robot_title">任务名称：</div>
          <div class="robot_val">{{ val.name }}</div>
        </div>
        <div class="robot_list flex">
          <div class="robot_title">任务进度：</div>
          <div class="robot_val">{{ val.process }}%</div>
        </div>
        <div class="robot_list flex">
          <div class="robot_title">路径长度：</div>
          <div class="robot_val">{{ val.mileage }}m</div>
        </div>
      </div>
      <div class="robot_voltage">
        <img src="../../assets/voltage.png" alt="" />
        <div class="robot_list flex">
          <div class="robot_title">R6电流/电压：</div>
          <div class="robot_val">{{ val.r6Voltage }}</div>
        </div>
        <div class="robot_list flex">
          <div class="robot_title">R5电流/电压：</div>
          <div class="robot_val">{{ val.r5Voltage }}</div>
        </div>
        <div class="robot_list flex">
          <div class="robot_title">R4电流/电压：</div>
          <div class="robot_val">{{ val.r4Voltage }}</div>
        </div>
      </div>
    </div>
  </IndexBox>
</template>
<script>
import IndexBox from "@/components/IndexBox.vue";
export default {
  props: {
    title: {
      type: String,
      default: () => ""
    },
    val: {
      type: Object,
      default: () => {}
    }
  },
  components: { IndexBox },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    this.val
  },
  mounted() {},
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.robot_task_html {
  justify-content: space-around;
  img {
    width: 117px;
    height: 97px;
    margin-bottom: 22px;
  }
  .robot_list {
    margin-bottom: 12px;
    .robot_title {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      color: #ffffff;
    }
    .robot_val {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      color: #1be9e9;
    }
  }
}
</style>
