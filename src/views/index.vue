<!-- 首页 -->
<template>
  <div class="index_html">
    <div class="header_body flex">{{ title }}</div>
    <div class="button_site flex" @click="set">
      <img src="@/assets/site.png" alt="" />设置
    </div>
    <Set v-if="setBtn === true" class="setBox" @cancelSet="set"></Set>

    <div class="index_body flex">
      <div class="index_body_left">
        <RobotState :title="'机器人状态看板'" :val="robotState"></RobotState>
        <RobotType :title="'机器人状态'" :val="robotState"></RobotType>
        <RobotTask :title="'任务&机械臂状态'" :val="robotTask"></RobotTask>
      </div>
      <div class="index_body_content">
        <div
          :class="['index_view_box', fullScreenType ? 'index_view_box_' : '']"
          @dblclick="fullScreen"
        >
          <RobotPath v-if="allTitle === '机器人路径图'"> </RobotPath>
          <Scatter3D v-if="allTitle === '3D点云图'"></Scatter3D>
          <VideoView v-if="allTitle === '人体识别跟踪'"></VideoView>
        </div>
        <div class="robot_box flex">
          <RobotMileage
            :title="'机器人运行里数'"
            :val="robotMileage"
          ></RobotMileage>
          <SensorData :title="'传感器数据'" :val="sensorData"></SensorData>
        </div>
      </div>
      <div class="index_body_right">
        <div class="index_body_right_top flex">
          <div
            :class="['box1', box1border ? 'box_border' : '']"
            @click="cutover('人体识别跟踪')"
          >
            <div class="box_title">人体识别跟踪</div>
            <div
              class="box_body flex"
              :style="{ backgroundImage: `url(${boxBg1})` }"
            >
              <img class="box_video" src="../assets/video.png" alt="" />
            </div>
          </div>
          <div
            :class="['box2', box2border ? 'box_border' : '']"
            @click="cutover('3D点云图')"
          >
            <div class="box_title">3D点云图</div>
            <div
              class="box_body flex"
              :style="{ backgroundImage: `url(${boxBg2})` }"
            ></div>
          </div>
          <div
            :class="['box3', box3border ? 'box_border' : '']"
            @click="cutover('机器人路径图')"
          >
            <div class="box_title">机器人路径图</div>
            <div
              class="box_body flex"
              :style="{ backgroundImage: `url(${boxBg3})` }"
            ></div>
          </div>
        </div>
        <DataBox :title="'数据实时看板'" :val="LogInfo"></DataBox>
        <WarnBox :title="'传感器看板'" :val="sensorAlarm"></WarnBox>
      </div>
    </div>
  </div>
</template>
<script>
import {
  // 统计信息
  getStatisticsInfo,
  // 系统信息
  getSystemInfo,
  // 日志
  // LogInfo,
  // SensorThresholdSet,
  // 传感器信息查询
  getSensorAlarm,
} from "@/utils/api";
import RobotState from "./pages/RobotState.vue"; //机器人状态看板
import RobotTask from "./pages/RobotTask.vue"; //任务&机械臂状态
import RobotType from "./pages/RobotType.vue"; //机器人状态
import RobotMileage from "./pages/RobotMileage.vue"; //机器人里程
import SensorData from "./pages/SensorData.vue"; //传感器数据
import DataBox from "./pages/DataBox.vue"; //数据实时看板
import WarnBox from "./pages/WarnBox.vue"; //报警看板
import Scatter3D from "./pages/Scatter3D.vue"; //3d散点图
import VideoView from "./pages/VideoView.vue"; //视频
import RobotPath from "./pages/RobotPath.vue"; //人体识别追踪
import Set from "./pages/Set.vue"; //设置

export default {
  props: {},
  components: {
    RobotTask,
    RobotState,
    RobotType,
    RobotMileage,
    SensorData,
    DataBox,
    WarnBox,
    Scatter3D,
    VideoView,
    RobotPath,
    Set,
  },
  data() {
    return {
      pose: {},
      big_bg: "",
      bigBgStyle: {
        width: "",
        height: "",
      },
      pointStyle: {
        left: "",
        bottom: "",
      },
      fullScreenType: false,
      allTitle: "人体识别跟踪",
      boxBg1: require("../assets/box1.png"),
      boxBg2: require("../assets/box2.png"),
      boxBg3: require("../assets/box3.png"),
      title: "5G复合机器人系统状态看板",
      box1border: "",
      box2border: "",
      box3border: "",
      robotState: {},
      robotTask: {},
      robotMileage: [],
      sensorData: [],
      LogInfo: [],
      sensorAlarm: [],
      // 设置
      setBtn: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.start();
  },
  methods: {
    start() {
      setInterval(() => {
        let pro = Promise.all([getSystemInfo(), getStatisticsInfo()]);
        pro.then((data) => {
          this.robotTask = {
            name: data[0].task.name,
            process: data[0].task.process.toFixed(1),
            mileage: data[0].task.mileage.toFixed(1),
            r6Voltage:
              data[0].arm.r6_current.toFixed(1) +
              "/" +
              data[0].arm.r6_voltage.toFixed(1),
            r5Voltage:
              data[0].arm.r5_current.toFixed(1) +
              "/" +
              data[0].arm.r5_voltage.toFixed(1),
            r4Voltage:
              data[0].arm.r4_current.toFixed(1) +
              "/" +
              data[0].arm.r4_voltage.toFixed(1),
          };
          this.robot = {
            xAxis: data[0].robot.x.toFixed(1),
            yAxis: data[0].robot.y.toFixed(1),
            yaw: data[0].robot.yaw.toFixed(1),
          };
          this.robotState = {
            // coordinate: {
            xAxis: data[0].robot.x.toFixed(1),
            yAxis: data[0].robot.y.toFixed(1),
            yaw: data[0].robot.yaw.toFixed(1),
            // },
            is_charging: data[0].robot.is_charging ? "充电" : "放电",
            state: data[0].robot.state,
            error: data[0].robot.error,
            battery: parseInt(data[0].robot.battery),
            workState: data[0].task.state,
            total_mileage: data[0].task.odometer.toFixed(1),

            offline_ratio: data[1].time.offline.toFixed(1),
            work_ratio: data[1].time.work.toFixed(1),
            idle_ratio: data[1].time.idle.toFixed(1),
          };
          this.robotMileage = data[1].odometer;
          this.sensorData = data[1].sensor;
        });
        getSensorAlarm().then((res) => {
          res.forEach((item, index) => {
            res[index].value = item.value.toFixed(1);
          });
          this.sensorAlarm = res;
        });
      }, 500);
    },

    // 切换全屏
    fullScreen() {
      this.fullScreenType = !this.fullScreenType;
      let title = this.allTitle;
      this.allTitle = "";
      this.$nextTick(() => {
        this.allTitle = title;
      });
    },

    cutover(title) {
      if (title === "人体识别跟踪") {
        this.box1border = "box_border";
      } else {
        this.box1border = "";
      }
      if (title === "3D点云图") {
        this.box2border = "box_border";
      } else {
        this.box2border = "";
      }
      if (title === "机器人路径图") {
        this.box3border = "box_border";
      } else {
        this.box3border = "";
      }
      this.allTitle = title;
      if (title === "机器人路径图") {
        this.$nextTick(() => {
          this.big_bg = this.pose.map_pic;
          this.pointStyle.left = `${this.pose.x / this.pose.map_resolution}px`;
          this.pointStyle.bottom = `${
            this.pose.x / this.pose.map_resolution
          }px`;
          var img = new Image();
          img.src = this.big_bg;
          if (img.complete) {
            // console.log(img.width, img.height);
          } else {
            img.onload = () => {
              this.bigBgStyle.width = `${img.width}px`;
              this.bigBgStyle.height = `${img.height}px`;
              img.onload = null;
            };
          }
        });
      }
    },

    // 设置
    set() {
      this.setBtn = !this.setBtn;
    },
  },
};
</script>
<style lang="scss" scoped>
.index_html {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0px 10px;
  padding-bottom: 40px;
}
.header_body {
  width: 1722px;
  height: 80px;
  font-family: SourceHanSansCN-Medium;
  font-size: 34px;
  color: #1be9e9;
  padding-top: 6px;
  padding-left: 617px;
  background-image: url("../assets/header_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 20px;
}
.button_site {
  width: 83px;
  height: 32px;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #1be9e9;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/button_bg.png");
  background-size: 100% 100%;
  position: absolute;
  right: 80px;
  top: 50px;
  img {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
  cursor: pointer;
}
.index_body {
  .index_body_content {
    position: relative;
    margin: 0px 15px;
    .index_view_box {
      width: 922px;
      height: 594px;
      background-image: url("../assets/html_bg.png");
      background-size: 100% 100%;
      margin-top: 18px;
      overflow: auto;
    }
    .index_view_box_ {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 2;
      margin: 0px;
    }
    .robot_box {
      position: absolute;
      bottom: 0;
      justify-content: space-between;
    }
  }

  .index_body_right_top {
    width: 452px;
    height: 288px;
    margin-top: 18px;
    justify-content: space-between;
    flex-wrap: wrap;
    .box1,
    .box2,
    .box3 {
      width: calc(50% - 10px);
      height: calc(50% - 10px);
      padding: 11px;
      // background-image: url("../assets/box_bg.png");
      background-size: 100% 100%;
      position: relative;
      .box_title {
        font-family: SourceHanSansCN-Normal;
        font-size: 14px;
        color: #1be9e9;
        position: relative;
        z-index: 1;
      }
    }
    .box_body {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      justify-content: center;
      align-items: center;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      .box_video {
        width: 30px;
        height: 30px;
      }
    }
  }
}

.big_bg {
  align-items: flex-end;
}

.setBox {
}

.box_border {
  border-color: rgba(217, 255, 255, 0.4);
  // border-color:rgba(27,233,233,0.4);
  border-style: groove;
  border-width: 5px;
  background-image: url("../assets/box_bg.png");
}
</style>
