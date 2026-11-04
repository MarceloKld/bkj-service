# 1. Si tu as fermé le terminal depuis l’étape 1, redéfinis la fonction d’écriture. Vérifie aussi que tu es dans le dossier bkj-service.
R)function Write-File($path, $content) {
  $full = Join-Path (Get-Location) $path
  [System.IO.File]::WriteAllText($full, $content, (New-Object System.Text.UTF8Encoding $false))
}
function Append-File($path, $content) {
  $full = Join-Path (Get-Location) $path
  [System.IO.File]::AppendAllText($full, $content, (New-Object System.Text.UTF8Encoding $false))
}
function Update-Block($file, $key, $block) {
  $full = Join-Path (Get-Location) $file
  $txt = [System.IO.File]::ReadAllText($full)
  $pattern = '"' + $key + '": \{[^}]*\}'
  $txt = [regex]::Replace($txt, $pattern, $block.Replace('$', '$$'))
  [System.IO.File]::WriteAllText($full, $txt, (New-Object System.Text.UTF8Encoding $false))
}

R). .\scripts\helpers.ps1