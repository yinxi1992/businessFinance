<template>
  <border-image-box class="sidebar">
    <el-tabs type="card">
      <el-tab-pane>
        <span slot="label" class="tab"><i class="el-icon-s-fold"></i></span>
        <el-menu
          :collapse-transition="true"
          :default-active="activeIndex"
          @select="handleSelect"
          class="el-menu-vertical-demo"
          unique-opened
        >
          <template v-for="(item, index) in menuList">
            <el-submenu :index="item.index" :key="index" v-if="!item.isContent">
              <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <img :src="item.icon" alt srcset class="icon" />
                <span slot="title">{{ item.name }}</span>
              </template>
              <tree-menu :data="item.list"></tree-menu>
            </el-submenu>

            <el-menu-item :index="item.index" :key="index" v-else>
              <img src="../../static/images/icon.png" alt srcset class="icon" />
              {{ item.name }}
            </el-menu-item>
          </template>
        </el-menu>
      </el-tab-pane>
      <el-tab-pane label="消息中心">
        <span slot="label" class="tab"><i class="el-icon-star-off"></i></span>
        消息中心
      </el-tab-pane>
    </el-tabs>
  </border-image-box>
</template>

<script>
import treeMenu from "./treeMenu.vue";
import borderImageBox from "@/components/common/borderImageBox/borderImageBox.vue";
import passenger_transport from "../../static/images/passenger_transport.png";
import auto_repair from "../../static/images/auto_repair.png";
export default {
  components: {
    treeMenu,
    borderImageBox
  },
  data() {
    return {
      activeIndex: "ticketRevenueForm",
      menuList: []
    };
  },
  created() {
    this.activeIndex = this.$route.path.replace("/", "");
  },
  mounted() {
    if (this.$route.meta.parent == "vehicleTransportForm") {
      this.menuList = [
        {
          name: "汽车客运业务",
          index: "vehicleTransportForm",
          isContent: false,
          icon: passenger_transport,
          list: [
            {
              name: "售票营收统计报表",
              index: "ticketRevenueForm",
              isContent: true,
              icon: "",
              list: []
            },
            {
              name: "线路营收统计报表",
              index: "lineRevenueForm",
              isContent: true,
              icon: "",
              list: []
            },
            {
              name: "车辆收支统计报表",
              index: "vehicleRevenueForm",
              isContent: true,
              icon: "",
              list: []
            }
          ]
        },

        {
          name: "汽车修理业务",
          index: "vehicleRepairForm",
          isContent: false,
          icon: auto_repair,
          list: []
        }
      ];
    } else if (this.$route.meta.parent == "ledger") {
      this.menuList = [
        {
          name: "台账功能",
          index: "ledger",
          isContent: true,
          icon: "",
          list: []
        }
      ];
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      this.$store.dispatch("addActiveIndex", key);
      this.$router.push({ path: `/${key}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  box-sizing: border-box;
  width: (280rem/16);
  min-width: (280rem/16);
  margin-right: 1vh;
  .icon {
    width: (22rem/16);
    height: (20rem/16);
    margin-right: 1rem;
  }
  .el-tabs {
    &::before {
      display: block;
      height: 6px;
      width: 100%;
      content: "";
      background: url("/static/images/Segmentation_graph.png");
      margin-bottom: 1rem;
    }
    .tab {
      font-size: 1.25rem;
    }
  }
  .el-menu {
    height: 100%;
  }
}
</style>
