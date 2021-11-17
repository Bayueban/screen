<!-- 机器人状态看板 -->
<template>
  <IndexBox :title="title">
    <div class="robot_type_lists flex">
      <div class="robot_type_list flex">
        <div class="titles flex">
          <div class="title_icon flex">
            <img class="state" src="../../assets/state.png" alt="" />
          </div>
          工作状态
        </div>
        <div class="robot_type_val">
          {{ val.workState }}
        </div>
      </div>
      <div class="robot_type_list flex">
        <div class="titles flex">
          <div class="title_icon flex">
            <img class="coordinate" src="../../assets/coordinate.png" alt="" />
          </div>
          坐标
        </div>
        <div class="robot_type_val">
          [{{ val.xAxis ? val.xAxis : 0 }},{{
            val.yAxis ? val.yAxis : 0
          }},{{ val.yaw ? val.yaw : 0 }}]
        </div>
      </div>
      <div class="robot_type_list flex">
        <div class="titles flex">
          <div class="title_icon flex">
            <img class="mileage" src="../../assets/mileage.png" alt="" />
          </div>
          累计里程
        </div>
        <div class="robot_type_val">{{ val.total_mileage }}<span>km</span></div>
      </div>
      <div class="robot_type_list flex">
        <div class="titles flex">
          <div class="title_icon flex">
            <img
              class="electricityQuantity"
              src="../../assets/electricityQuantity.png"
              alt=""
            />
          </div>
          <!-- 电量 -->
          电池状态
        </div>
        <div class="robot_type_val">{{ val.is_charging }}</div>
      </div>
      <div class="robot_type_list flex">
        <div class="titles flex">
          <div class="title_icon flex">
            <img class="robotState" src="../../assets/robotState.png" alt="" />
          </div>
          机器人状态
        </div>
        <div class="robot_type_val">
          {{ val.state }}
        </div>
      </div>
      <div class="robot_type_list flex">
        <div class="titles flex">
          <div class="title_icon flex">
            <img class="bug" src="../../assets/bug.png" alt="" />
          </div>
          故障状态
        </div>
        <div class="robot_type_val bug_val">
          {{ val.error }}
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
      default: () => "",
    },
    val: {
      type: Object,
      default: () => {},
    },
  },
  components: { IndexBox },
  data() {
    return {
      data: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.robot_type_lists {
  flex-wrap: wrap;
  height: 100%;
  padding: 40px 0px;
  .state {
    width: 16px;
    height: 16px;
  }
  .coordinate {
    width: 16px;
    height: 20px;
  }
  .mileage {
    width: 22px;
    height: 16px;
  }
  .electricityQuantity {
    width: 13px;
    height: 18px;
  }
  .robotState {
    width: 20px;
    height: 20px;
  }
  .bug {
    width: 19px;
    height: 19px;
  }
  .robot_type_list {
    width: calc(100% / 3);
    margin-bottom: 40px;
    flex-direction: column;
    align-items: center;
    .titles {
      font-family: SourceHanSansCN-Regular;
      font-size: 16px;
      color: #ffffff;
      align-items: center;
      margin-bottom: 10px;
      .title_icon {
        width: 22px;
        height: 22px;
        justify-content: center;
        align-items: center;
        margin-right: 7px;
      }
    }
    .robot_type_val {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      color: #1be9e9;
      span {
        font-family: SourceHanSansCN-Regular;
        font-size: 18px;
        color: #ffffff;
      }
    }
    .bug_val {
      color: #ff014f;
    }
  }
}
</style>
