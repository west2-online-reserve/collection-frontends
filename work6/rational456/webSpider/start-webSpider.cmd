:: start-with-input.cmd
@echo off
chcp 65001 >nul
title 爬虫参数配置
color 0e

echo ========================================
echo       爬虫参数配置
echo ========================================
echo.

:: 输入工作目录
echo [0/3] 设置工作目录
echo.
echo 当前所在目录: %cd%
echo.
set /p work_dir="请输入工作目录路径 (直接回车使用当前目录): "

:: 如果输入了目录，则切换到该目录
if not "%work_dir%"=="" (
    echo.
    echo 正在切换到目录: %work_dir%
    cd /d "%work_dir%" 2>nul
    
    :: 检查目录切换是否成功
    if %errorlevel% neq 0 (
        echo [错误] 目录切换失败！请检查路径是否正确
        echo 输入的路径: %work_dir%
        pause
        exit /b 1
    )
    echo 切换成功！
) else (
    echo 使用当前目录
)

echo.
echo 当前工作目录: %cd%
echo.
echo ========================================
echo.

:: 检查并安装依赖
echo [1/3] 检查并安装指定依赖...
echo.

:: 检查是否需要安装依赖
set NEED_INSTALL=0

:: 检查各个依赖包是否存在
if not exist "node_modules\axios\" set NEED_INSTALL=1
if not exist "node_modules\cheerio\" set NEED_INSTALL=1
if not exist "node_modules\p-queue\" set NEED_INSTALL=1

if %NEED_INSTALL% equ 1 (
    echo 正在安装依赖: axios, cheerio, p-queue
    echo 请稍候...
    echo.
    
    :: 安装指定的依赖包
    call npm install axios cheerio p-queue --save
    
    :: 检查npm install是否成功
    if %errorlevel% neq 0 (
        echo.
        echo [错误] npm install 执行失败
        echo 请检查网络连接或npm配置
        pause
        exit /b 1
    )
    echo.
    echo 依赖安装完成！
) else (
    echo 所需依赖已存在，跳过安装
    echo   - axios
    echo   - cheerio  
    echo   - p-queue
)

echo.
echo ========================================
echo.

:: 输入参数
echo [2/3] 配置爬虫参数
echo.
set /p cookie="请输入cookie[必填]: "

:: 检查cookie是否为空
if "%cookie%"=="" (
    echo [错误] cookie不能为空！
    pause
    exit /b 1
)

echo.
echo ========================================
echo 配置信息:
echo   工作目录: %cd%
echo   cookie: %cookie%
echo ========================================
echo.

:: 检查webSpider.js是否存在
if not exist ".\webSpider.js" (
    echo [警告] 未找到 webSpider.js 文件
    echo 当前目录: %cd%
    echo 请确保 webSpider.js 在当前目录下
    echo.
    echo 是否继续？(y/n)
    set /p continue=""
    if /i not "!continue!"=="y" (
        echo 已取消执行
        pause
        exit /b 1
    )
)

:: 启动应用并传递参数
echo [3/3] 启动爬虫程序...
echo.
node .\webSpider.js --cookie="%cookie%"

:: 如果node命令失败，显示错误
if %errorlevel% neq 0 (
    echo.
    echo [错误] 应用执行失败
    echo 请检查:
    echo   1. Node.js 是否正确安装
    echo   2. webSpider.js 文件是否存在
    echo   3. 依赖包是否完整安装
)

echo.
pause