const express = require('express')
const { mock, error } = require('../utils')
const router = express.Router()

/**
 * 获取用户信息
 */
router.get('/:id?', (req, res, next) => {
  // 从请求中获取信息
  const { id } = req.params
  const { username, page = 1, pageSize = 20} = req.query
  // 应该响应的结果
  let result = undefined
  // 用户基本信息数据结构
   const userinfo = {
    'id|+1': (page - 1) * pageSize + 1,
    username: '@last(6,10)',
    nickname: '@ctitle(3,7)',
    avatar: '@img(64x64,@color,avatar)',
    birthday: '@date()',
    'sex|1': [0, 1],
    email: '@email',
    phone: '@string("number",11)',
    address: '@county(true)',
    createdAt: '@datetime()'
  }
  if (!id && !username) { // 未传递 id 与 username，分页查询
    result = mock({
      [`list|${pageSize}`]: [userinfo],
      total: `@integer(${page*pageSize},376)`,
      page,
      pageSize
    })
  } else if (id) { // 根据 id 查询
    result = mock({
      ...userinfo,
      id
    })
  } else { // 根据用户名查找
    result = mock({
      ...userinfo,
      username,
      id: '@integer(1,20)'
    })
  }
  res.json(result)
})

/**
 * 添加用户信息
 */
router.post('/', (req, res, next) => {
  // 获取请求主体中传递的添加信息
  const {
    username,
    password,
    nickname,
    avatar,
    birthday,
    sex,
    email,
    phone,
    address,
  } = req.body
  // 如果用户或密码不存在，则返回错误信息
  if (!username || !password) {
    res.json(error(-1, '用户名和密码不能为空'))
    return
  }
  // mock 添加成功的数据
  const result = mock({
    username,
    nickname,
    avatar,
    birthday,
    sex,
    email,
    phone,
    address,
    id: '@integer(100,200)',
    createdAt: '@now()'
  })
  res.json(result)
})

/**
 * 修改用户信息
 */
router.put('/', (req, res, next) => {
  // 获取请求主体中传递的修改信息
  const {
    id,
    username,
    nickname,
    avatar,
    birthday,
    sex,
    email,
    phone,
    address,
  } = req.body
  // 响应修改后的数据
  res.json(mock({
    id,
    username,
    nickname,
    avatar,
    birthday,
    sex,
    email,
    phone,
    address,
    createdAt: '@datetime',
    updatedAt: '@now'
  }))
})

/**
 * 删除用户信息
 */
router.delete('/:id', (req, res, next) => {
  // 获取待删除用户的 id
  const { id } = req.params
  // mock 删除成功的数据
  res.json(mock({
    id,
    success: true
  }))
})

module.exports = router
