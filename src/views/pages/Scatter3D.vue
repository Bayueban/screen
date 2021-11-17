<!-- 3d散点图 -->
<template>
  <div class="scatter_3D_html">
    <div id="scatter3D" class="scatter3D"></div>
  </div>
</template>
<script>
import { getPointCloud } from "@/utils/api";

export default {
  components: {},
  data() {
    return {
      chartOption: {
        xAxis3D: {
          name: "x轴",
          type: "value",
          max: 5,
          min: -5,
          interval: 2,
          axisTick: {
            lineStyle: {
              color: "red",
              opcity: 0,
            },
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis3D: {
          show: false,
          name: "y轴",
          type: "value",
          max: 5,
          min: -5,
          interval: 2,
          axisTick: {
            lineStyle: {
              color: "red",
            },
          },
          axisLabel: {
            show: false,
          },
        },
        zAxis3D: {
          show: false,
          name: "z轴",
          type: "value",
          max: 5,
          min: -5,
          interval: 2,
          axisTick: {
            lineStyle: {
              color: "red",
            },
          },
          axisLabel: {
            show: false,
          },
        },
        grid3D: {
          show:false,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisPointer: {
            lineStyle: {
              color: "#ffbd67",
            },
          },
          axisLabel: {
            show: false,
          },
          boxHeight: 50,
          boxWidth: 100,
          boxDepth: 100,
        },
        animation: true,
        series: [
          {
            type: "scatter3D",
            dimensions: ["x轴", "y轴", "z轴", "fiber", "name"],
            data: [],
            symbolSize: 2,
            itemStyle: {
              borderWidth: 1,
              borderColor: "rgba(255,255,255,1)",
              normal: {
                shadowBlur: 15,
                shadowColor: "rgba(120, 36, 50, 1)",
                shadowOffsetY: 5,
                color: function (e) {
                  return e.data[3];
                },
              },
            },
            lable: {
              distance: 5,
            },
            // force:{
            //   layoutAnimation:false
            // },
            emphasis: {
              itemStyle: {
                color: "#fff",
              },
            },
          },
        ],
      },
      btn: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getData();
    this.loop();
  },
  destroyed() {
    clearInterval(this.btn);
  },
  methods: {
    loop() {
      this.btn = setInterval(this.getData, 300);
    },
    getData() {
      let myChart = this.$echarts.init(document.getElementById("scatter3D"));
      getPointCloud().then((res) => {
        this.chartOption.series[0].data = res;
        myChart.setOption(this.chartOption);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.scatter_3D_html {
  width: 100%;
  height: 100%;
  background: #000;
}
#scatter3D {
  width: 100%;
  height: 100%;
}
</style>
