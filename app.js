// 引入 express 模块
const express = require('express')
// 引入路由模块(路由中间件)
const usersRouter = require('./mock/users')
// 创建 Express 应用
const app = express()
// 对请求数据进行处理
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 使用路由中间件
app.use('/api/v1/users', usersRouter)
// 启动服务器，监听 3000 端口
const server = app.listen(3000, 'localhost', () => {
  const { address, port } = server.address()
  console.log(`Server running at http://${address}:${port}`)
})
