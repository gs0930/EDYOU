# Import necessary functions
from langchain.docstore.document import Document
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.embeddings.fastembed import FastEmbedEmbeddings

from langchain_iris import IRISVector

import os
curr_dir = os.getcwd()
data_path = os.path.join(curr_dir, "content.txt") 


# Helper functions

# Loads necessary document given learning style
def load_document(file_path):
    document_path = file_path

    loader = TextLoader(document_path, encoding='utf-8')
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size = 200, chunk_overlap = 30)
    
    docs = text_splitter.split_documents(documents)
    return docs

def get_answer(query, vectorstore, search_kwargs={}):
    """
    Perform similarity search in the vector store to return most relevant
    response (string).
    """

    # results = vectorstore.search(query, **search_kwargs)
    results = vectorstore.similarity_search_with_score(query)
    
    # Process the results
    if results:
        # Extract the most relevant result (assuming the first one is the most relevant)
        most_relevant_result = results[0]
        document = most_relevant_result[0]  # Document object
        
        return {
            "content": document.page_content
        }
        
    else:
        return {
            "content": "No relevant information found.",
            "score": 0
        }

# Query in --> string output

def vector_search_response(query, file_path = data_path, collection_name= "default"):
    """
    Utilizes vector search to determine appropriate response based on user query.
    Returns a string.

    Args:
        query: string input prompt from the user
        file_path: path to content.txt
        collection_name: name for the collection

    """
    # Connection string name definition
    username = 'demo'
    password = 'demo' 
    hostname = os.getenv('IRIS_HOSTNAME', 'localhost')
    port = '1972' 
    namespace = 'USER'
    CONNECTION_STRING = f"iris://{username}:{password}@{hostname}:{port}/{namespace}"

    # Load content from internal
    docs = load_document(file_path)
    
    # Defining the database
    db = IRISVector.from_documents(
        # Embedding function
        embedding = OpenAIEmbeddings(),
        # Stores all meaningful chunks
        documents = docs,
        collection_name = collection_name,
        connection_string = CONNECTION_STRING,
    )

    return get_answer(query, db, search_kwargs = {})['content']




# print(vector_search_response("Tell me about the Plymouth Colony", '/Users/kevinxie/Desktop/documents/content.txt', 'function_test'))