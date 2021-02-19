<template>
  <div class="serchForm">
    <el-row :gutter="20">
      <el-col :span="16" class="item_content">
        <el-input :placeholder="hintStr" v-model.trim="form.keyWord"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button type="info" @click="toReset">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    hintStr: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      form: {
        keyWord: ""
      }
    };
  },

  methods: {
    submitForm() {
      // if (this.form.keyWord == "") {
      //   this.$message({
      //     message: "请先输入查询关键字",
      //     type: "warning"
      //   });
      //   return;
      // }
      this.$emit("sendKeyWord", this.form.keyWord);
    },

    // changeInput(v) {
    //   this.$emit("sendKeyWord", this.form.keyWord);
    // },

    toReset() {
      this.form.keyWord = null;
      this.$emit("sendKeyWord", this.form.keyWord);
    }
  },

  mounted() {},

  destroyed() {}
};
</script>

<style lang="scss">
.serchForm {
  display: inline-block;
  .el-form--inline .el-form-item__content {
    display: flex;
  }
  .lable {
    min-width: (50rem/16);
  }
  .item_content {
    display: flex;
    align-items: center;
  }
  input {
    width: (260rem/16);
  }
}
</style>
