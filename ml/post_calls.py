import requests

# Define the base URL for the FastAPI server
base_url = "http://localhost:8000"

# Define the input text
input_text = "example input text"

import json
headers = {"Content-Type": "application/json"}
def post_request(url, data, headers):                                                                                       return requests.post(url,
    data=json.dumps(data),
    headers=headers,
)

# 1. Request for Video Links
def get_video_links():
    url = f"{base_url}/get-video-links"
    payload = {"input_text": input_text}
    response = requests.get(url, params=payload)
    return response.json()

# 2. Request for Markdown Text Generation
def get_markdown():
    url = f"{base_url}/get-markdown"
    payload = {"input_text": input_text}
    response = requests.get(url, params = payload)
    return response.json()

# 3. Request for Music Video Links
def get_music_videos():
    url = f"{base_url}/get-music-videos"
    payload = {"input_text": input_text}
    response = requests.get(url, params=payload)
    return response.json()

# 4. Request for Loaded Images
def get_loaded_images():
    url = f"{base_url}/get-loaded-images"
    payload = {"input_text": input_text}
    response = requests.get(url, params=payload)
    return response.json()

# Make requests and print the results
# print("Video Links Response:", get_video_links())
# print("Markdown Response:", get_markdown())
# print("Music Video Links Response:", get_music_videos())
print("Loaded Images Response:", get_loaded_images())
