class BaseBot:
    def __init__(self, messages, client):
        self.messages = messages
        self.client = client

    def build_prompt(self, system_message):
        return [{"role": "system", "content": system_message}] + self.messages

    def ask_openai(self, system_message):
        prompt = self.build_prompt(system_message)
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=prompt
        )
        return response.choices[0].message.content

