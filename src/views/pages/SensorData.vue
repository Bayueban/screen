<!-- 传感器数据 -->
<template>
  <IndexBox :title="title">
    <div id="sensorData" class="sensorData"></div>
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
          itemWidth: 4,
          itemHeight: 4,
          textStyle: {
            fontSize: 10,
            color: "#ffffff",
          },
        },
        grid: {
          x: 5,
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
        series: [],
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
      let color = ["#ffb400", "#00FFFF", "#FF69B4", "FF69B4"];
      let rgbacolor = [
        "255, 180, 0",
        "0,255,255",
        "255,105,180",
        "255,105,180",
      ];
      this.chart.series = this.val.map((item, index) => {
        item.value.forEach((it,i) => {
          this.val[index].value[i] = it.toFixed(1)
        });
        return {
          type: "line",
          name: `${item.name}`,
          label: {
            show: true,
            position: "top",
            fontSize: 10,
          },
          areaStyle: {
            color: {
              //线性渐变
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: `rgba(${rgbacolor[index]},1)`, // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: `rgba(${rgbacolor[index]},0.1)`, // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          color: color[index],
          data: item.value,
        };
      });
      let myChart = this.$echarts.init(document.getElementById("sensorData"));
      myChart.setOption(this.chart);
    },
  },
};
</script>
<style lang="scss" scoped>
.sensorData {
  width: 100%;
  height: 100%;
  color: rgb(255, 180, 0);
}
</style>
