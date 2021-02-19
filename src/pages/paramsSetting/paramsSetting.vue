<template>
  <div class="paramsSetting">
    <Header />
    <div class="paramsTable">
      <el-table :data="tableData" border>
        <el-table-column
          label="模板名称"
          prop="tmplates_name"
          width="120"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="展示名称" prop="display_name"></el-table-column>
        <el-table-column
          label="模板描述"
          prop="description"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="接口url"
          prop="endpoint"
          width="150"
        ></el-table-column>
        <el-table-column
          label="最大获取的条数"
          prop="maxrows"
          width="150"
        ></el-table-column>
        <el-table-column
          label="csv格式导出"
          prop="csv_download"
          width="120"
        ></el-table-column>
        <el-table-column
          label="当前模板启用状态"
          prop="status"
          width="140"
        ></el-table-column>
        <el-table-column
          label="查询条件"
          prop="query_filter"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="查询种类" prop="query_type"></el-table-column>
        <el-table-column
          label="数据库种类"
          prop="query_data_source"
          width="100"
        ></el-table-column>
        <el-table-column
          label="查询语句"
          prop="query_statement"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="权限信息" prop="acl_columns"></el-table-column>
        <el-table-column
          label="创建时间"
          prop="created_date"
          width="200"
        ></el-table-column>
        <el-table-column label="创建人" prop="created_by"></el-table-column>
        <el-table-column label="更新时间" prop="updated_date"></el-table-column>
        <el-table-column label="更新人" prop="updated_by"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onRowClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="onRowDeleteDia(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" class="addModel" @click="onAddmodel"
        >增加模板</el-button
      >
      <div class="dialog_chart">
        <div class="pieBox">
          <charts :option="revenueOption" :id="id1" />
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      center
    >
      <p class="deleteMessage">确定删除该模板配置记录吗?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onRowDelete">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="isAdd ? '新增模板配置' : '修改模板配置'"
      :visible.sync="dialogVisible"
      width="50%"
      @close="onDiaClose"
    >
      <el-form :inline="true" :model="form" label-width="140px">
        <el-form-item label="模板名称">
          <el-input v-model="form.tmplates_name" :disabled="!isAdd"></el-input>
        </el-form-item>
        <el-form-item label="展示名称">
          <el-input v-model="form.display_name"></el-input>
        </el-form-item>
        <el-form-item label="接口url">
          <el-input v-model="form.endpoint" :disabled="!isAdd"></el-input>
        </el-form-item>
        <el-form-item label="最大获取的条数">
          <el-input v-model="form.maxrows"></el-input>
        </el-form-item>
        <el-form-item label="csv格式导出">
          <el-input v-model="form.csv_download"></el-input>
        </el-form-item>
        <el-form-item label="当前模板启用状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" label-width="150px">
        <el-form-item label="查询条件" class="lineSpace">
          <el-input
            type="textarea"
            v-model="form.query_filter"
            :autosize="{ minRows: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="查询语句">
          <el-input
            type="textarea"
            v-model="form.query_statement"
            :autosize="{ minRows: 2 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" label-width="140px">
        <el-form-item label="查询种类">
          <el-input v-model="form.query_type"></el-input>
        </el-form-item>
        <el-form-item label="数据库种类">
          <el-input v-model="form.query_data_source"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" label-width="140px">
        <el-form-item label="模板描述">
          <el-input
            type="textarea"
            v-model="form.description"
            :autosize="{ minRows: 2 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" label-width="140px">
        <el-form-item label="创建时间" v-if="!isAdd">
          <el-date-picker
            v-model="form.created_date"
            type="datetime"
            placeholder="选择日期时间"
            :disabled="!isAdd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.created_by" :disabled="!isAdd"></el-input>
        </el-form-item>
        <!-- <el-form-item label="更新时间" v-if="!isAdd">
          <el-date-picker
            v-model="form.updated_date"
            type="datetime"
            placeholder="选择更新时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>-->
        <el-form-item label="更新人" v-if="!isAdd">
          <el-input v-model="form.updated_by"></el-input>
        </el-form-item>
        <el-form-item label="权限信息">
          <el-input v-model="form.acl_columns"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onDiaClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import charts from "@/components/common/charts/charts.vue";

import { formatDate } from "@/assets/js/utils.js";

import {
  insertConfig,
  selectConfig,
  updateConfig,
  deleteConfig
} from "@/api/lib/api.js";

export default {
  name: "paramsSetting",
  components: {
    Header,
    charts
  },
  data() {
    return {
      revenueOption: {
        title: {
          text: "营收走势分析",
          left: "1%",
          textStyle: {
            color: "#1EC5EE",
            fontSize: 14,
            fontWeight: "bold"
          },
          top: 10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#2AC9FD", "#76FBC0"],
        legend: {
          data: [
            { name: "始发站-终点站", textStyle: { color: "#abb7c2" } },
            { name: "省内同类班线平均值", textStyle: { color: "#abb7c2" } }
          ],
          bottom: 0
          // padding: [20, 0, 20, 0]
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "始发站-终点站",
            "始发站-终点站",
            "始发站-终点站",
            "始发站-终点站",
            "始发站-终点站"
          ],
          axisLine: {
            lineStyle: {
              color: "#01ADFF"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#A6A6A6" //更改坐标轴文字颜色
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#ABB7C2" //更改坐标轴文字颜色
            }
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: ["#ABB7C2"]
            }
          }
        },
        series: [
          {
            name: "始发站-终点站",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [0, 0, 0, 0, 0]
          },
          {
            name: "省内同类班线平均值",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [0, 0, 0, 0, 0]
          }
        ]
      },
      loadOption: {
        title: {
          text: "实载率走势分析",
          left: "1%",
          textStyle: {
            color: "#1EC5EE",
            fontSize: 14,
            fontWeight: "bold"
          },
          top: 10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#2AC9FD"],
        legend: {
          data: [{ name: "始发站-终点站", textStyle: { color: "#abb7c2" } }],
          bottom: 0
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "始发站-终点站",
            "始发站-终点站",
            "始发站-终点站",
            "始发站-终点站",
            "始发站-终点站"
          ],
          axisLine: {
            lineStyle: {
              color: "#737373"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#A6A6A6" //更改坐标轴文字颜色
            }
          },
          boundaryGap: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#A6A6A6" //更改坐标轴文字颜色
            }
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: ["#404040"]
            }
          }
        },
        series: [
          {
            name: "始发站-终点站",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [0, 0, 0, 0, 0]
          }
        ]
      },
      id1: "line1",
      id2: "line2",
      tableData: [],
      dialogVisible: false,
      form: {
        id: "",
        tmplates_name: "",
        display_name: "",
        description: "",
        endpoint: "",
        maxrows: "",
        csv_download: "",
        status: "",
        query_filter: "",
        query_type: "",
        query_data_source: "",
        query_statement: "",
        acl_columns: "",
        created_date: "",
        created_by: "",
        updated_date: "",
        updated_by: ""
      },
      isAdd: false,
      deleteDialogVisible: false,
      deleteObj: {
        index: "",
        obj: {}
      }
    };
  },
  methods: {
    onRowClick(row) {
      this.isAdd = false;
      this.form = { ...row };
      this.form.updated_date = formatDate(new Date());
      this.dialogVisible = true;
    },
    onDiaClose() {
      this.dialogVisible = false;
      this.form = {
        id: "",
        tmplates_name: "",
        display_name: "",
        description: "",
        endpoint: "",
        maxrows: "",
        csv_download: "",
        status: "",
        query_filter: "",
        query_type: "",
        query_data_source: "",
        query_statement: "",
        acl_columns: "",
        created_date: "",
        created_by: "",
        updated_date: "",
        updated_by: ""
      };
    },
    onSubmit() {
      let data = this.form;
      if (this.isAdd) {
        data.updated_by = data.created_by;
        data.created_date = formatDate(new Date());
        data.updated_date = data.created_date;
        // 新增模板配置
        insertConfig(data).then(res => {
          if (res.statusCode == 200) {
            this.$message.success("新增模板成功!");
          } else {
            this.$message.error("新增模板失败!");
          }
        });
      } else {
        data.updated_date = formatDate(new Date());
        // 修改模板配置
        updateConfig(data).then(res => {
          if (res.statusCode == 200) {
            this.$message.success("修改模板成功!");
          } else {
            this.$message.error("修改模板失败!");
          }
        });
      }
      this.onDiaClose();
    },
    onAddmodel() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    onRowDeleteDia(index, row) {
      this.deleteObj.index = index;
      this.deleteObj.obj = { ...row };
      this.deleteDialogVisible = true;
    },
    onRowDelete() {
      // 删除模板配置
      deleteConfig({ id: this.deleteObj.index }).then(res => {
        if (res.statusCode == 200) {
          this.selectConfig();
        } else {
          this.$meesage.error("删除失败!");
        }
      });

      this.deleteDialogVisible = false;
      this.deleteObj = {
        index: "",
        obj: {}
      };
    },
    selectConfig() {
      selectConfig().then(res => {
        // 查询模板配置记录
        if (res.statusCode == 200) {
          this.tableData = [...res.data];
        } else {
          this.tableData = [];
        }
      });
    }
  },
  created() {
    // this.selectConfig();
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.dialog_chart {
  height: 50vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  .pieBox {
    flex: 1;

    &:first-of-type {
      border-bottom: 1px solid #394859;
    }
  }
}

.paramsSetting {
  height: 100vh;
  padding: 1vh;
  box-sizing: border-box;
  background: url("/static/images/bac.png") center no-repeat;
  background-size: cover;
  .lineSpace {
    margin: 0.5vh 0;
  }
}
.paramsTable {
  margin: 1vh 0;
  .addModel {
    margin: 1vh 0;
  }
}
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: (200rem/16);
}

.deleteMessage {
  margin: 2vh 0;
}
</style>
