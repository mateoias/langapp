from bots.base_bot import BaseBot  # 👈 Import BaseBot

class ConfusionBot(BaseBot):
    def get_response(self):
        system_msg = "You are a helpful assistant trying to clarify confusion."
        return self.ask_openai(system_msg)
