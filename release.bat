@echo off
setlocal enabledelayedexpansion

:: Read version from package.json
for /f "delims=" %%v in ('node -p "require('./package.json').version"') do set VERSION=%%v
set RELEASE_NOTES=Automated release of version %VERSION%
set ARTIFACT=dist\idleon-steam-data-extractor.exe

:: Ensure GitHub CLI is installed
where gh >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ GitHub CLI (gh) is not installed. Install it from https://cli.github.com/
    exit /b 1
)

:: Ensure user is authenticated
gh auth status >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ You are not authenticated. Run: gh auth login
    exit /b 1
)

echo 🚀 Running build process...
call npm run dist

:: Check if artifact exists
if not exist "%ARTIFACT%" (
    echo ❌ Error: Artifact %ARTIFACT% not found. Make sure 'npm run dist' generates it.
    exit /b 1
)

echo 🚀 Releasing version %VERSION%...

:: Create and push Git tag
git tag -a %VERSION% -m "%RELEASE_NOTES%"
git push origin %VERSION%

:: Create GitHub release and attach artifact
gh release create %VERSION% "%ARTIFACT%" --title "Release %VERSION%" --notes "%RELEASE_NOTES%"

echo ✅ GitHub release %VERSION% created successfully!
