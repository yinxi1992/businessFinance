<template>
  <div class="exportExcle" :class="paddingTop">
    <download-excel
      class="btn btn-default"
      :data="data"
      :fields="fields"
      :otherData="otherData"
      worksheet="My Worksheet"
      :name="filename"
    >
      <el-button type="primary" :size="size">{{name}}</el-button>
    </download-excel>
  </div>
</template>
<script>
import JsonExcel from "vue-json-excel";
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    fields: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: "small"
    },
    filename: {
      type: String,
      default: "导出文件.xls"
    },
    otherData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    paddingTop: {
      type: String,
      default: "paddingTop4"
    },
    name: {
      type: String,
      default: "导出"
    }
  },
  components: {
    downloadExcel: JsonExcel
  },
  mounted() {
    if (this.otherData && this.data.length > 0) {
      Object.assign(this.data[0], this.otherData);
    }
  },
  data() {
    return {
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  }
};
</script>

<style lang="scss">
.exportExcle {
  display: inline-block;
}
.paddingTop3 {
  padding-top: 3px;
}
.paddingTop0 {
  padding-top: 0;
}
.paddingTop4 {
  padding-top: 4px;
}
</style>
