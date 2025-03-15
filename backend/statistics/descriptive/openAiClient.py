from openai import OpenAI
import json
from dotenv import load_dotenv
import os

load_dotenv()

class OpenAiClient:
    def __init__(self, api_key: str, base_url: str = os.getenv("LLM_ENDPOINT")):
        self.client = OpenAI(api_key=api_key, base_url=base_url)

    def generate_response(self, messages, model: str = os.getenv("LLM_MODEL")):
        response = self.client.chat.completions.create(
            model=model,
            messages=messages,
            stream=False
        )
        content = response.choices[0].message.content
        json_string = content.replace("```json\n", "").replace("```", "").strip()
        return json.loads(json_string)


OPEN_AI_CLIENT = OpenAiClient(os.getenv("LLM_API_KEY"))