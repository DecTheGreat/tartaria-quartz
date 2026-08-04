$ErrorActionPreference = "Stop"

$QuartzPath = "C:\Users\decjo\tartaria-quartz"

Set-Location $QuartzPath

Write-Host "Publishing Tartaria notes..." -ForegroundColor Cyan
node .\scripts\publish-tartaria.mjs

if ($LASTEXITCODE -ne 0) {
    throw "The Tartaria publisher failed."
}

git add -A

# Check whether the publisher produced any changes.
git diff --cached --quiet

if ($LASTEXITCODE -eq 0) {
    Write-Host "No website changes to publish." -ForegroundColor Yellow
    exit 0
}

$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Publish Tartaria update - $Timestamp"

if ($LASTEXITCODE -ne 0) {
    throw "Git commit failed."
}

git push

if ($LASTEXITCODE -ne 0) {
    throw "Git push failed."
}

Write-Host "Tartaria website update pushed successfully." -ForegroundColor Green