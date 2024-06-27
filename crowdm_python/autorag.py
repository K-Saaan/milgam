from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import TokenTextSplitter
from autorag.data.corpus import llama_text_node_to_parquet
import pandas as pd
import re

# df=pd.read_csv('./text_file.csv')

# def remove_special_characters(text):
#     return re.sub(r'[^a-zA-Z0-9가-힣\s]', '', text)


# # Apply the function to the 'text' column
# df['text'] = df['text'].apply(remove_special_characters)
# temp=[t for t in df['text']]

# final_nodes={'text': temp}
# final_nodes


# import pandas as pd

# # Example class definition
# class TextNode:
#     def __init__(self, text,name):
#         self.text = text
#         self.name=name
#         self.node_id, self.metadata = self.extract_metadata(text)

#     def extract_metadata(self, text, name):
#         # Extract document name

#         doc_name =name

#         # Split text into paragraphs


#         # Create metadata with paragraph indices
#         metadata = {'doc_name': name, 'paragraphs': []}
#         for index, paragraph in enumerate(paragraphs):
#             if paragraph.strip():  # Only consider non-empty paragraphs
#                 metadata['paragraphs'].append({
#                     'index': index,
#                     'content': paragraph.strip()
#                 })

#         node_id = f"{doc_name}_{hash(text)}"
#         return node_id, metadata

# def add_essential_metadata_llama_text_node(metadata, relationships):
#     # Merge relationships into metadata
#     metadata.update(relationships)
#     return metadata

# def llama_text_node_to_parquet(nodes, file_path):
#     corpus_df = pd.DataFrame(list(map(lambda node: {
#         'doc_id': node.node_id,
#         'contents': node.text,
#         'metadata': node.metadata  # No need to call add_essential_metadata_llama_text_node as metadata is already processed
#     }, nodes)))
#     corpus_df.to_parquet(file_path)
#     return corpus_df



# Example DataFrame creation (replace with your actual read_csv call)
df = pd.read_csv('./text_file2.csv')

# Function to remove special characters
def remove_special_characters(text):
    return re.sub(r'[^a-zA-Z0-9가-힣\s]', '', text)

# Apply the function to the 'text' column
df['text'] = df['text'].apply(remove_special_characters)

# Example class definition for TextNode
class TextNode:
    def __init__(self, text, name):
        self.text = text
        self.name = name
        self.node_id, self.metadata = self.extract_metadata(text, name)

    def extract_metadata(self, text, name):
        # Example metadata extraction (modify as per your needs)
        metadata = {
            'doc_name': name,
            'paragraphs': [{'index': idx, 'content': paragraph.strip()}
                           for idx, paragraph in enumerate(text.split('\n')) if paragraph.strip()]
        }

        node_id = f"{name}_{hash(text)}"  # Example node_id generation

        return node_id, metadata

# Function to convert TextNode objects to Parquet format
def llama_text_node_to_parquet(nodes, file_path):
    corpus_df = pd.DataFrame([{
        'doc_id': node.node_id,
        'contents': node.text,
        'metadata': node.metadata
    } for node in nodes])
    corpus_df.to_parquet(file_path)
    return corpus_df

# # Example usage to convert DataFrame rows to TextNode objects
# text_samples = zip(df['text'], df['name'])
# nodes = [TextNode(text, name) for text, name in text_samples]


# # Convert nodes to DataFrame and save to Parquet
# corpus_df = llama_text_node_to_parquet(nodes, './corpus4.parquet')


from llama_index.llms.openai import OpenAI
from autorag.data.qacreation import generate_qa_llama_index, make_single_content_qa
import nest_asyncio

import openai
import os
import nest_asyncio

api_key = os.getenv("OPENAI_API_KEY")
llm = OpenAI(api_key=api_key, model='gpt-3.5-turbo', temperature=1.0)

# 기존 이벤트 루프를 재사용할 수 있도록 설정
nest_asyncio.apply()

# corpus_df = pd.read_parquet('./corpus4.parquet')
# llm = OpenAI(model='gpt-3.5-turbo', temperature=1.0)
# qa_df = make_single_content_qa(corpus_df, 50, generate_qa_llama_index, llm=llm, question_num_per_content=1,
#                                output_filepath='./qa7.parquet')

# ---------------------------------------------------------------------------------------------------

from llama_index.llms.openai import OpenAI
from autorag.data.qacreation import generate_qa_llama_index, make_single_content_qa

prompt = """
Generate question and answer pairs for the given passage.answer in korean.

Passage:
{{text}}

Number of questions to generate: {{num_questions}}

Example:
[Q]: What is this?
[A]: This is a sample question.

Result:
"""

corpus_df = pd.read_parquet('./corpus4.parquet')
llm = OpenAI(model='gpt-3.5-turbo', temperature=1.0)
qa_df = make_single_content_qa(corpus_df, content_size=50, qa_creation_func=generate_qa_llama_index,
                               llm=llm, prompt=prompt, question_num_per_content=1)

qa_df.to_parquet('./qa7.parquet')

df = pd.read_parquet('./qa7.parquet')