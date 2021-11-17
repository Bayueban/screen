<!-- 机器人状态 -->
<template>
  <IndexBox :title="title">
    <div class="robot_body flex">
      <div class="robot_box" style="width: 40%">
        <div id="powerChart" class="myChart"></div>
        <div class="tips">{{ this.val.battery }}%</div>
      </div>
      <div class="robot_box" style="width: 60%">
        <div id="stateChart" class="myChart"></div>
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
      powerChartData: {
        title: {
          text: "机器人电量",
          x: 55,
          // x: "center",
          y: "bottom",
          padding: [0, 0, 20, 0],
          textStyle: {
            fontSize: 14,
            color: "#ffffff", // 主标题文字颜色
          },
        },
        color: [],
        series: [
          {
            type: "pie",
            hoverAnimation: true,
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            lable: {
              show: true,
              position: "center",
              fontSize: "20",
              fontweight: "bold",
              formatter:  ()=> {
                return '<span>123</span>';
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [],
            itemStyle: {
              normal: {
                borderColor: "transparent",
                borderWidth: 1,
              },
            },
          },
        ],
      },
      stateChartData: {
        color: ["#1be9e9", "#06c1e5", "#2a8ce5"],
        legend: {
          color: ["#1be9e9", "#06c1e5", "#2a8ce5"],
          orient: "horizontal",
          y: "bottom",
          padding: [0, 0, 20, 0],
          textStyle: {
            fontSize: 14,
            color: "#ffffff",
          },
          itemWidth: 12,
          itemHeight: 12,
        },
        series: [
          {
            type: "pie",
            radius: ["15%", "50%"],
            hoverAnimation: true,
            center: ["50%", "50%"],
            label: {
              normal: {
                formatter: "{d}%", //百分比之后换行显示文字
                fontSize: 14,
                fontweight: "bold",
                color: "white",
                show: true,
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "#1be9e9", //指向线颜色
                },
                smooth: 0.2, //线的拐弯程度
                length: 4, //第一条线长度
                length1: 4, //第二条线长度
                length2: 2, //第三条线长度
              },
            },
            data: [],
          },
        ],
      },
    };
  },
  computed: {},
  watch: {
    val: function () {
      this.start();
    },
  },
  created() {},
  mounted() {},
  methods: {
    start() {
      let newdata = new Array(parseInt(this.val.battery / 8.3)).fill({
        value: 8.3,
      });
      let newColordata = new Array(Math.ceil(this.val.battery / 8.3)).fill(
        "#1be9e9"
      );
      newdata.push({
        value: (
          8.3 * Number(`0.${(this.val.battery / 8.3).toFixed(2).split(".")[1]}`)
        ).toFixed(2),
      });
      newdata.push({
        value: 100 - this.val.battery,
      });
      newColordata.push("transparent");
      this.powerChartData.series[0].data = newdata;
      this.powerChartData.color = newColordata;
      let powerChart = this.$echarts.init(
        document.getElementById("powerChart")
      );
      powerChart.setOption(this.powerChartData);
      let stateChart = this.$echarts.init(
        document.getElementById("stateChart")
      );
      this.stateChartData.series[0].data = [
        { value: this.val.offline_ratio, name: "离线" },
        { value: this.val.work_ratio, name: "工作" },
        { value: this.val.idle_ratio, name: "空闲" },
      ];
      stateChart.setOption(this.stateChartData);
    },
  },
};
</script>
<style lang="scss" scoped>
.robot_body {
  width: 100%;
  height: 100%;
}
.robot_box {
  height: 100%;
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#powerChart {
  background-image: url("../../assets/pie_bg.png");
  background-size: 150px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.myChart {
  width: 100%;
  height: 100%;
}
.tips {
  position: absolute;
  text-align: center;
  left: calc(50% - 17px);
  top: calc(50% - 11px);
  font-family: SourceHanSansCN-Regular;
  font-size: 20px;
  color: #00eaff;
}
</style>
