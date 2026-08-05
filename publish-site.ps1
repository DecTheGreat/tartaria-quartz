$ErrorActionPreference = "Stop"

$QuartzPath = "C:\Users\decjo\tartaria-quartz"
$LogPath = Join-Path $QuartzPath "publish-site.log"

function Write-Log {
    param([string]$Message)

    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$Timestamp  $Message" |
        Tee-Object -FilePath $LogPath -Append
}

try {
    Set-Location $QuartzPath

    Write-Log "Starting Tartaria website publication."

    node .\scripts\publish-tartaria.mjs

    if ($LASTEXITCODE -ne 0) {
        throw "Tartaria publisher returned exit code $LASTEXITCODE."
    }

    git add -A

    git diff --cached --quiet

    if ($LASTEXITCODE -eq 0) {
        Write-Log "No website changes detected."
        exit 0
    }

    $CommitMessage =
        "Publish Tartaria update - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

    git commit -m $CommitMessage

    if ($LASTEXITCODE -ne 0) {
        throw "Git commit failed."
    }

    git push

    if ($LASTEXITCODE -ne 0) {
        throw "Git push failed."
    }

    Write-Log "Website update pushed successfully."
}
catch {
    Write-Log "ERROR: $($_.Exception.Message)"
    exit 1
}