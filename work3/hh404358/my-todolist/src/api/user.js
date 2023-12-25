// 导入request.js请求工具
import request from '@/utils/requst.js'
// 提供调用注册接口的函数
export const userRegisterSevrvice=(registerData)=>{
    // 借助于urlsearchParams完成传递
    const params=new URISearchParams()
    for(let key in registerData){
        params.append(key,registerData[key]);
    }
    request.post('/user/register',registerData);
}