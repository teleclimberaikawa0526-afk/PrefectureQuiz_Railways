$trains = [ordered]@{
    "azusa_e353" = "JR東日本E353系電車"
    "fujisan_view" = "富士急行8500系電車"
    "hankyu_train" = "阪急1000系電車 (2代)"
    "narita_express" = "JR東日本E259系電車"
    "sl_yamaguchi" = "SLやまぐち号"
    "sonic_883" = "JR九州883系電車"
    "tsubame_800" = "新幹線800系電車"
    "yamanote_line" = "JR東日本E235系電車"
    "yufuin_nomori" = "JR九州キハ72系気動車"
}

$sourcesPath = "images_sources.json"
$sources = Get-Content $sourcesPath -Raw | ConvertFrom-Json
$sourcesHash = [ordered]@{}
foreach ($prop in $sources.psobject.properties) {
    $sourcesHash[$prop.Name] = $prop.Value
}

foreach ($key in $trains.Keys) {
    $title = $trains[$key]
    Write-Host "Fetching $key ($title)..."
    $encodedTitle = [uri]::EscapeDataString($title)
    $apiUrl = "https://ja.wikipedia.org/w/api.php?action=query&titles=$encodedTitle&prop=pageimages&pithumbsize=800&format=json"
    
    try {
        $response = Invoke-RestMethod -Uri $apiUrl -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrefQuizApp/1.0 (teleclimber@example.com)"
        $pages = $response.query.pages
        $pageId = ($pages.PSObject.Properties.Name)[0]
        $page = $pages.$pageId
        
        if ($page.thumbnail -and $page.thumbnail.source) {
            $imgUrl = $page.thumbnail.source
            Write-Host "  -> Downloading from $imgUrl"
            $outFile = "images/$key.jpg"
            curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrefQuizApp/1.0" $imgUrl -o $outFile
            
            $sourcesHash[$key] = @{
                "title" = $title
                "url" = $imgUrl
            }
        } else {
            Write-Host "  -> No thumbnail found for $title!"
        }
    } catch {
        Write-Host "  -> Error: $_"
    }
    Start-Sleep -Seconds 3
}

$sourcesHash | ConvertTo-Json -Depth 3 | Out-File -Encoding utf8 $sourcesPath
Get-ChildItem images | Select-Object Name, Length
Write-Host "Done!"
