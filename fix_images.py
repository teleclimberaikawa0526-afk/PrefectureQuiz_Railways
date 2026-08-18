import json
import urllib.request
import urllib.parse
import time
import os

titles_to_check = {
    "botchan_ressha": "坊っちゃん列車",
    "chiba_monorail": "千葉都市モノレール0形電車",
    "enoden": "江ノ島電鉄300形電車",
    "enoden_alt": "江ノ島電鉄1000形電車",
    "green_mover_max": "広島電鉄5100形電車",
    "ishizuchi": "JR四国8600系電車",
    "kamome": "新幹線N700S系電車",
    "randen": "京福電気鉄道モボ21形電車",
    "resort_shirakami": "JR東日本HB-E300系気動車",
    "kurobe_gorge": "黒部峡谷鉄道EDV形電気機関車",
    "kurobe_gorge_alt1": "黒部峡谷鉄道ED形電気機関車",
    "kurobe_gorge_alt2": "黒部峡谷鉄道EHR形電気機関車",
    "osaka_monorail": "大阪モノレール3000系電車",
    "osaka_monorail_alt1": "大阪モノレール1000系電車",
    "osaka_monorail_alt2": "大阪モノレール2000系電車"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

for key, title in titles_to_check.items():
    url = f"https://ja.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&pithumbsize=800&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            page_id = list(pages.keys())[0]
            page = pages[page_id]
            
            if 'thumbnail' in page and 'source' in page['thumbnail']:
                img_url = page['thumbnail']['source']
                print(f"FOUND {key} -> {img_url}")
                
                # Download if it's one of the keys we need to fix
                if not key.endswith('_alt') and not key.endswith('_alt1') and not key.endswith('_alt2'):
                    print(f"Downloading {key}...")
                    img_req = urllib.request.Request(img_url, headers=headers)
                    with urllib.request.urlopen(img_req) as img_resp:
                        with open(f"images/{key}.jpg", 'wb') as out_file:
                            out_file.write(img_resp.read())
            else:
                print(f"NO IMAGE for {key}")
    except Exception as e:
        print(f"Error fetching {key}: {e}")
    time.sleep(0.5)
