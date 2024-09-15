from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi import FastAPI
from fastapi.responses import FileResponse
import requests
from PIL import Image
from io import BytesIO
import os
import ast
from agent_rag.run_suno import generate_music_video
from agent_rag.vector_search import vector_search_response

# Pydantic model for video links
class VideoLinksResponse(BaseModel):
    video_links: list[str]

# Pydantic model for markdown output
class MarkdownResponse(BaseModel):
    markdown_text: str

# Pydantic model for music video links
class MusicVideoResponse(BaseModel):
    music_video_links: list[str]


app = FastAPI()

from agent_rag.rag import llm_call, youtube_search, tavily_search, get_content_from_tavily_search, image_search, sys_message, sys_message_lyrics, sys_message_practice, agent_call, image_search_vs

# Route for video links
@app.get("/get-video-links", response_model=VideoLinksResponse)
async def get_video_links(input_text: str):
    # Simulate video link generation from the input text
    video_links = ast.literal_eval(youtube_search(input_text))
    return VideoLinksResponse(video_links=video_links)

# Route for markdown text generation
@app.get("/get-markdown", response_model=MarkdownResponse)
async def get_markdown(input_text: str):
    # Simulate markdown text generation from the input text
    response = tavily_search(input_text)
    content = get_content_from_tavily_search(response, input_text)
    markdown_text = agent_call(sys_message, input_text, content).replace("```python", "").replace("```", "")
    return MarkdownResponse(markdown_text=markdown_text)

# Route for markdown text generation
@app.get("/get-markdown-vs", response_model=MarkdownResponse)
async def get_markdown_vs(input_text: str):
    # Simulate markdown text generation from the input text
    content = vector_search_response(input_text)
    markdown_text = agent_call(sys_message, input_text, content).replace("```python", "").replace("```", "")
    return MarkdownResponse(markdown_text=markdown_text)


@app.get("/get-kinaesthetic-markdown", response_model=MarkdownResponse)
async def get_markdown(input_text: str):
    # Simulate markdown text generation from the input text
    response = tavily_search(input_text)
    content = get_content_from_tavily_search(response, input_text)
    markdown_text = agent_call(sys_message_practice, input_text, content + "\n" + "[END]").replace("```python", "").replace("```", "")
    return MarkdownResponse(markdown_text=markdown_text)

@app.get("/get-kinaesthetic-markdown-vs", response_model=MarkdownResponse)
async def get_markdown_vs(input_text: str):
    # Simulate markdown text generation from the input text
    content = vector_search_response(input_text)
    markdown_text = agent_call(sys_message_practice, input_text, content + "\n" + "[END]").replace("```python", "").replace("```", "")
    return MarkdownResponse(markdown_text=markdown_text)

# Route for music video links web search
@app.get("/get-music-videos", response_model=MusicVideoResponse)
async def get_music_videos(input_text: str):
    # Simulate music video link generation
    response = tavily_search(input_text)
    content = get_content_from_tavily_search(response, input_text)
    lyrics = agent_call(sys_message_lyrics, input_text, content)
    music_video_links = generate_music_video(lyrics)
    return MusicVideoResponse(music_video_links=[music_video_links])

# Route for music video links
@app.get("/get-music-videos-vs", response_model=MusicVideoResponse)
async def get_music_videos_vs(input_text: str):
    # Simulate music video link generation
    content = vector_search_response(input_text)
    lyrics = agent_call(sys_message_lyrics, input_text, content)
    music_video_links = generate_music_video(lyrics)
    return MusicVideoResponse(music_video_links=[music_video_links])


# Route for loaded images web search 
@app.get("/get-loaded-images")
async def get_loaded_images(input_text: str):
    # Simulate loading images from input text
    image_search_results = image_search(input_text)
    print(image_search_results)
    # load the urls and return the loaded images
    loaded_images = get_images(image_search_results )
    # loaded_images = [f"https://example.com/image/{i}.jpg" for i in range(5)]
    return loaded_images

# Route for loaded images vector search
@app.get("/get-loaded-images-vs")
async def get_loaded_images_vs(input_text: str):
    # Simulate loading images from input text
    image_search_results = image_search_vs(input_text)
    print(image_search_results)
    # load the urls and return the loaded images
    loaded_images = get_images(image_search_results )
    # loaded_images = [f"https://example.com/image/{i}.jpg" for i in range(5)]
    return loaded_images


# Directory to save the downloaded images
IMAGE_DIR = "downloaded_images"

# Ensure the directory exists
os.makedirs(IMAGE_DIR, exist_ok=True)
def get_images(image_urls_and_titles: tuple[list[str],list[str]]):

    image_urls, titles = image_urls_and_titles

    saved_image_paths_and_titles = []
    
    for idx, url in enumerate(image_urls):
        # Download the image from each URL
        response = requests.get(url)
        if response.status_code == 200:
            # Open the image and save it locally
            img = Image.open(BytesIO(response.content))
            img_path = os.path.join(IMAGE_DIR, f"image_{idx}.jpg")
            if img.mode == 'RGBA':  # Check if the image has an alpha channel
                img = img.convert('RGB')  # Convert to RGB to remove alpha
            img.save(img_path)  # Save each image locally
            saved_image_paths_and_titles.append((img_path,titles[idx]))
        else:
            return {"error": f"Image {idx} could not be downloaded from {url}"}
    return [FileResponse(path, filename = title, media_type="image/jpeg") for path, title in saved_image_paths_and_titles]



