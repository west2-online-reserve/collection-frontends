<script  lang='ts' setup>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue'
import { FormInstance } from 'element-plus';
import { userStore } from '../stores/userStore';
import { ElMessage } from 'element-plus'
const router = useRouter()
const authStore = userStore();

//控制注册与登录表单的显示， 默认显示注册
const ruleFormRef = ref<FormInstance>()

// 定义表单校验规则
const rules = reactive({
    username: [
        { required: true, message: "必填" },
        { min: 6, message: '用户格式无效', trigger: 'blur' }
    ],
    email: [
        { required: true, message: "必填" },
        {
            pattern:
                /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式无效', trigger: 'blur'
        }

    ],
    password: [
        { required: true, message: "必填" },
        {
            pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@#!%^*?&+-]{8,}/,
            message: '密码格式无效', trigger: 'blur'
        }
    ]
})

//定义注册信息数据类型
const registerData = reactive({
    username: '',
    email: '',
    password: ''
})

// 用来跳转登录和注册
const isRegister = ref(false);

// 一些消息提示
const Registsuccess = () => {
    ElMessage({
        message: '注册成功',
        type: 'success',
    });
}
const Loginsuccess = () => {
    ElMessage({
        message: '登陆成功',
        type: 'success',
    })
}
const Loginerror = () => {
    ElMessage.error('用户用户名或密码错误')
}

// 用户注册，校验是否符合规则，然后提交信息到pinia
const register = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            authStore.addRegisterData(registerData);
            Registsuccess();
            isRegister.value = false;
        } else {
            return false;
        }
    });
};
// 用户登录，并校对登录信息是否正确，然后储存到pinia
const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            const user = authStore.logincheck(
                registerData.username,
                registerData.password,
            );
            if (user) {
                Loginsuccess();
                authStore.setLoginData(registerData);//为什么邮箱的值传不过去啊啊啊
                router.push('/')
            } else {
                Loginerror();
                return false
            }
        } else {
            return false;
        }
    });
};
// 清空注册数据
const clearRegisterData = () => {
    registerData.username = ''
    registerData.email = ''
    registerData.password = ''
}

</script>

<template>
    <div class="bg">
        <el-container>
            <el-main>
                <!-- 注册表单 -->
                <el-form ref="ruleFormRef" autocomplete="off" v-if="isRegister" label-position=top :model="registerData"
                    :rules="rules">
                    <span class="title">Nice to meet you</span>
                    <br>
                    <span class="detail">Please enter your details</span>
                    <br>
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="用户名长度不小于6位" v-model="registerData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input placeholder="邮箱格式需正确" v-model="registerData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="密码长度不小于8位，同时包含大小写" v-model="registerData.password"
                            type="password"></el-input>
                    </el-form-item>
                    <!-- 注册按钮 -->
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space @click="register(ruleFormRef)">
                            注册
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                            已经注册账号？点此登录
                        </el-link>
                    </el-form-item>
                </el-form>
                <!-- 登录表单 -->
                <el-form ref="ruleFormRef" autocomplete="off" v-else label-position=top label-width="100px"
                    style="max-width: 460px" :model="registerData" :rules="rules">
                    <span class="title">Welcome Back</span>
                    <br>
                    <span class="detail">Please enter your details</span>
                    <br>
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="请输入用户名" v-model="registerData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input name="password" type="password" placeholder="请输入密码"
                            v-model="registerData.password"></el-input>
                    </el-form-item>
                    <el-form-item class="flex">
                        <div class="flex">
                            <el-checkbox>30天内免登录</el-checkbox>
                            <el-link type="primary" :underline="false">忘记密码</el-link>
                        </div>
                    </el-form-item>
                    <!-- 登录按钮 -->
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space
                            @click="login(ruleFormRef)">登录</el-button>
                    </el-form-item>
                    <el-form-item style="justify-content: center;">
                        <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                            还没有注册账号？点击注册
                        </el-link>
                    </el-form-item>
                </el-form>
            </el-main>
            <img src="../assets/621114a7474f50daf3d8f5c0002f23d8 1.png" alt="">
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
/* 样式 */
.bg {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #DDEBDB;
}

.el-container {
    flex: none;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: #D1E2CF;
    width: 1300px;
}

.el-main {
    flex: none;
    display: flex;
    justify-content: center;
    background: #FAFCF9;
    width: 670px;
    height: 83vh;
    box-sizing: border-box;
}

img {
    position: relative;
    left: 52px;
    top: -21px;
}

.el-form {
    margin-top: 140px;
    width: 320px;
    text-align: center;
}

.button {
    width: 320px;
    height: 34px;
    border-radius: 5px;
    background: #456442;
}

.title {
    color: #426440;
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.detail {
    color: #3D565A;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.el-form-item {
    margin-top: 20px;
}

.flex {
    width: 320px;
    display: flex;
    justify-content: space-between;
}

.el-input {
    border-radius: 5px;
    border: 2px solid #426440;
    background: #FEFFFF;
    box-shadow: none;
    --el-input-bg-color: none;
    --el-input-hover-border-color: none;
    --el-input-focus-border-color: none;
}
</style>
