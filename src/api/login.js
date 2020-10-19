import request from '../utils/request'  // 引入封装好的axios 请求

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {   // 参数
      username: username,
      password: password
    }
  })
}


