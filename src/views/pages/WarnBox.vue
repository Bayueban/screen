<!-- 报警看板 -->
<template>
  <IndexBox :title="title">
    <div class="table_body flex">
      <el-table
        :data="val"
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column align="center" prop="sensor_name" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="value" label="报警值">
        </el-table-column>
        <el-table-column align="center" prop="pose" label="位置">
        </el-table-column>
        <!-- <el-table-column align="center" prop="time" label="时间">
        </el-table-column> -->
        <el-table-column align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.state === '报警'" class="warn_">报警</div>
            <div v-if="scope.row.state === '维修'" class="service_">
              维修
            </div>
            <div v-if="scope.row.state === '正常'" class="normal_">
              正常
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="times" label="次数">
        </el-table-column>
      </el-table>
    </div>
  </IndexBox>
</template>
<script>
import IndexBox from "@/components/IndexBox.vue";
const tableRowClassNameVal = ({ row, rowIndex }) => {
  if (rowIndex % 2 == 0) {
    return "warning-row";
  } else {
    return "success-row";
  }
};
export default {
  props: {
    title: {
      type: String,
      default: () => ""
    },
    val: {
      type: Array,
      default: () => []
    }
  },
  components: { IndexBox },

  data() {
    return {
      tableRowClassName: tableRowClassNameVal
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.table_body {
  .el-table .warning-row {
    background: rgba(7, 10, 29, 0.4);
  }
  .el-table th.el-table__cell {
    background: rgb(7, 10, 29);
    font-family: SourceHanSansCN-Normal;
    font-size: 12px;
    color: #1be9e9;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.4);
  }
  .el-table__header,
  .el-table__body {
    width: auto !important;
  }
  .el-table .success-row {
    background: transparent;
  }
  .el-table::before {
    display: none;
  }
  .el-table__body {
    .cell {
      font-family: SourceHanSansCN-Normal;
      font-size: 12px;
      color: #ffffff;
      white-space: nowrap;
    }
  }

  .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }
  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: 0px;
  }
}
</style>
<style lang="scss" scoped>
.warn_,
.service_,
.normal_ {
  font-family: SourceHanSansCN-Normal;
  font-size: 12px;
}
.warn_ {
  color: #f60840;
}
.service_ {
  color: #f6c418;
}
.normal_ {
  color: #1be9e9;
}
</style>
