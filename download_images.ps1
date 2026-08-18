$trains = [ordered]@{
    "hayabusa_e5" = "新幹線E5系・H5系電車"
    "nozomi_n700s" = "新幹線N700S系電車"
    "kagayaki_e7" = "新幹線E7系・W7系電車"
    "komachi_e6" = "新幹線E6系電車"
    "tsubame_800" = "新幹線800系電車"
    "tsubasa_e3" = "新幹線E3系電車"
    "doctor_yellow" = "新幹線923形電車"
    "azusa_e353" = "JR東日本E353系電車"
    "thunderbird_683" = "JR西日本683系電車"
    "hida_hc85" = "JR東海HC85系気動車"
    "yufuin_nomori" = "JR九州キハ72系気動車"
    "narita_express" = "JR東日本E259系電車"
    "sonic_883" = "JR九州883系電車"
    "shimakaze_50000" = "近鉄50000系電車"
    "sl_yamaguchi" = "SLやまぐち号"
    "yamanote_line" = "JR東日本E235系電車"
    "hankyu_train" = "阪急1000系電車 (2代)"
    "fujisan_view" = "富士急行8500系電車"
    "odoriko_e257" = "JR東日本E257系電車"
    "yakumo_273" = "JR西日本273系電車"
}

$sources = [ordered]@{}

foreach ($key in $trains.Keys) {
    $title = $trains[$key]
    Write-Host "Fetching $key ($title)..."
    $encodedTitle = [uri]::EscapeDataString($title)
    $apiUrl = "https://ja.wikipedia.org/w/api.php?action=query&titles=$encodedTitle&prop=pageimages&pithumbsize=800&format=json"
    
    try {
        $response = Invoke-RestMethod -Uri $apiUrl -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrefQuizApp/1.0"
        $pages = $response.query.pages
        $pageId = ($pages.PSObject.Properties.Name)[0]
        $page = $pages.$pageId
        
        if ($page.thumbnail -and $page.thumbnail.source) {
            $imgUrl = $page.thumbnail.source
            Write-Host "  -> Downloading from $imgUrl"
            $outFile = "images/$key.jpg"
            Invoke-WebRequest -Uri $imgUrl -OutFile $outFile -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrefQuizApp/1.0"
            
            $sources[$key] = @{
                "title" = $title
                "url" = $imgUrl
            }
        } else {
            Write-Host "  -> No thumbnail found for $title!"
        }
    } catch {
        Write-Host "  -> Error: $_"
    }
    Start-Sleep -Seconds 2
}

$sources | ConvertTo-Json -Depth 3 | Out-File -Encoding utf8 images_sources.json
Write-Host "Done!"
