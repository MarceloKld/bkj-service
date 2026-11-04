function Write-File {param($path, $content)

  $full = Join-Path (Get-Location) $path
  [System.IO.File]::WriteAllText($full, $content, (New-Object System.Text.UTF8Encoding $false))
}

function Append-File {param($path, $content)

  $full = Join-Path (Get-Location) $path
  [System.IO.File]::AppendAllText($full, $content, (New-Object System.Text.UTF8Encoding $false))
}

function Update-Block {param($file, $key, $block)

  $full = Join-Path (Get-Location) $file
  $txt = [System.IO.File]::ReadAllText($full)
  $pattern = '"' + $key + '": \{[^}]*\}'
  $txt = [regex]::Replace($txt, $pattern, $block.Replace('$', '$$'))
  [System.IO.File]::WriteAllText($full, $txt, (New-Object System.Text.UTF8Encoding $false))
}

function Add-Block($file, $key, $block) {
  $full = Join-Path (Get-Location) $file
  $txt = [System.IO.File]::ReadAllText($full)
  if ($txt -match ('"' + $key + '"\s*:')) { Write-Host "$key existe deja dans $file"; return }
  $txt = $txt.TrimEnd()
  $idx = $txt.LastIndexOf('}')
  $txt = $txt.Substring(0, $idx).TrimEnd() + ",`n  " + $block + "`n}`n"
  [System.IO.File]::WriteAllText($full, $txt, (New-Object System.Text.UTF8Encoding $false))
}
