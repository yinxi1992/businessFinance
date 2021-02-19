<template>
  <div class="ledger">
    <div class="statement">
      <div class="btnBox">
        <div class="right_con">
          <!-- <p class="keyword">车牌号:</p> -->
          <keyWordSreach :hintStr="hintStr" @sendKeyWord="sendKeyWord" />
        </div>

        <div class="left_con">
          <el-button type="primary" class="btn" @click="toAdd">新增</el-button>
        </div>
      </div>
      <div class="main_con">
        <div class="bottom">
          <el-table :data="tableData" stripe height="75vh">
            <el-table-column prop="vehicleplateno" label="车牌号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column
              prop="settlementtime"
              label="结算时间"
              width="160"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column prop="settlementamount" label="结算金额" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column
              prop="auditreplacementticket"
              label="稽查补票"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="agencyamount"
              label="业务代理费"
              :show-overflow-tooltip="true"
              width="100"
            ></el-table-column>
            <el-table-column prop="auditfee" label="稽查扣费" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="stationservicefee" label="站务费" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="routineinspectionfee" label="例检费" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="cleaningfee" label="清洁费" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="shippingfee" label="货运费" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="parkingfee" label="停车费" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="overtimepay" label="加班费" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="totalcount" label="扣费合计" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
        <page :total="total" @getPageData="getPageData"></page>
      </div>
      <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="50%">
        <addLedger @closedia="closedia" :editData="editData" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import keyWordSreach from "@/components/common/keyWordSreach/keyWordSreach";
import page from "@/components/common/pagination/pagination.vue";
import addLedger from "./addLedger";
import { getStandingbook } from "@/api/lib/api";
// import { formatDate } from "@/assets/js/utils.js";

export default {
  components: {
    page,
    addLedger,
    keyWordSreach
  },

  created() {
    this.getListFn();
  },

  data() {
    return {
      tableData: [],
      editData: {},
      title: "",
      dialogVisible: false,
      hintStr: "请输入车牌号查找",
      pageSize: 10,
      currentPage: 1,
      total: 0,
      keyword: null
    };
  },

  methods: {
    sendKeyWord(v) {
      this.keyword = v;
      this.getListFn();
    },

    toAdd() {
      this.title = "新增台账";
      this.editData = {};
      this.dialogVisible = true;
    },

    closedia(val) {
      if (val == 1) {
        this.getListFn();
      }
      this.dialogVisible = false;
    },

    getPageData(val) {
      let { pageSize, currentPage } = val;
      this.currentPage = currentPage;
      this.pageSize = pageSize;
      this.getListFn();
    },

    getListFn() {
      const _this = this;
      let data = {
        pageSize: _this.pageSize,
        currentPage: _this.currentPage,
        vehiclePlateNo: _this.keyword
      };
      getStandingbook(data).then(res => {
        if (res && res.data) {
          _this.tableData = res.data.list || [];
          // if (!!_this.tableData.length) {
          //   _this.tableData.forEach(item => {
          //     item.settlementTime = formatDate(item.settlementTime);
          //   });
          // }
        }
        _this.total = res.data.total || 0;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ledger {
  height: 100%;
  padding: (15rem/16);
  .statement {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background: url("/static/images/bac.png") no-repeat;
    flex-direction: column;
    padding: (15rem/16);
    .btnBox {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      justify-content: space-between;
      margin-bottom: (15rem/16);
      .right_con {
        display: flex;
        flex-wrap: nowrap;
        .keyword {
          line-height: $norm-line-height;
          display: inline-block;
          margin-right: (10rem/16);
        }
      }
    }
    .main_con {
      flex: 1;
      display: flex;
      flex-direction: column;
      .bottom {
        flex: 1;
      }
      .pagination {
        // padding: (15rem/16) 0;
        justify-content: flex-end;
      }
    }
    td,
    th {
      text-align: center !important;
    }
  }
}
</style>
