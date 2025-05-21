from bots.base_bot import BaseBot  # 👈 Import BaseBot

class IntentBot(BaseBot):
    def detect_intent(self, user_message):
        # We'll send a system prompt that asks OpenAI to pick intent
        system_msg = (
            "You are an intent detection assistant. "
            "Classify the user input into one of: conversation, grammar, confused. "
            "Respond only with the intent keyword."
        )
        prompt = [{"role": "system", "content": system_msg}] + [{"role": "user", "content": user_message}]
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=prompt
        )
        intent = response.choices[0].message.content.strip().lower()
        return intent

