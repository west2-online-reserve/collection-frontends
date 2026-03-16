<template>
    <div class="navigate">
    <span>登录密码</span>
</div>
<div class="content">
    <div class="inputs">
        <div class="input">
            <div>
                <span>旧的登录密码</span><br>
                <input type="password" placeholder="请输入旧的登录密码">
            </div>
        </div>
        <div class="input">
            <div>
                <span>新密码</span><br>
                <input type="password" placeholder="请输入新密码">
            </div>
        </div>
        <div class="input">
            <div>
                <span>确认新密码</span><br>
                <input type="password" placeholder="请再次输入新密码">
            </div>
        </div>
    </div>
    <button>修改密码</button>
</div>
</template>
<style scoped>
.navigate{
    width:1196px;
    height:62px;
    background-color: white;
    margin-bottom:1.5px;
}
.navigate span{
    font-family: Microsoft YaHei UI;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 1px;
    line-height: 62px;
    color:#272636;
    margin-left:13px;
}
.content{
    width:1196px;
    height:656px;
    background-color: white;
    overflow: hidden;
}
.inputs{
    height:380px;
    margin-top:10px;
    overflow: hidden;
}
.input div{
    height:86px;
    margin-top: 35px;
}
.input div span{
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 17px;
    letter-spacing: 1px;
    color:black;
    margin-left:40px;
}
input{
    width: 409px;
    height:56px;
    background-color: white;
    border-radius: 2px;
    border-color:#C5C6C6;
    border-style: solid;
    border-width: 1.5px;
    outline: none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 1px;
    color:#C5C6C6;
    margin-left: 43px;
    margin-top:15px;
}
input:hover{
    width: 409px;
    height:56px;
    background-color: white;
    border-radius: 2px;
    border-color:#3B91F4;
    border-style: solid;
    border-width: 1.5px;
    outline: none;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 1px;
    color:#C5C6C6;
    margin-left: 43px;
    margin-top:15px;
}
.content button{
    width:148px;
    height:62px;
    background-color: #3B91F4;
    font-family: Microsoft YaHei UI;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 1px;
    color:white;
    border-color: #3B91F4;
    border-style: solid;
    margin-left: 43px;
    margin-top: 10px;
}
</style>