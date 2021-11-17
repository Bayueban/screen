<!-- 数据看板 -->
<template>
  <IndexBox :title="title">
    <div class="date_body flex">
      <div class="start_time flex">
        <div class="time_val flex">
          {{ startTime }}
          <i class="time_val_icon el-icon-arrow-down"></i>
        </div>
        <el-date-picker
          v-model="startTime"
          type="date"
          :clearable="false"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="timeStart"
          @change="getData"
        >
        </el-date-picker>
      </div>
      <div class="end_time flex">
        <div class="time_val flex">
          {{ endTime }}<i class="time_val_icon el-icon-arrow-down"></i>
        </div>
        <el-date-picker
          v-model="endTime"
          type="date"
          :clearable="false"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="timeEnd"
          @change="getData"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="data_kanban_lists">
      <div
        class="data_kanban_list ellipsis"
        v-for="(item, index) in data"
        :key="index"
      >
        <p>{{ item.log }}</p>
        <p>{{ item.time }}</p>
      </div>
    </div>
    <div class="data_kan_ban_page flex">
      <el-pagination
        :page-size="pageSize"
        background
        small
        layout="total,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </IndexBox>
</template>
<script>
import IndexBox from "@/components/IndexBox.vue";
import { LogInfo } from "@/utils/api";
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
      startTime: "",
      endTime: "",
      pageSize: 1,
      total: 1,
      data: null,
      timeStart: {
        disabledDate: (time) => {
          return time.getTime() >= new Date(this.endTime).getTime();
        },
      },
      timeEnd: {
        disabledDate: (time) => {
          return time.getTime() <= new Date(this.startTime).getTime();
        },
      },
      btn: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.changeTime();
    this.getData();
    this.loop();
  },
  destroyed() {
    clearInterval(this.btn);
  },
  methods: {
    getData() {
      let post = {
        begin_time: this.startTime,
        end_time: this.endTime,
      };
      LogInfo(post).then((res) => {
        this.data = res;
      });
    },
    loop() {
      this.btn = setInterval(() => {
        this.getData();
      }, 3000);
    },
    changeTime() {
      let today = new Date().toLocaleDateString().split("/").join("-");
      this.startTime = today;
      this.endTime = today;
    },
  },
};
</script>
<style lang="scss">
// 修改 element 选择时间样式
.date_body {
  .start_time,
  .end_time {
    input,
    .el-input__prefix {
      opacity: 0;
      cursor: pointer;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 120px;
    }
  }
}
// 修改 element 分页样式
.data_kan_ban_page {
  .el-pagination__total {
    font-family: SourceHanSansCN-Normal;
    font-size: 15px;
    color: #ffffff;
  }
  .btn-prev:disabled,
  .el-pagination--small .btn-prev,
  .el-pagination--small .btn-next,
  .el-pagination.is-background .el-pager li {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    color: #ffffff;
    border: solid 1px transparent;
    font-family: SourceHanSansCN-Normal;
    .el-icon .el-icon-arrow-left {
      font-size: 15px;
      color: #ffffff;
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    border-radius: 5px;
    border: solid 1px #1be9e9;
    background: #00eaff5e;
    font-family: SourceHanSansCN-Normal;
    color: #1be9e9;
  }
}
</style>
<style lang="scss" scoped>
.date_body {
  position: absolute;
  top: -20px;
  width: 100%;
  justify-content: space-between;
  .start_time,
  .end_time {
    justify-content: center;
    width: 120px;
    .time_val {
      position: absolute;
      font-family: SourceHanSansCN-Normal;
      font-size: 14px;
      color: #1be9e9;
      align-items: center;
      .time_val_icon {
        margin-left: 5px;
      }
    }
  }
}
.data_kanban_lists {
  .data_kanban_list {
    font-family: SourceHanSansCN-Normal;
    font-size: 15px;
    color: #ffffff;
    margin-top: 18px;
    padding: 0px 28px;
    display: flex;
    justify-content: space-between;
  }
}
.data_kan_ban_page {
  position: absolute;
  bottom: 0px;
  width: 100%;
  left: 0px;
  justify-content: flex-end;
  padding-right: 23px;
}
</style>
