import requests
import time
YOUR_TOKEN="XceiWJD3LjYnOnkqErAYbQ9T740eHT4O"

url = 'https://studio-api.suno.ai/api/generate/v2/'

headers = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'affiliate-id': 'undefined',
    'authorization': f'Bearer {YOUR_TOKEN}',
    'content-type': 'text/plain;charset=UTF-8',
    'origin': 'https://suno.com/',
    'priority': 'u=1, i',
    'referer': 'https://suno.com/',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
}
id_headers = {'authorization': f'Bearer {YOUR_TOKEN}',}


def generate_music_video(prompt, tag = "pop"):
    data = {
    "prompt": prompt,
    "tags": tag
    }   
    response = requests.post(url, headers=headers, json=data)
    time.sleep(50)
    id = response.json()["clips"][0]["id"]
    id_url = f'https://studio-api.suno.ai/api/external/clips/?ids={id}'
    id_headers = {'authorization': f'Bearer {YOUR_TOKEN}',}
    id_response = requests.get(id_url, headers=id_headers)
    return [id_response.json()[0]['video_url']]



