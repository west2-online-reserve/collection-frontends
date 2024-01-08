<!-- CustomLoginForm.vue -->
<!-- 实现登录表单的复用 -->
<template>
    <div class="login-form">

        <h1 class="title">Reset Password</h1>
        <h2 class="tip">Please enter your password</h2>
        
        <el-form 
            :inline="false" label-position="top" label-width="120px" :size="formSize" 
            ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon
            class=""
        >
            <!-- Username -->
            <el-form-item label="User Name" prop="username" 
                class="form-labels"
            >
                <el-input v-model="ruleForm.username" maxlength="10" placeholder="Please input your username" clearable />
            </el-form-item>

            <!-- Password -->
            <el-form-item label="Password"  prop="password" 
                class="form-labels"
            >
                <el-input v-model="ruleForm.password"  type="password" placeholder="Please input your password" clearable show-password autocomplete="off"/>
            </el-form-item>

            <!-- Confirm Password -->
            <el-form-item label="Confirmed" prop="confirmed"
                class="form-labels"
            >
                <el-input v-model="ruleForm.confirmed"  type="password" placeholder="Please confirm your password" autocomplete="off"/>
            </el-form-item>

            <!-- Reset Password -->
            <el-form-item label=" " prop=""
                class="form-labels"
            >
                <el-row  class="expand" >
                    <el-col :span="12" >
                        <!-- TODO: 重置密码 -->
                        <el-button type="primary" color="#456442" @click="onResetPassword(ruleFormRef)" class="button-reset-password" >Confirmed</el-button>
                    </el-col>
                    <el-col :span="12">
                        <!-- reset Form -->
                        <el-button type="primary" color="#e0f3eb" @click="resetForm(ruleFormRef)" class="button-reset-form" >Reset</el-button>
                    </el-col>
                </el-row>
            </el-form-item>

            <!-- return -->
            <el-form-item label=" " prop=""
                class="form-labels"
            >
                <!-- TODO: 返回登录页 -->
                <el-button type="primary" color="transparent" @click="onReturnToLogin" class="button-return-to-login" >Return</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>
    
<script setup lang="ts" name="CustomLoginForm"> 
    import { ref, reactive } from 'vue';
    //interface
    import {type RuleForm, type User } from '@/types/userManagement';
    // store
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    // router
    import { useRouter } from 'vue-router';
    // ui
    import type { FormInstance, FormRules } from 'element-plus';
    import { ElMessage } from 'element-plus'
    
    const { resetPasswordByName } = useUserCollectionStore();

    let router = useRouter();

    const formSize = ref('default');
    const ruleFormRef = ref<FormInstance>();

    // the information in form to be validated
    const ruleForm = reactive<RuleForm>({
        username: '',
        password: '',
        confirmed: '',
    })

    function updateUserInfo (ruleForm: RuleForm, userInfo: User)
    {
        userInfo.account.username = ruleForm.username;
        userInfo.account.password = ruleForm.password;
    }

    const matchValidatePass = (rule: any, value: any, callback: any) => {
        if (ruleForm.confirmed !== '') {
            if (!ruleFormRef.value) return;
            ruleFormRef.value.validateField('checkPass', () => null);
        }
        callback();
    }

    const matchValidatePass2 = (rule: any, value: any, callback: any) => {

        if (value === '') {
            callback(new Error('Please input the password again'))
        } else if (value !== ruleForm.password) {
            callback(new Error("Two inputs don't match!"))
        } else {
            callback()
        }
    }

    const regexpValidatePass = (rule: any, value: any, callback: any) => {
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/;
        if( !regExp.test(ruleForm.password as string)){
            callback(new Error('Must have both upper and lower case letters!'));
        } else {
            callback();
        }
    }

    // the rules of form
    const rules = reactive<FormRules<RuleForm>>({
        // 用户名：
        // 1. 不能为空
        // 2. 用户名必须存在
        username: [
            { required: true, message: 'Please input your Username', trigger: 'blur' },
            // { validator: existenceValidateUsername, trigger: 'blur' },
        ],
        // 密码：
        // 1. 不能为空
        // 2. 必须符合要求: 密码长度不小于8位，同时包含大小写字母
        // 3. 与确认密码一致
        password: [
            { required: true, message: 'Please input Your Password', trigger: 'blur'},
            { min: 8, max: 20, message: 'Length should be greater than 8', trigger: 'blur' },
            { validator: regexpValidatePass, trigger: 'blur' },
            { validator: matchValidatePass, trigger: 'blur'},
        ],
        // 确认密码：
        // 1. 不能为空
        // 2. 必须与密码一致
        confirmed: [
            {required: true, message: 'Please input Your Password', trigger: 'blur'},
            { validator: matchValidatePass2, trigger: 'blur'},
        ],
    });

    const onResetPassword = async (formEl: FormInstance | undefined) => {
        if (!formEl) 
            return 
            {
                await formEl.validate((valid, fields) => {
                    if (valid) {
                        if(resetPasswordByName(ruleForm.username as string, ruleForm.password as string)){
                            resetSuccessfully();
                            console.log('submit!')
                            setTimeout(() => {
                                    router.replace({name: 'login',})
                            }, 1500);
                        }else{
                            resetFailure2();
                            resetForm(ruleFormRef.value);
                            console.log('error submit!', fields)
                        }                      
                    } else {
                        resetFailure1();
                        resetForm(ruleFormRef.value);
                        console.log('error submit!', fields)
                    }
                })
            }
    }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
            formEl.resetFields()
    }

    const onReturnToLogin = () =>{
        router.replace({
            name: 'login',
        })
    };

    const resetSuccessfully = () => ElMessage({ message: 'success, Reset Password!', grouping: true, type: 'success', offset: 100, duration:1500 });
    const resetFailure1 = () => ElMessage({ message: 'Error, failed to reset password!', grouping: true, type: 'error', showClose: true, offset: 100, duration:1500 });
    const resetFailure2 = () => ElMessage({ message: 'Error, Username Do Not Exist!', grouping: true, type: 'error', showClose: true, offset: 100, duration:1500 });
      

</script>

<style>
    .el-form--default.el-form--label-top .el-form-item .el-form-item__label{
        margin-bottom: 0px;
        margin-top: 12px;
    }
    .label-no-login .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #3D565A; 
    }
    .el-checkbox{
        --el-checkbox-input-border: var(--el-border-width) var(--el-border-style) #3D565A;
    }
    .el-input {
    --el-input-border-color: #426440;
    }
</style>
<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    button{
        padding-right: 2px;
        padding-left: 2px;
    }
    .expand{
        width: 100%;
    }

    .login-form{
        margin: 0 auto;
        padding: 6px;
        width: 300px;
        background-color: #FAFCF9;
    }
    .form-labels{
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        color: #3D565A;
    }

    .title{
        text-align: center;
    
        
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        color: #426440;
    }

    .tip{
        text-align: center;

        font-family: Inter;
        font-style: normal;
        font-size: 15px;
        font-weight: 700;
        line-height: normal;
        color: #3D565A;
    }

    .button-reset-password,.button-reset-form{
        width: 100%;
        color: #FEFFFF;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        margin: 20px 0 0;
    }
    .button-reset-form{
        color: #888888;
    }
    .expand .el-col-12:nth-child(1){
        padding-right: 10px;
    }
    .expand .el-col-12:nth-child(2){
        padding-left: 10px;
    }

    .button-return-to-login{
        color: #989898;
    }
</style>
    @/stores/userCollectionStore@/backup/userInfo