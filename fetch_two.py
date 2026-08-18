# -*- coding: utf-8 -*-
import urllib.request, urllib.parse, json, time

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/115.0.0.0 Safari/537.36'}
targets = {
    'enoden': '江ノ島電鉄500形電車_(2代)',
    'osaka_monorail': '大阪モノレール1000系電車'
}

for key, title in targets.items():
    url = f"https://ja.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&pithumbsize=800&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            page = list(data['query']['pages'].values())[0]
            if 'thumbnail' in page:
                img_url = page['thumbnail']['source']
                print(f"Downloading {key} from {img_url}...")
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req) as img_resp:
                    with open(f"images/{key}.jpg", 'wb') as f:
                        f.write(img_resp.read())
            else:
                print(f"NO IMAGE for {title}")
    except Exception as e:
        print(f"Error on {key}:", e)
    time.sleep(1)
