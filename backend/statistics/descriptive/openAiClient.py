from openai import OpenAI

class OpenAiClient:
    def __init__(self, api_key: str, base_url: str = "https://api.deepseek.com"):
        self.client = OpenAI(api_key=api_key, base_url=base_url)

    def generate_response(self, messages, model: str = "deepseek-reasoner"):
        response = self.client.chat.completions.create(
            model=model,
            messages=messages,
            stream=False
        )
        return response.choices[0].message.content

OPEN_AI_CLIENT = OpenAiClient("sk-fafc8f647a044bbab2d6be26ded0c43e")