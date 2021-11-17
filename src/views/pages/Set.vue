<!-- 传感器数据 -->
<template>
  <div id="setBox">
    <div id="setBody">
      <p class="title">传感器预警值设置</p>
      <div class="list">
        <div class="list_item" v-for="item in listData" :key="item.name">
          <span class="title">{{ item.name }}：</span>
          <div>
            <span>最大值↑</span>
            <input type="text" v-model="item.upper" class="inp" maxlength="4" />
          </div>
          <div>
            <span>最小值↓</span>
            <input type="text" v-model="item.lower" class="inp" maxlength="4" />
          </div>
        </div>
      </div>
      <div class="btn_row">
        <button @click="ok" class="btn">确定</button>
        <button @click="cancel" class="btn">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {SensorThresholdSet} from "@/utils/api";
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
  data() {
    return {
      distroy: false,
      listData: {
        temperature: {
          id: 0,
          name: "温度传感器",
          upper: 0,
          lower: 0,
        },
        humidity: {
          id: 1,
          name: "湿度度传感器",
          upper: 0,
          lower: 0,
        },
        four_in_one: {
          id: 2,
          name: "四合一气体传感器",
          upper: 0,
          lower: 0,
        },
        noise: {
          id: 3,
          name: "噪音传感器",
          upper: 0,
          lower: 0,
        },
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    ok() {
      this.listData;
      let data = this.listData;
      SensorThresholdSet(data).then((res) => {
        this.$emit("cancelSet", false);
      });
    },
    cancel() {
      this.$emit("cancelSet", false);
    },
  },
};
</script>
<style lang="scss" scoped>
#setBox {
  width: 460px;
  height: 320px;
  z-index: 10;
  position: absolute;
  right: 200px;
  background-size: 100% 100%;
  background-image: url("../../assets/box_bg.png");
  display: flex;
  justify-content: center;
  align-items: center;

  #setBody {
    padding: 10px;
    background: rgba(12, 41, 51, 0.842);
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .title {
      color: #1be9e9;
      font-family: SourceHanSansCN-Normal;
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
      margin: 10px 0;
      letter-spacing: 2px;
    }
    .list {
      display: flex;
      flex-direction: column;
      .list_item {
        display: flex;
        align-items: center;
        width: 100%;
        div {
          width: 32%;
          span {
            color: #e96d1b;
            margin: 0 5px;
            font-size: 8px;
          }
        }
        .title {
          color: #1be9e9;
          font-size: 12px;
          width: 140px;
          text-align: start;
        }
        .inp {
          width: 35%;
          background: rgba(4, 8, 27, 0.842);
          color: white;
        }
      }
    }
    .btn_row {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      height: 40px;
      .btn {
        border: 1px solid #1be9e9;
        color: #1be9e9;
        background: none;
        width: 60px;
        height: 30px;
        padding: 5px;
        border-radius: 4px;
      }
      .btn:hover {
        background: #1be9e959;
        cursor: pointer;
      }
    }
  }
}
</style>
