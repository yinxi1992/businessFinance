<template>
  <border-image-box class="pagination" :height="'50px'">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageObj.currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </border-image-box>
</template>

<script>
import borderImageBox from "@/components/common/borderImageBox/borderImageBox.vue";
export default {
  props: ["total"],
  components: {
    borderImageBox
  },
  data() {
    return {
      pageObj: {
        pageSize: 10,
        currentPage: 1
      }
    };
  },

  methods: {
    handleCurrentChange(val) {
      this.pageObj.currentPage = val;
      this.$emit("getPageData", this.pageObj);
    }
  }
};
</script>

<style lang='scss' scoped>
div.pagination {
  margin-top: 1vh;
  text-align: center;
  flex: 0;
}
</style>
