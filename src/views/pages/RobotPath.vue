<!-- 机器人路径 -->
<template>
  <div class="robotPath">
    <div id="map" class="map"></div>
  </div>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { OSM, TileDebug } from "ol/source";
import ImageLayer from "ol/layer/Image";
// import ImageWMS from "ol/source/ImageWMS";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import { MultiPoint, Point } from "ol/geom";
import { getVectorContext } from "ol/render";
// import XYZ from "ol/source/XYZ";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
// import GeoJSON from "ol/format/GeoJSON";
import LineString from "ol/geom/LineString";
import Projection from "ol/proj/Projection";
import Static from "ol/source/ImageStatic";
// import { defaults } from "ol/interaction";
import { getCenter } from "ol/extent";

// import { Modify } from "ol/interaction";
import { getMapInfo } from "@/utils/api";

export default {
  data() {
    return {
      map: null,
      //
      pathLayer: new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      }),
      pathSource: new VectorSource(),
      //
      overPathLayer: new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      }),
      overPathSource: new VectorSource(),
      //
      robotLayer: new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      }),
      robotSource: new VectorSource(),

      // 地图
      pic: null,
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
    // 请求数据
    getData() {
      getMapInfo().then((res) => {
        if (this.pic === null) {
          this.pic = res.map.pic;
          this.creatMap(res.map);
        } else {
          if (this.pic !== res.map.pic) {
            this.creatMap(res.map);
          }
          this.robotSource.removeFeature(this.robot);
        }
        this.creatPath(res.path, res.map.resolution);
        this.creatOverPath(res.plan, res.map.resolution);
        this.creatRobot(res.robot, res.map.resolution);
      });
    },
    // 轮询
    loop() {
      this.btn = setInterval(this.getData, 300);
    },

    // 构建地图
    creatMap(data) {
      let extent = [0, 0, data.width, data.height];
      this.map = new Map({
        layers: [
          new ImageLayer({
            source: new Static({
              url: data.pic,
              projection: new Projection({
                code: "EPSG:3857",
                units: "pixels",
                extent: extent,
              }),
              imageExtent: extent,
            }),
          }),
          this.pathLayer,
          this.overPathLayer,
          this.robotLayer,
        ],
        target: "map",
        view: new View({
          projection: new Projection({
            code: "EPSG:3857",
            units: "pixels",
            extent: extent,
          }),
          center: [data.width / 2, data.height / 2],
          zoom: 1,
        }),
        controls: [],
      });
      this.robotLayer.setSource(this.robotSource);
    },

    // 构建路网
    creatPath(data, resolution) {
      let blineArr = null;
      data.forEach((item) => {
        let ctrlArr = [];
        for (let key in item) {
          ctrlArr.push({
            x: item[key].x / resolution,
            y: item[key].y / resolution,
          });
        }
        blineArr = this.createBezierCurvePoints(3, ctrlArr);
      });
      let style = this.createLineStyle("#ff2723", 2, "round", "round");
      let f = this.createLine(
        "bezier_" + Math.random(),
        "bezier",
        blineArr,
        style
      );
      this.pathSource.addFeature(f);
      this.pathLayer.setSource(this.pathSource);
      // this.map.addLayer(this.pathLayer);
    },
    // 构建路途
    creatOverPath(data, resolution) {
      let dashArr = data.map((it) => {
        let arr = [];
        arr.push(it.x / resolution);
        arr.push(it.y / resolution);
        return arr;
      });
      let style = this.createLineDashStyle("#2f2723", 2);
      let f = this.createLine("dash" + Math.random(), "dash", dashArr, style);
      this.overPathSource.addFeature(f);
      this.overPathLayer.setSource(this.overPathSource);
      // this.map.addLayer(this.overPathLayer);
    },
    // 构建机器人
    creatRobot(data, resolution) {
      let x = data.x / resolution;
      let y = data.y / resolution;
      let rot = Number(data.yaw);
      this.robot = new Feature({
        geometry: new Point([x, y]),
        name: "robot",
      });
      this.robot.setStyle(
        new Style({
          image: new Icon({
            anchor: [8, 10],
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            src: "icon/robot-s.png",
            rotation: Math.PI / rot,
          }),
        })
      );
      this.robotSource.addFeatures([this.robot]);
    },
    // 创建线
    createLine(lid, lx, arrCoordinate, style) {
      let f = new Feature({
        geometry: new LineString(arrCoordinate),
        id: lid, //线的唯一标识
        lx: lx, //类型，区别于其它Features
      });
      f.setId(lid); //不能删除
      f.setStyle(style);
      return f;
    },
    // 实线样式
    createLineStyle(color, width, linecap, linejoin) {
      return new Style({
        stroke: new Stroke({
          color: color, //颜色
          width: width, //宽度
          lineCap: linecap,
          lineJoin: linejoin,
        }),
      });
    },
    // 虚线样式
    createLineDashStyle(color, width) {
      return new Style({
        stroke: new Stroke({
          color: color, //颜色
          width: width, //宽度
          // lineCap: linecap,
          // lineJoin: linejoin,
          lineDash: [5, 5, 5, 5],
        }),
      });
    },
    // 生成贝塞尔曲线插值点 n {number} 控制点数量 arrPoints {array} 控制点坐标集合
    createBezierCurvePoints(n, arrPoints) {
      var Ptx = 0;
      var Pty = 0;
      var arrbline = [];
      for (var t = 0; t <= 1; t += 0.01) {
        Ptx = 0;
        Pty = 0;
        for (var i = 0; i <= n; i++) {
          Ptx += this.fooBezier(n, i, t, arrPoints[i].x);
          Pty += this.fooBezier(n, i, t, arrPoints[i].y);
        }
        arrbline.push([Ptx, Pty]);
      }
      // arrbline[arrbline.length - 1][0] = arrPoints[arrPoints.length - 1].x;
      // arrbline[arrbline.length - 1][1] = arrPoints[arrPoints.length - 1].y;
      arrbline.push([
        arrPoints[arrPoints.length - 1].x,
        arrPoints[arrPoints.length - 1].y,
      ]);
      return arrbline;
    },
    //阶乘
    factorial(num) {
      if (num <= 1) {
        return 1;
      } else {
        return num * this.factorial(num - 1);
      }
    },
    // 公式计算
    fooBezier(n, i, t, d) {
      let a = this.factorial(n) / (this.factorial(i) * this.factorial(n - i));
      let b = Math.pow(1 - t, n - i);
      let c = Math.pow(t, i);
      let r = a * b * c * d;
      return r;
    },
  },
};
</script>

<style lang="scss" scoped>
.robotPath {
  // background: pink;
  width: 100%;
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
    // height: 400px;
  }
}
</style>
