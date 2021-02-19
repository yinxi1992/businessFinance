import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  base: 'bus',
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: resolve => require(['@/pages/login/login.vue'], resolve),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/catalog',
    component: resolve => require(['@/pages/catalog/catalog.vue'], resolve),
    meta: {
      title: '目录'
    }
  },
  {
    path: '/bigScreen',
    component: resolve => require(['@/pages/bigScreen/bigScreen.vue'], resolve),
    meta: {
      title: '数据大屏'
    }
  },
  {
    path: '/carPassengerBusiness',
    component: resolve => require(['@/pages/bigScreen/carPassengerBusiness/carPassengerBusiness.vue'], resolve),
    meta: {
      title: "汽车客运业务数据大屏"
    }
  },
  {
    path: '/groupUseScreen',
    component: resolve => require(['@/pages/bigScreen/groupUseScreen/groupUseScreen.vue'], resolve),
    meta: {
      title: "集团用大屏"
    }
  },
  {
    path: '/index',
    component: resolve => require(['@/components/Home.vue'], resolve),
    name: "综合报表查询",
    meta: {
      title: '综合报表查询',
    },
    children: [
      {
        path: '/vehicleTransportForm',
        component: resolve => require(['@/pages/reportFormManagement/index.vue'], resolve),
        meta: {
          title: '汽车客运业务'
        },
        children: [
          {
            path: '/',
            redirect: '/ticketRevenueForm'
          },
          {
            path: '/ticketRevenueForm',
            component: resolve => require(['@/pages/reportFormManagement/vehicleTransportForm/ticketRevenueForm.vue'], resolve),
            meta: {
              title: '售票营收统计报表',
              subtitle: 'Statistical report of ticket sales',
              parent: 'vehicleTransportForm',
            },
          },
          {
            path: '/lineRevenueForm',
            component: resolve => require(['@/pages/reportFormManagement/vehicleTransportForm/lineRevenueForm.vue'], resolve),
            meta: {
              title: '线路营收统计报表',
              subtitle: '',
              parent: 'vehicleTransportForm',
            }
          },
          {
            path: '/vehicleRevenueForm',
            component: resolve => require(['@/pages/reportFormManagement/vehicleTransportForm/vehicleRevenueForm.vue'], resolve),
            meta: {
              title: '车辆收支统计报表',
              subtitle: '',
              parent: 'vehicleTransportForm',
            },
          },
        ]
      },
    ]
  },
  {
    path: '/paramsSetting',
    component: resolve => require(['@/pages/paramsSetting/paramsSetting.vue'], resolve),
    meta: {
      title: "系统参数设定"
    }
  }
  ]


})


//路由拦截
router.beforeEach((to, from, next) => {
  // var token = sessionStorage.getItem('token');
  // //如果没登录,都导向登录页
  // if (!token) {
  //   if (to.path !== '/login') {
  //     next()
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  next();
  if (to.path)
    window.sessionStorage.setItem("routeName", to.path.split("/")[1]);
})

export default router
