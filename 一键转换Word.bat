@echo off
setlocal
set "word_file=%~1"

if "%word_file%"=="" (
    echo.
    echo [错误] 请将 Word 文档拖拽到此脚本上，或手动输入文件名。
    echo.
    set /p word_file="请输入 Word 文件名 (例如 my-post.docx): "
)

if "%word_file%"=="" (
    echo [错误] 未提供文件名，程序退出。
    pause
    exit /b 1
)

echo.
echo [1/2] 正在转换 Word 文档: "%word_file%"...
npm run upload-post "%word_file%"

if %ERRORLEVEL% NEQ 0 (
    echo [错误] 转换失败，请检查文件名是否正确。
    pause
    exit /b 1
)

echo.
echo [2/2] 转换成功！
echo.
echo 提示:
echo 1. 新文章已生成在 src/content/blog/ 目录下。
echo 2. 您可以使用 'npm run dev' 在本地预览。
echo 3. 运行以下命令提交并发布:
echo    git add .
echo    git commit -m "发布新文章"
echo    git push
echo.
pause
