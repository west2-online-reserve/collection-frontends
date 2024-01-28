<script setup>
import { User, Message, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import imgText from '@/assets/photo.jpg'
const userStore = useUserStore()
const router = useRouter()
const login = ref(true)//控制显示登录界面还是注册界面
const formdata = ref()

const formModel = reactive({
    inputNewname: '',
    inputNewword: '',
    inputEmail:''
})
const loginForm = reactive({
    inputUsername: '',
    inputPassword: ''
})
const rules = {
    inputUsername: [
        { required: true, message: '用户名不能为空', trigger: 'change' },
        { pattern: /^.{6,}$/, message: '用户名长度不小于6位', trigger: 'change' }
    ],
    inputPassword: [
        { required: true, message: '密码不能为空', trigger: 'change' },
        { pattern: /^(?![0-9A-Z.]+$)(?![0-9a-z.]+$).{8,}$/, message: '密码长度不小于8位,同时包含大小写字母', trigger: 'change' }
    ],
    inputNewname: [
        { required: true, message: '用户名不能为空', trigger: 'change' },
        { pattern: /^.{6,}$/, message: '用户名长度不小于6位', trigger: 'change' }
    ],
    inputNewword: [
        { required: true, message: '密码不能为空', trigger: 'change' },
        { pattern: /^(?![0-9A-Z.]+$)(?![0-9a-z.]+$).{8,}$/, message: '密码长度不小于8位,同时包含大小写字母', trigger: 'change' }
    ],
    inputEmail: [
        { required: true, message: '邮箱不能为空', trigger: 'change' },
        { pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确邮箱格式', trigger: 'change' }
    ]
}

//注册
const register = () => {
    const form = {
        newname: formModel.inputNewname,
        newword: formModel.inputNewword,
        email: formModel.inputEmail
    }
    userStore.register.push(form)
    ElMessage({
        message: '注册成功',
        type: 'success',
    })
    login.value=true
}

//登录
const pass=ref(false)
const enter = () => {
    userStore.register.forEach(item => {
        if ((item.newname === loginForm.inputUsername)&&(item.newword === loginForm.inputPassword)) {
            pass.value = true
        }
    })
    if (pass.value)
    {
        userStore.name = loginForm.inputUsername
         ElMessage({
            message: '登录成功',
            type: 'success',
         })
        router.push('/')
    }
    else {
        ElMessage({
            message: '用户名或密码错误',
            type: 'error',
        })
    }
}
</script>
<template>
    <el-row type="flex" justify="center" align="middle" style="background-color:#9b9ebf">
        <el-col :span="6" :offset="1" >
            <!--登陆界面-->
            <el-form :model="loginForm" :rules="rules" v-if="login" ref="formdata">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="inputUsername">
                    <el-input v-model="loginForm.inputUsername" :prefix-icon="User" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="inputPassword">
                    <el-input v-model="loginForm.inputPassword" :prefix-icon="Lock" placeholder="请输入密码" type="password" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>自动登录</el-checkbox>
                    <el-checkbox>记住密码</el-checkbox>
                    <el-link type="primary" :underline="false">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;忘记密码</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button :plain="true" @click="enter()" color="#9364a2">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-link type="info" :underline="false" @click="login=false" style="color:black">
                        去注册
                    </el-link>
                </el-form-item>
            </el-form>
            <!--注册界面-->
            <el-form :model="formModel" :rules="rules" v-else ref="formdata">
                    <el-form-item>
                        <h1>注册</h1>
                    </el-form-item>
                    <el-form-item prop="inputNewname">
                        <el-input v-model="formModel.inputNewname" :prefix-icon="User" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="inputEmail">
                        <el-input v-model="formModel.inputEmail" :prefix-icon="Message" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="inputNewword">
                        <el-input v-model="formModel.inputNewword" :prefix-icon="Lock" placeholder="请输入密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :plain="true" @click="register()" color="#9364a2">注册</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-link type="info" :underline="false" @click="login = true" style="color:black">
                            去登录
                        </el-link>
                    </el-form-item>
            </el-form>
        </el-col>
        <!--图片-->
        <el-col :span="12" :offset="2"><img :src="imgText" style="width: 800px"/></el-col>
    </el-row>
</template>
<style>
</style>