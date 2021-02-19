<template>
  <div class="addRole">
    <el-row class="driver-manage-box">
      <el-col :span="24" class="table-box">
        <div class="main_con">
          <div class="bottom">
            <el-form
              :model="form"
              status-icon
              :rules="rules"
              label-position="right"
              ref="form"
              label-width="7vw"
            >
              <div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="车牌号:" prop="vehiclePlateNo">
                      <el-input v-model.trim="form.vehiclePlateNo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      label="结算金额:"
                      prop="settlementAmount"
                      :rules="[{type:'number',message: '结算金额必须为数字'}]"
                    >
                      <el-input v-model.number.trim="form.settlementAmount"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="稽查补票:"
                      prop="auditReplacementTicket"
                      :rules="[{type:'number',message: '稽查补票必须为数字'}]"
                    >
                      <el-input v-model.number.trim="form.auditReplacementTicket"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      label="例检费:"
                      prop="routineInspectionFee"
                      :rules="[{type:'number',message: '例检费必须为数字'}]"
                    >
                      <el-input v-model.number.trim="form.routineInspectionFee"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="站务费:"
                      prop="stationServiceFee"
                      :rules="[{type:'number',message: '站务费必须为数字'}]"
                    >
                      <el-input v-model.number.trim="form.stationServiceFee"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      label="清洁费:"
                      prop="cleaningFee"
                      :rules="[{type:'number',message: '清洁费必须为数字'}]"
                    >
                      <el-input v-model.number.trim="form.cleaningFee"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="货运费:"
                      prop="shippingFee"
                      :rules="[{type:'number',message: '货运费必须为数字'}]"
                    >
                      <el-input v-model.number.trim="form.shippingFee"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      label="停车费:"
                      prop="parkingFee"
                      :rules="[{type:'number',message: '停车费必须为数字'}]"
                    >
                      <el-input v-model.number.trim="form.parkingFee"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="加班费:"
                      prop="overtimePay"
                      :rules="[{type:'number',message: '加班费必须为数字'}]"
                    >
                      <el-input v-model.number.trim="form.overtimePay"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <el-form-item class="form-btn">
                <el-button v-if="!btnShow" type="primary" @click="save">保存</el-button>
                <el-button v-if="btnShow" type="primary" @click="save">修改</el-button>
                <el-button type="primary" @click="cancel" plain>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addDeduction } from "@/api/lib/api";
import rules from "@/assets/js/rules.js";
import { getNowDate, changeNumberAccuracy } from "@/assets/js/utils.js";
export default {
  props: {
    editData: {
      type: Object
    }
  },

  data() {
    return {
      tree: [],
      btnShow: false,
      form: {
        vehiclePlateNo: null, // 车牌号
        settlementTime: null, // 结算日期
        settlementAmount: null, // 结算金额
        auditReplacementTicket: null, //稽查补票
        auditFee: null, // 稽查扣费
        agencyAmount: null, // 业务代理费
        stationServiceFee: null, // 站务费
        routineInspectionFee: null, // 例检费
        cleaningFee: null, // 清洁费
        shippingFee: null, // 货运费
        parkingFee: null, // 停车费
        overtimePay: null, // 加班费
        totalCount: null // 合计扣费
      },
      updateMenuIds: [],
      addMenuIds: [],
      deleteMenuIds: [],
      readMenuIds: [],
      showTreeMenuIds: [],
      menuIds: [],
      rules: {
        roleName: rules.textDataForNormal
      },
      mainMenu: "",
      filterText: ""
    };
  },

  mounted() {
    // this.getAllMenu();
  },

  methods: {
    save() {
      this.form.settlementTime = getNowDate();
      // 将表单中需要类型为number的转换为number
      this.form.settlementAmount *= 1;
      this.form.auditReplacementTicket *= 1;
      this.form.agencyAmount *= 1;
      this.form.stationServiceFee *= 1;
      this.form.routineInspectionFee *= 1;
      this.form.cleaningFee *= 1;
      this.form.shippingFee *= 1;
      this.form.parkingFee *= 1;
      this.form.overtimePay *= 1;
      this.form.totalCount *= 1;
      this.form.auditFee *= 1;
      let _this = this;
      _this.$refs.form.validate(valid => {
        if (valid) {
          addDeduction(_this.form)
            .then(res => {
              if (res.code == 0) {
                _this.$message.success("操作成功");
                _this.$emit("closedia", 1);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    cancel() {
      this.$emit("closedia", 0);
    }

    // 获取树选中节点的id，并重组
    // idsTostring(ids, checked) {
    //   let _this = this;
    //   let arr = [];
    //   _this.form[ids] = [];
    //   _this.$refs[checked].$refs.tree.getCheckedNodes().forEach(item => {
    //     _this.form[ids].push(item.id);
    //     _this.showTreeMenuIds.push(item.id);
    //     if (item.parentId != 0) {
    //       arr.push(item.parentId);
    //     }
    //   });
    //   _this.form.showTreeMenuIds = _this.showTreeMenuIds.join();
    //   _this.form[ids] = [...new Set([..._this.form[ids], ...arr])].join();
    // },

    // // 根据id查询角色详情
    // getRoleItem(id) {
    //   let self = this;
    //   getRoleItem({ id: id })
    //     .then(res => {
    //       self.form = res.data;
    //       self.addMenuIds = self.form.addMenuIds.split(",");
    //       self.deleteMenuIds = self.form.deleteMenuIds.split(",");
    //       self.updateMenuIds = self.form.updateMenuIds.split(",");
    //       self.readMenuIds = self.form.readMenuIds.split(",");
    //       self.menuIds = self.form.showTreeMenuIds.split(",");
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },

    // getAllMenu() {
    //   getMenuTree({}).then(res => {
    //     if (res) {
    //       this.tree = res.data;
    //       let arr = [];
    //       this.tree.forEach(item => {
    //         arr.push(item.id);
    //       });
    //       this.mainMenu = arr.join();
    //       if (this.editData.id) {
    //         this.getRoleItem(this.editData.id);
    //         this.btnShow = true;
    //       }
    //     }
    //   });
    // }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    // 计算结算金额
    "form.settlementAmount": function(val) {
      this.form.agencyAmount = changeNumberAccuracy(val * 0.09, 2);
    },
    // 计算稽查扣费
    "form.auditReplacementTicket": function(val) {
      this.form.auditFee = changeNumberAccuracy(val * 0.3, 2);
    },
    // 将计算出的扣费合计传入form中存储
    feeTotal(val) {
      this.form.totalCount = this.feeTotal;
    }
  },

  computed: {
    // 计算合计扣费
    feeTotal() {
      return changeNumberAccuracy(
        this.form.agencyAmount * 1 +
          this.form.auditFee * 1 +
          this.form.stationServiceFee * 1 +
          this.form.routineInspectionFee * 1 +
          this.form.cleaningFee * 1 +
          this.form.shippingFee * 1 +
          this.form.parkingFee * 1 +
          this.form.overtimePay * 1,
        2
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.addRole {
  .role-require {
    height: 20vh;
    overflow-y: scroll;
  }
  .el-menu-vertical {
    border: 3px solid rgb(84, 92, 100);
    border-radius: (10rem/16);
    z-index: 100;
  }
  .el-menu-vertical i {
    color: #777777;
  }
  .menuItem {
    height: (40rem/16);
    line-height: (40rem/16);
    background-color: #545c64;
    font-size: 1.2rem;
  }
  .menuItem:hover {
    background-color: #409eff;
  }

  .el-tree {
    .custom-tree-node {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-right: (20rem/16);
    }
    .el-tree-node__content {
      line-height: (36rem/16) !important;
      height: (36rem/16);
    }
  }

  .btnGroup {
    margin-top: (30rem/16);
  }

  .btnBox {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .role-require .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: (4rem/16);
  }
}
.form-btn {
  text-align: right;
  margin-bottom: 0;
  border-top: 1px solid rgba(139, 151, 177, 0.4);
  padding-top: (20rem/16);
  margin-left: (-20rem/16);
  margin-right: (-20rem/16);
  padding-right: (20rem/16);
}
</style>

