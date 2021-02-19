//api.js
import service from './request'

//获取所有菜单
const getUserMenu = data => {
  return service({
    url: '/bus/user/getMenuTree',
    method: 'get',
    data
  })
};

/**
 * 报表功能接口
 * 售票营收统计报表
 */
const ticketRevenueReport = data => {
  return service({
    url: '/query/ticketRevenueReport',
    method: 'get',
    data
  })
}

/**
 * 报表功能接口
 * 售票营收统计报表数据总数
 */
const ticketRevenueReportConut = data => {
  return service({
    url: '/query/ticketRevenueReportNum',
    method: 'get',
    data
  })
}

/**
 * 报表功能接口
 * 线路营收统计报表
 */
const lineRevenueReportform = data => {
  return service({
    url: '/query/lineRevenueReportform',
    method: 'get',
    data
  })
}

/**
 * 报表功能接口
 * 线路营收统计报表数据总数
 */
const lineRevenueReportformCount = data => {
  return service({
    url: '/query/lineRevenueReportformNum',
    method: 'get',
    data
  })
}

/**
 * 报表功能接口
 * 线路营收报表弹窗功能
 * 公里数 票价 估计时间
 */
const popupTpe = data => {
  return service({
    url: '/query/lineRevenueReportform/Pop/Tpe',
    method: 'get',
    data
  })
}

/**
 * 报表功能接口
 * 线路营收报表弹窗功能
 * 平均发班数
 */
const popupVf = data => {
  return service({
    url: '/query/lineRevenueReportform/Pop/Vf',
    method: 'get',
    data
  })
}

/**
 * 报表功能接口
 * 线路营收报表弹窗功能
 * 营收走势分析
 */
const popupRevenueTrend = data => {
  return service({
    url: '/query/lineRevenueReportform/pop/revenueTrend',
    method: 'get',
    data
  })
}

/**
 * 报表功能接口
 * 线路营收报表弹窗功能
 * 实载率走势
 */
const popupServiceLoadTrend = data => {
  return service({
    url: '/query/lineRevenueReportform/pop/serviceLoadTrend',
    method: 'get',
    data
  })
}

/**
 * 数据大屏
 * 交旅业财一体化平台
 * 当月累计营收
 */
const dataBoardTotalIncome = data => {
  return service({
    url: '/query/dataBoardTotalIncome',
    method: 'get',
    data
  })
}

/**
 * 数据大屏
 * 交旅业财一体化平台
 * 当月累计售票量
 */
const dataBoardTicketNumber = data => {
  return service({
    url: '/query/dataBoardTicketNumber',
    method: 'get',
    data
  })
}

/**
 * 数据大屏
 * 交旅业财一体化平台
 * 当月累计发班数
 */
const dataBoardVehicleFrequency = data => {
  return service({
    url: '/query/vehicleFrequency',
    method: 'get',
    data
  })
}

/**
 * 数据大屏
 * 交旅业财一体化平台
 * 当月客运周转量
 */
const dataBoardPassengerPersonKilometres = data => {
  return service({
    url: '/query/passengerPersonKilometres',
    method: 'get',
    data
  })
}

/**
 * 数据大屏
 * 交旅业财一体化平台
 * 当月线路累计营收排行
 */
const dataBoardLineTotal = data => {
  return service({
    url: '/query/lineTotal',
    method: 'get',
    data
  })
}

/**
 * 数据大屏
 * 交旅业财一体化平台
 * 当月累计发班量排行
 */
const dataBoardLineCirculation = data => {
  return service({
    url: '/query/lineCirculation',
    method: 'get',
    data
  })
}

/**
 * 模板配置
 * 新增
 */
const insertConfig = data => {
  {
    return service({
      url: '/config/insert',
      method: 'post',
      data
    })
  }
}

/**
 * 模板配置
 * 查询
 */
const selectConfig = data => {
  {
    return service({
      url: '/config/select',
      method: 'post',
      data
    })
  }
}

/**
 * 模板配置
 * 修改
 */
const updateConfig = data => {
  {
    return service({
      url: '/config/update',
      method: 'post',
      data
    })
  }
}

/**
 * 模板配置
 * 删除
 */
const deleteConfig = data => {
  {
    return service({
      url: '/config/delete',
      method: 'post',
      data
    })
  }
}



export {
  ticketRevenueReport,
  ticketRevenueReportConut,
  lineRevenueReportform,
  lineRevenueReportformCount,
  popupTpe,
  popupVf,
  popupRevenueTrend,
  popupServiceLoadTrend,
  dataBoardTotalIncome,
  dataBoardTicketNumber,
  dataBoardVehicleFrequency,
  dataBoardPassengerPersonKilometres,
  dataBoardLineTotal,
  dataBoardLineCirculation,
  insertConfig,
  selectConfig,
  updateConfig,
  deleteConfig
}
