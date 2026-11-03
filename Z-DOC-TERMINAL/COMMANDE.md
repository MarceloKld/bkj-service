# 1. Si tu as fermé le terminal depuis l’étape 1, redéfinis la fonction d’écriture. Vérifie aussi que tu es dans le dossier bkj-service.
R)function Write-File($path, $content) {
  $full = Join-Path (Get-Location) $path
  [System.IO.File]::WriteAllText($full, $content, (New-Object System.Text.UTF8Encoding $false))
}