import { service } from "@/utils/request";

// 定义请求和响应的类型
interface LoginData {
    username: string;
    password: string;
}
interface LoginResponse { 
    data: {
        code: number;
        msg: string;
        username: string;
        token: string;
    }
 }

// 使用箭头函数​
export const Login = (data: LoginData): Promise<LoginResponse> => {
    return service.request<LoginResponse>({
        method: "post",
        url: "http://127.0.0.1:4523/m2/3974587-0-default/145387110",
        data
    }) 
};
