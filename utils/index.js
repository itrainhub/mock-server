// 引入模块
const Mock = require('mockjs')
// 生成成功数据的结构，data 是各不同
// 接口实际向前端返回的数据对象内容
exports.mock = data => {
  const result = Mock.mock({
    ...data
  })
  return {
    res_code: 0,
    res_error: '',
    res_body: {
      ...result
    }
  }
}
// 生成失败数据的结构，接收错误码和错误
// 消息参数
exports.error = (errno, errmsg) => {
  return {
    res_code: errno,
    res_error: errmsg,
    res_body: {}
  }
}
