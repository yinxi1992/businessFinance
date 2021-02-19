<template>
  <el-upload
    ref="upload"
    class="upload"
    :multiple="false"
    :auto-upload="true"
    :on-error="uploadFalse"
    :on-success="uploadSuccess"
    :before-upload="beforeUpload"
    :action="uploadUrl()"
    :headers="getHeader()"
  >
    <el-button type="primary" class="btn">导入</el-button>
  </el-upload>
</template>

<script>
import service from "@/api/lib/request";
import axios from "axios";
import config from "@/api/static/config";

export default {
  props: {
    url: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      formData: ""
    };
  },

  methods: {
    getHeader() {
      return {
        Authorization: sessionStorage.getItem("token")
      };
    },

    beforeUpload(file) {
      let checkMsg = this.check_file(file);
      if (checkMsg != "") {
        this.$message.error(checkMsg);
        return;
      }
    },

    check_file(file) {
      let msg = "";
      let extension = file.name.split(".")[1] === "xls";
      let extension2 = file.name.split(".")[1] === "xlsx";
      let isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        msg = "只能上传xls或xlsx文件";
      }
      if (!isLt2M) {
        msg = "上传模板大小不能超过 10MB!";
      }
      return msg;
    },

    /* 上传接口 */
    uploadUrl() {
      return config.proUrl + this.url;
    },

    /* 添加文件成功时触发函数 上传到后台 */
    uploadSuccess(response, file, fileList) {
      if (response.code == 0) {
        this.$message.success("文件导入成功");
        this.$emit("uploadSuccess");
      } else {
        this.$message.error("文件导入失败");
      }
    },

    uploadFalse(response, file, fileList) {
      this.$message.error("文件上传失败！");
    }
  }
};
</script>

<style>
</style>
