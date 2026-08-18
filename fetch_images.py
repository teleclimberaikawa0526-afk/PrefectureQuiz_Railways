import urllib.request
import urllib.parse
import json
import os
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

trains = {
    "hayabusa_e5": "新幹線E5系・H5系電車",
    "nozomi_n700s": "新幹線N700S系電車",
    "kagayaki_e7": "新幹線E7系・W7系電車",
    "komachi_e6": "新幹線E6系電車",
    "tsubame_800": "新幹線800系電車",
    "tsubasa_e3": "新幹線E3系電車",
    "doctor_yellow": "新幹線923形電車",
    "azusa_e353": "JR東日本E353系電車",
    "thunderbird_683": "JR西日本683系電車",
    "hida_hc85": "JR東海HC85系気動車",
    "yufuin_nomori": "JR九州キハ72系気動車",
    "narita_express": "JR東日本E259系電車",
    "sonic_883": "JR九州883系電車",
    "shimakaze_50000": "近鉄50000系電車",
    "sl_yamaguchi": "SLやまぐち号",
    "yamanote_line": "JR東日本E235系電車",
    "hankyu_train": "阪急1000系電車 (2代)",
    "fujisan_view": "富士急行8500系電車",
    "odoriko_e257": "JR東日本E257系電車",
    "yakumo_273": "JR西日本273系電車"
}

sources = {}

for key, title in trains.items():
    print(f"Fetching {key}...")
    encoded_title = urllib.parse.quote(title)
    api_url = f"https://ja.wikipedia.org/w/api.php?action=query&titles={encoded_title}&prop=pageimages&pithumbsize=800&format=json"
    req = urllib.request.Request(api_url, headers={'User-Agent': 'PrefectureQuizApp/1.0'})
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page = list(pages.values())[0]
            if 'thumbnail' in page:
                img_url = page['thumbnail']['source']
                
                # Download image
                img_req = urllib.request.Request(img_url, headers={'User-Agent': 'PrefectureQuizApp/1.0'})
                with urllib.request.urlopen(img_req, context=ctx) as img_resp:
                    img_data = img_resp.read()
                    with open(f"images/{key}.jpg", "wb") as f:
                        f.write(img_data)
                print(f"  -> Downloaded from {img_url}")
                sources[key] = {"title": title, "url": img_url}
            else:
                print(f"  -> No thumbnail found for {title}")
    except Exception as e:
        print(f"  -> Error: {e}")

with open('images_sources.json', 'w', encoding='utf-8') as f:
    json.dump(sources, f, indent=4, ensure_ascii=False)
print('Done!')
