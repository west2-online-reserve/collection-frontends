<!-- CustomLoginForm.vue -->
<!-- 实现登录表单的复用 -->
<template>
    <div class="login-form">

        <h1 class="title">Nice to  meet you</h1>
        <h2 class="tip">Please enter your details</h2>
        
        <el-form 
            :inline="false" label-position="top" label-width="120px" :size="formSize" 
            ref="ruleFormRef" :model="ruleForm" :rules="rules"
            class=""
        >
            <!-- Username -->
            <el-form-item label="User Name" prop="username" 
                class="form-labels"
            >
                <el-input v-model="ruleForm.username" placeholder="Please input your username" clearable />
            </el-form-item>

            <!-- Email -->
            <el-form-item label="Email" prop="email" 
                class="form-labels"
            >
                <el-input v-model="ruleForm.email" placeholder="Please input your email" clearable />
            </el-form-item>

            <!-- Password -->
            <el-form-item label="Password" prop="password"
                class="form-labels"
            >
                <el-input v-model="ruleForm.password" placeholder="Please input your password" clearable show-password/>
            </el-form-item>

            <!-- Register -->
            <el-form-item label="" prop=""
                class="form-labels"
            >
                <el-row  class="expand" >
                    <el-col :span="12" >
                        <!-- TODO: 注册 -->
                        <el-button type="primary" color="#456442" @click="onRegisterAccount(ruleFormRef)" class="button-register" >Register</el-button>
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
    import { onMounted } from 'vue';
    //interface
    import {primaryUser, defaultUser, CurrentYMD, type RuleForm, type User} from '@/types/userManagement';
    // store
    import { useUserCollectionStore } from '@/stores/userCollectionStore';

    // router
    import { useRouter } from 'vue-router';

    // import { Search } from '@element-plus/icons-vue';
    import type { FormInstance, FormRules } from 'element-plus';
    import { ElMessage } from 'element-plus';
    import { v4 as v4uuid } from 'uuid';

    const { isUsernameUnique, isEmailUnique, addAccountToCollection} = useUserCollectionStore();

    let router = useRouter();

    const formSize = ref('default');
    const ruleFormRef = ref<FormInstance>();

    const accountInfo = reactive<User>(primaryUser);

    // the information in form to be validated
    const ruleForm = reactive<RuleForm>({
        username: '',
        password: '',
        confirmed: '',
        email:'',
    })

    // the rules of validation
    const regexpValidatePass = (rule: any, value: any, callback: any) => {
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/; // /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+$/
            if(!regExp.test(ruleForm.password as string)){
                callback(new Error('Must have both upper and lower case letters!'));
            } else {
                callback();
            }
    }

    const regexpValidateEmail = (rule: any, value: any, callback: any) => {
        const regExpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regExpEmail.test(ruleForm.email as string)) {
                callback(new Error('Formatting error!'));
            } else {
                callback();
            }
    }

    const rules = reactive<FormRules<RuleForm>>({
        // 用户名：
        // 1. 不能为空 0
        // 2. 用户名不小于6 0
        // 3. 不能和已有的重复
        username: [
            { required: true, message: 'Please input your Username', trigger: 'blur' },
            { min: 6, max: 20, message: 'Length should be greater than 6', trigger: 'blur' },
            
        ],
        // 密码：
        // 1. 不能为空 0
        // 2. 必须有大小写字母 0
        // 3. 长度不小于8 0
        password: [
            { required: true, message: 'Please input Your Password', trigger: 'blur'},
            { validator: regexpValidatePass, trigger: 'blur'},
            { min: 9, max: 20, message: 'Length should be greater than 8', trigger: 'blur' },
        ],
        // 邮箱：
        // 1.不能空 0
        // 2. 格式正确 0
        email:[
            { required: true, message: 'Please input Your Email', trigger: 'blur'},
            { validator: regexpValidateEmail, trigger: 'blur'},
        ]
    });

    // register
    const onRegisterAccount = async (formEl: FormInstance | undefined) => {
        if (!formEl) 
            return;
            {
                await formEl.validate((valid, fields) => {
                    if (valid) {
                        // TODO: 检索数据库，如果用户名和邮箱都没有重复，就注册成功
                        if(isUsernameUnique(ruleForm.username as string) && isEmailUnique(ruleForm.email as string)){
                            accountInfo.account.id = v4uuid();
                            accountInfo.account.username = ruleForm.username as string;
                            accountInfo.account.password = ruleForm.password as string;
                            accountInfo.account.email = ruleForm.email as string;
                            accountInfo.loginStatus = {
                                isLoggedIn:  true,
                                noLoginAgain: true,
                                checkedDate: CurrentYMD}
                            addAccountToCollection(accountInfo);
                                registerSuccessfully();
                                setTimeout(() => {
                                    router.replace({
                                        name: 'todolist',
                                    })
                                }, 1500);
                                return;

                        }else{
                            console.log('error submit!');
                            resetForm(ruleFormRef.value);
                            registerFailure();
                            return;
                        }                
                    } else {
                        console.log('error submit!', fields);
                        registerFailure();
                    }
                });
            }
    }
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
            formEl.resetFields()
    }

    // return to login page
    const onReturnToLogin = () =>{
        router.replace({
            name: 'login',
        })
    };

    const registerSuccessfully = () => ElMessage({ message: 'success, Register an account!', grouping: true, type: 'success', offset: 100, duration:1500 });
    const registerFailure = () => ElMessage({ message: 'Error, submit!', grouping: true, type: 'error', showClose: true, offset: 100, duration:1500 });
  

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
    .button-register,.button-reset-form{
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
    @/utils/userMangement@/utils/userManagementUtilities@/backup/userInfo