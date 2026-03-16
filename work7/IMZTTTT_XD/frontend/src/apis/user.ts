// 导入request.js请求工具
import service from '../utils/request'
export const userRegisterSevrvice = (registerData:any) => {
    return service.post('/register', {
        username: registerData.username,
        password: registerData.password
    });
}
export const userLoginSevrvice = (loginData:any) => {
    return service.post('/login', {
        username: loginData.username,
        password: loginData.password
    });
}
export const userInfoSevrvice = (token:string) => {
    return service.request({
        method: "get",
        url: '/user'
    })
}

export const userAllSevrvice = () => {
    return service.request({
        method: "get",
        url: '/users'
    })
}