<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { type FormInstance, ElMessage } from 'element-plus'
const router = useRouter()

//控制注册与登录表单的显示， 默认显示注册
const ruleFormRef = ref<FormInstance>()

// 定义表单校验规则
const rules = reactive({
  username: [
    { required: true, message: '必填' },
    { min: 6, message: '用户格式无效', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必填' },
    {
      min: 6,
      message: '密码格式无效',
      trigger: 'blur'
    }
  ]
})

//定义注册信息数据类型
const registerData = reactive({
  username: '',
  password: ''
})

// 用来跳转登录和注册
const isRegister = ref(true)

// 一些消息提示
const Registsuccess = () => {
  ElMessage({
    message: '注册成功',
    type: 'success'
  })
}
const Loginsuccess = () => {
  ElMessage({
    message: '登陆成功',
    type: 'success'
  })
}
const Loginerror = () => {
  ElMessage.error('用户用户名或密码错误')
}

// 用户注册，校验是否符合规则
import { userRegisterSevrvice, userLoginSevrvice, userInfoSevrvice } from '../apis/user'

const register = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (vaild) => {
    try {
      if (vaild) {
        let result = await userRegisterSevrvice(registerData)
        if (result.code === 200) {
          Registsuccess()
          isRegister.value = false
        }
      } else {
        ElMessage.error('用户名已存在')
      }
    } catch (err) {
      Loginerror()
    }
  })
}

import { useUserStore } from '../stores/user'
import { useTokenStore } from '../stores/token'

const userStore = useUserStore()

// //调用useTokenStore得到状态
const tokenStore = useTokenStore()
// 用户登录，并校对登录信息是否正确，然后储存到pinia
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (vaild) => {
    try {
      if (vaild) {
        let result = await userLoginSevrvice(registerData)
        tokenStore.setToken(result.data.token)
        getUser()
        if (result.code === 200) {
          Loginsuccess()
          router.push('/chat')
        } else {
          Loginerror()
          return false
        }
      } else {
        Loginerror()
        return false
      }
    } catch (err) {
      Loginerror()
    }
  })
}

const getUser = async () => {
  try {
    let result = await userInfoSevrvice(tokenStore.token)
    userStore.setUser(result.data)
  } catch (err) {
    alert('登录过期，请重新登录')
  }
}

// 清空注册数据
const clearRegisterData = () => {
  registerData.username = ''
  registerData.password = ''
}

</script>

<template>
  <div class="bg">
    <el-main>
      <!-- 注册表单 -->
      <el-form
        ref="ruleFormRef"
        autocomplete="off"
        v-if="isRegister"
        label-position="top"
        :model="registerData"
        :rules="rules"
      >
        <span class="title">Nice to meet you</span>
        <br />
        <span class="detail">Please enter your details</span>
        <br />
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="用户名长度不小于6位" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="密码长度不小于8位"
            v-model="registerData.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register(ruleFormRef)">
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-link
            type="info"
            :underline="false"
            @click="isRegister = false; clearRegisterData()
            "
          >
            已经注册账号？点此登录
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        ref="ruleFormRef"
        autocomplete="off"
        v-else
        label-position="top"
        label-width="100px"
        style="max-width: 460px"
        :model="registerData"
        :rules="rules"
      >
        <span class="title">Welcome Back</span>
        <br />
        <span class="detail">Please enter your details</span>
        <br />
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            name="password"
            type="password"
            placeholder="请输入密码"
            v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>30天内免登录</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item style="justify-content: center">
          <el-link
            type="info"
            :underline="false"
            @click="
              isRegister = true;clearRegisterData()
            "
          >
            还没有注册账号？点击注册
          </el-link>
        </el-form-item>
      </el-form>
    </el-main>
    <div class="pic">
        <img src="../assets/621114a7474f50daf3d8f5c0002f23d8 1.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddebdb;
}

.pic {
  width: 670px;
  height: 700px;
  border-radius: 10px;
  background: #d1e2cf;
}

.el-main {
  flex: none;
  display: flex;
  justify-content: center;
  background: #fafcf9;
  width: 670px;
  height: 700px;
  box-sizing: border-box;
}

img {
  position: absolute;
  left: 940px;
  top: 190px;
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
  color: #3d565a;
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
  background: #feffff;
  box-shadow: none;
  --el-input-bg-color: none;
  --el-input-hover-border-color: none;
  --el-input-focus-border-color: none;
}
:deep(.el-form-item.is-error .el-input__wrapper){
    box-shadow: none;
}
</style>
