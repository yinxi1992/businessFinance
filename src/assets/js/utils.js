/**
 * 公共方法
 */

// 获取hash地址参数
function getQueryString() {
  var obg = {},
    a = "";
  (a = window.location.search.substr(1)) ||
    (a = window.location.hash.split("?")[1]);
  a.split(/&/g).forEach(function (item) {
    obg[(item = item.split("="))[0]] = item[1];
  });
  return obg;
}

//根据数组对象中某字段排序
function sortByArrObj(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}

//自动补0
function PrefixZero(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

//获取当前时间,true:yyyy-MM-dd hh:mm:ss,false:yyyy-MM-dd
function getNowDate(boolean = true) {
  const now = new Date();
  return formatDate(now);
}

//获取当前月份
function getCurrentMonth(delimiter = "-") {
  const now = new Date();
  const year = now.getFullYear();
  const month = PrefixZero(now.getMonth() + 1, 2);
  switch (delimiter) {
    case '-':
      return `${year}-${month}`;
    case '/':
      return `${year}/${month}`;
    case 'zh':
      return `${year}年${month}月`;
    default:
      return `${year}-${month}`;
  }
}

//格式化时间,true:yyyy-MM-dd hh:mm:ss,false:yyyy-MM-dd
function formatDate(time, boolean = true, delimiter = "-") {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = PrefixZero(date.getMonth() + 1, 2);
  const day = PrefixZero(date.getDate(), 2);
  if (boolean) {
    const hour = PrefixZero(date.getHours(), 2);
    const minute = PrefixZero(date.getMinutes(), 2);
    const second = PrefixZero(date.getSeconds(), 2);

    switch (delimiter) {
      case '-':
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      case '/':
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
      case 'zh':
        return `${year}年${month}月${day}日 ${hour}点${minute}分${second}秒`;
      default:
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

  } else {
    switch (delimiter) {
      case '-':
        return `${year}-${month}-${day}`;
      case '/':
        return `${year}/${month}/${day}`;
      case 'zh':
        return `${year}年${month}月${day}日`;
    }
  }
}

//修改数字小数点的精度
function changeNumberAccuracy(num, accuracy) {
  if (num == 0 || num == null || num == "") {
    return 0;
  } else {
    return Math.ceil(num * Math.pow(10, accuracy)) / Math.pow(10, accuracy);
  }
}

export {
  getQueryString,
  sortByArrObj,
  PrefixZero,
  getNowDate,
  formatDate,
  changeNumberAccuracy,
  getCurrentMonth,
}
