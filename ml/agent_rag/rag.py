from langchain_community.tools import YouTubeSearchTool
from tavily import TavilyClient
from duckduckgo_search import DDGS
import requests
import os
from dotenv import load_dotenv
import ast
load_dotenv()


def llm_call():
    return "Hello from the LLM"


def youtube_search(query, n = 5):
    tool = YouTubeSearchTool()
    return tool.run(query)


def tavily_search(query, n = 2):
    client = TavilyClient(os.getenv("TAVILY_API_KEY"))
    response = client.search(query, max_results=n,
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
    include_images=True
    )
    return response

def get_links_from_tavily_search(query, n = 2):
    search_output = tavily_search(query, n)
    links = []
    content = search_output["results"]
    for item in content:
        links.append(item["url"])
    return links

def get_content_from_tavily_search(search_output, n = 2):
    string_content = ""
    content = search_output["results"]
    for item in content:
        string_content += "\n\n" + item["raw_content"]
    return string_content 

def ddgs_search(query, n = 1):
    results = DDGS().images(query, max_results=n)
    return (results[0]["image"], query)


# from openai import OpenAI
sys_prompt = """You are a helpful assistant that creates learning materials in MARKDOWN based on the CONTEXT below and the user's questions. Generate only the desired MARKDOWN after the next [END]"""
sys_prompt_lyrics = """Write the lyrics for a pop song based on the CONTEXT below and the question to help the user remember and learn concepts. Keep it strictly less than 100 words"""
sys_prompt_caption = """You are a helpful assistant that generates 5 captions for an engaging storyline for visual learners as a python list based on the CONTEXT below and the user's questions. Ensure the storyline has a main character and that the character is described in great detail of his physical characteristics and consistently in each caption. Generate ONLY the python list after the next [END]"""
sys_prompt_practice = """You are a helpful assistant that creates activities and practices for kinaesthetic learners to do in MARKDOWN based on the CONTEXT below and the user's questions to aid their learning. Generate only the desired MARKDOWN after the next [END]"""
sys_prompt_search = """You are a helpful assistant that generates 5 google image search queries as a python list based on the CONTEXT below and the user's questions to find useful flowcharts and diagrams to illustrate important concepts. Generate ONLY the python list after the next [END]"""

api_key = os.getenv("OPENAI_API_KEY")

sys_message = [{"role": "system", "content": sys_prompt}]
sys_message_lyrics = [{"role": "system", "content": sys_prompt_lyrics}]
sys_message_caption = [{"role": "system", "content": sys_prompt_caption}]
sys_message_practice = [{"role": "system", "content": sys_prompt_practice}]
sys_message_search = [{"role": "system", "content": sys_prompt_search}]

def image_search(query):
    # defaults to 5 based on prompt
    urls, titles = [], []
    search_outs = tavily_search(query=query)
    context = get_content_from_tavily_search(search_outs)
    llm_output = agent_call(llm_input=sys_message_search, query=query, context=context + "\n" + "[END]").replace("```python", "").replace("```", "").split(" = ")[-1]
    list_converted = ast.literal_eval(llm_output)
    print(list_converted)
    for img_caption in list_converted:
        url, title = ddgs_search(img_caption)
        urls.append(url)
        titles.append(title)
    return urls, titles

# [('Start your journey to build a large language model (LLM) by identifying its unique use case—what will your model excel at?', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-E3z4Ifngc2qF725zZatcILSr/user-UoVxEDqSBDJVQN0HNdNlkw2a/img-UGQoIeNZY4TEzkFzZ656fAd5.png?st=2024-09-15T04%3A38%3A02Z&se=2024-09-15T06%3A38%3A02Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-14T23%3A14%3A28Z&ske=2024-09-15T23%3A14%3A28Z&sks=b&skv=2024-08-04&sig=0UklxCH3v7/bO1nAluZZKeemfkPCyIQkkG1Q3u956tI%3D'), ("Next, dive into the architecture! Build the transformer backbone that enhances your LLM's ability to understand context and language patterns.", 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-E3z4Ifngc2qF725zZatcILSr/user-UoVxEDqSBDJVQN0HNdNlkw2a/img-7pnqAO5JA7s6A8eRaMRCwgUv.png?st=2024-09-15T04%3A38%3A15Z&se=2024-09-15T06%3A38%3A15Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-14T23%3A28%3A38Z&ske=2024-09-15T23%3A28%3A38Z&sks=b&skv=2024-08-04&sig=rKCYIb61zh/TrisA5jFQWvlFypgm/9UW6pY1fbnhOPg%3D'), ('Curate your data thoughtfully; remember, quality over quantity! Select diverse and reliable data to train your model effectively.', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-E3z4Ifngc2qF725zZatcILSr/user-UoVxEDqSBDJVQN0HNdNlkw2a/img-R65oYv7nJ7U1nl21G56mThFX.png?st=2024-09-15T04%3A38%3A29Z&se=2024-09-15T06%3A38%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-14T23%3A56%3A00Z&ske=2024-09-15T23%3A56%3A00Z&sks=b&skv=2024-08-04&sig=rZSbQ/VyQcI9CBOvdDBAe2NjRG954mBkgVBxKRVVgDM%3D'), ("It's training time! Feed the data into your model as it learns the intricacies of language through sophisticated techniques.", 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-E3z4Ifngc2qF725zZatcILSr/user-UoVxEDqSBDJVQN0HNdNlkw2a/img-sF2GJqSHqEM5xJguEyea7bQV.png?st=2024-09-15T04%3A38%3A41Z&se=2024-09-15T06%3A38%3A41Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-14T23%3A45%3A53Z&ske=2024-09-15T23%3A45%3A53Z&sks=b&skv=2024-08-04&sig=OlaWv4OiJL1dnw0mqaBTqLLUfUhnTBOpsTM3/e2PSp0%3D'), ("Finally, evaluate your creation! Use benchmarks to test your LLM's performance and ensure it meets your initial objectives.", 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-E3z4Ifngc2qF725zZatcILSr/user-UoVxEDqSBDJVQN0HNdNlkw2a/img-oj4YLaXvi1NYkxcfKL70ekhb.png?st=2024-09-15T04%3A38%3A53Z&se=2024-09-15T06%3A38%3A53Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-14T23%3A32%3A28Z&ske=2024-09-15T23%3A32%3A28Z&sks=b&skv=2024-08-04&sig=nbhbLhrHL/PjEBwfPwQhk%2BNuTrSGIsCWBxgjf6K0IUA%3D')]


def llm_call(history, api_key:str):
  headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
  }

  # Getting the base64 string
  payload = {
    "model": "gpt-4o",
    "messages": history,
    "max_tokens": 1000
  }
  response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
  answer = response.json()["choices"][0]["message"]["content"]
  return answer

def agent_call(llm_input, query, context):
    input = query + "\n" + context 
    user_input = {"role": "user", "content": input}
    llm_input.append(user_input)
    query = query
    llm_out = llm_call(llm_input, api_key)
    return llm_out


if __name__ == "__main__":
    query = "how do I build an llm"
    
    # print(type(youtube_search(query=query)))
    # search_outs = tavily_search(query=query)
    # print(search_outs)
    # context = get_content_from_tavily_search(search_outs)
    # # print(agent_call(llm_input=sys_message, query=query, context=context))
    # print(agent_call(llm_input=sys_message_lyrics, query=query, context=context))

    # print(image_search(query))