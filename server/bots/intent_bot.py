from bots.base_bot import BaseBot  # 👈 Import BaseBot

class IntentBot(BaseBot):
    def detect_intent(self, conversation):
        system_msg = """
                You are an intent detection assistant. 
                The user is trying to learn a language, so they may make mistakes or use English words,
                but they still want to have a conversation
                Sometimes they may be completely lost and not following the conversation, in which case they are confused.
                Sometimes they may have a grammar or vocabulary question so they want grammar.
                Classify the overall user intent in this conversation so far
                as one of: conversation, grammar, confused. 
                Respond only with the intent keyword."""
        
        prompt = [ {"role": "system", "content": system_msg}] + conversation

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=prompt
        )
        intent = response.choices[0].message.content.strip().lower()
        return intent


