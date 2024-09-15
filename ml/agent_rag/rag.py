from langchain_community.tools import YouTubeSearchTool
from tavily import TavilyClient
from duckduckgo_search import DDGS
import requests
import os
from dotenv import load_dotenv
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

def image_search(query, n = 5):
    urls, titles = [], []
    results = DDGS().images(query, max_results=5)
    for result in results:
        urls.append(result["image"])
        titles.append(result["title"])
    return urls, titles

sys_prompt = """You are a helpful assistant that creates learning materials in MARKDOWN based on the CONTEXT below and the user's questions."""

api_key = os.getenv("OPENAI_API_KEY")

sys_message = [{"role": "system", "content": sys_prompt}]

def llm_call(history, api_key:str):
  headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
  }

  # Getting the base64 string
  payload = {
    "model": "gpt-4o-mini",
    "messages": history,
    "max_tokens": 1000
  }
  response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
  answer = response.json()["choices"][0]["message"]["content"]
  return answer

def agent_call(llm_input, query, context):
    # input = query + "\n" + context
    # user_input = {"role": "user", "content": input}
    # llm_input.append(user_input)
    # query = query
    # llm_out = llm_call(llm_input, api_key)
    # return llm_out
    return "dummy_output"

if __name__ == "__main__":
    query = "how do I build an llm"
    print(type(youtube_search(query=query)))
    search_outs = tavily_search(query=query)
    print(search_outs)
    context = get_content_from_tavily_search(search_outs)
    print(agent_call(llm_input=sys_message, query=query, context="I am trying to build an LLM"))
    # print(image_search()