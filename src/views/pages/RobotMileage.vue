<!-- 机器人里程 -->
<template>
  <IndexBox :title="title">
    <div id="robotMileage" class="robotMileage"></div>
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
      type: Array,
      default: () => [],
    },
  },
  components: { IndexBox },
  data() {
    return {
      chart: {
        title: {
          text: "",
          textStyle: {
            color: "#fff",
            fontSize: 10,
          },
        },
        legend: {
          orient: "horizontal",
          y: "bottom",
          itemWidth: 14,
          itemHeight: 2,
          textStyle: {
            fontSize: 12,
            color: "#ffffff",
          },
        },
        dataset: {
          source: [],
        },
        grid: {
          x: 30,
          y: 30,
          x2: 10,
          y2: 50,
        },
        xAxis: { type: "category" },
        yAxis: {
          show: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#102b4f"],
              width: 1,
              type: "dashed",
            },
          },
        },
        series: [
          {
            type: "bar",
            color: "#1be9e9",
            name: "里数",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 12,
                  },
                },
              },
            },
          },
          // { type: "bar", color: "#27a0ff", name: "里数" ,data:[]},
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
  mounted() {
    // this.start();
  },
  methods: {
    start() {
      this.chart.dataset.source = this.val.map((item, index) => {
        let num = item.toFixed(1)
        return [index + 1, num];
      });
      let myChart = this.$echarts.init(document.getElementById("robotMileage"));
      myChart.setOption(this.chart);
    },
  },
};
</script>
<style lang="scss" scoped>
.robotMileage {
  width: 100%;
  height: 100%;
}
</style>
