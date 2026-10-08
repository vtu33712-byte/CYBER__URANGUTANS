@echo off
set PATH=%USERPROFILE%\.mingit\cmd;%USERPROFILE%\.mingit\bin;%PATH%
echo =======================================================
echo   CIVICFLOW - PUSH TO GITHUB REPOSITORY
echo =======================================================
echo Target: https://github.com/vtu33712-byte/CYBER__URANGUTANS.git
echo.
git push -u origin main --force
echo.
if %ERRORLEVEL% EQU 0 (
    echo =======================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo =======================================================
) else (
    echo [NOTE] If prompted for password, use your GitHub Personal Access Token (ghp_...)
)
echo.
pause
