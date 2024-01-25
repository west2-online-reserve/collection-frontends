<script  lang='ts' setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { type FormInstance } from 'element-plus'
import { useUserStore } from '../stores/user'
import { ElContainer, ElForm, ElMain, ElFormItem, ElInput, ElButton, ElLink, ElCheckbox } from 'element-plus'
const router = useRouter()
const store = useUserStore();

const ruleFormRef = ref<FormInstance>()
// 定义注册表单校验规则：
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

//注册信息
const registerData = reactive({
    username: '',
    email: '',
    password: ''
})

// 用来跳转登录和注册
const isRegister = ref(false);
// 清空注册数据
const clearRegisterData = () => {
    registerData.username = '';
    registerData.email = '';
    registerData.password = '';
}
const toRegister = () => {
    isRegister.value = true;
    clearRegisterData();
}
const toLogin = () => {
    isRegister.value = false;
    clearRegisterData();
}

// 用户注册
const register = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            store.register(registerData);
            console.log('username:' + registerData.username);
            store.successMessage('注册');
            isRegister.value = false;
        } else {
            return false;
        }
    });
};

// 用户登录
const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            const user = store.login(registerData.username, registerData.password);
            if (user) {
                store.successMessage('登陆');
                store.nowuser = user;
                router.push('/home');
            } else {
                store.errorMessage('账号或密码错误');
                return false;
            }
        } else {
            return false;
        }
    });
};

</script>
<template>
    <div style="display:flex;margin-top:0;height:100vh; background: #DDEBDB;">
        <el-container>
            <el-main>
                <!-- 注册表单 -->
                <el-form ref="ruleFormRef" autocomplete="off" v-if="isRegister" label-position=top :model="registerData"
                    :rules="rules">
                    <div class="title">Nice to meet you</div>
                    <div class="detail">Please enter your details</div>
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="用户名长度不小于6位" v-model="registerData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input placeholder="邮箱格式需正确" v-model="registerData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="密码长度不小于8位,同时包含大小写" v-model="registerData.password"
                            type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space @click="register(ruleFormRef)">
                            注册
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-link type="info" :underline="false" @click="toLogin()">
                            已经注册账号？点此登录
                        </el-link>
                    </el-form-item>
                </el-form>
                <!-- 登录表单 -->
                <el-form ref="ruleFormRef" autocomplete="off" v-else label-position=top label-width="100px"
                    :model="registerData" :rules="rules">
                    <div class="title">Welcome Back</div>
                    <div class="detail">Please enter your details</div>
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="请输入用户名" v-model="registerData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input name="password" type="password" placeholder="请输入密码"
                            v-model="registerData.password"></el-input>
                    </el-form-item>
                    <el-form-item class="free">
                        <div class="free">
                            <el-checkbox>30天内免登录</el-checkbox>
                            <el-link type="primary" :underline="false">忘记密码</el-link>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button" type="primary" auto-insert-space
                            @click="login(ruleFormRef)">登录</el-button>
                    </el-form-item>
                    <el-form-item style="justify-content: center;">
                        <el-link type="info" :underline="false" @click="toRegister()">
                            还没有注册账号？点击注册
                        </el-link>
                    </el-form-item>
                </el-form>
            </el-main>
            <img src="../assets/img/bg.png">
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.el-container {
    margin-top: 5%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: #D1E2CF;
    width: 100%;
    height: 80vh;
}

.el-main {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    flex: none;
    display: flex;
    justify-content: center;
    background: #FAFCF9;
}

img {
    width: 50%;
}

.el-form {
    margin-top: 20%;
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
    margin-bottom: 20px;
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

.free {
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

.el-link:active {
    background-color: cornflowerblue;
}
</style>