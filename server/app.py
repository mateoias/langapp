from flask import Flask, request, jsonify, session
from flask_cors import CORS  # import CORS
from flask_session import Session
from openai import OpenAI
import json
import os
from bots.base_bot import BaseBot
from bots.convo_bot import ConversationBot
from bots.confusion_bot import ConfusionBot
from bots.grammar_bot import GrammarBot
from bots.intent_bot import IntentBot

from dotenv import load_dotenv
load_dotenv()
api_key=os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

print(api_key)
app = Flask(__name__)
app.secret_key = "mateoias"  # Replace with a strong secret key
app.config["SESSION_TYPE"] = "filesystem"  # or "redis" if you want persistence beyond memory
Session(app)
CORS(app)
USER_FILE = 'users.json'

# Load users
def load_users():
    if os.path.exists(USER_FILE):
        with open(USER_FILE, 'r') as f:
            return json.load(f)
    return {}

# Save users
def save_users(users):
    with open(USER_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    users = load_users()

    if email in users:
        return jsonify({'success': False, 'message': 'User already exists'}), 400

    users[email] = {'password': password}
    save_users(users)

    return jsonify({'success': True, 'message': 'Account created'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    users = load_users()

    if users.get(email, {}).get('password') == password:
        return jsonify({'success': True, 'message': 'Login successful'})
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401



@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get("message", "").strip()
        if not user_message:
            return jsonify({"error": "Empty message"}), 400

        # Initialize session messages if not already present
        if "messages" not in session:
            session["messages"] = []

        # Step 1: Detect intent (pass user message only)
        intent_bot = IntentBot([], client)  # No history, just the user message
        intent = intent_bot.detect_intent(user_message)
        print("intent bot says intent is: ", intent)
        # Step 2: Choose the correct bot
        all_messages = session["messages"] + [{"role": "user", "content": user_message}]
        if intent == "grammar":
            bot = GrammarBot(all_messages, client)
        elif intent == "confused":
            bot = ConfusionBot(all_messages, client)
        else:
            bot = ConversationBot(all_messages, client)

        # Step 3: Get the bot response
        bot_response = bot.get_response()
        print("bot response in app.py is: ", bot_response) 
    
        # Step 4: Update session history (excluding intent detection)
        session["messages"].append({"role": "user", "content": user_message})
        session["messages"].append({"role": "assistant", "content": bot_response})
        session.modified = True

        return jsonify({"response": bot_response, "intent": intent})

    except Exception as e:
        print("Error during OpenAI call:", str(e))
        return jsonify({'error': 'Something went wrong on the server.'}), 500


if __name__ == '__main__':
    app.run(debug=True)
