from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai
import os

from chatbot_config import CHATBOT_PROMPT

load_dotenv()

app = Flask(__name__)

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel(
    "gemini-1.5-flash",
    system_instruction=CHATBOT_PROMPT
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({
            "reply": "Please enter a message."
        })

    try:
        response = model.generate_content(user_message)

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        return jsonify({
            "reply": "Sorry, something went wrong."
        })


if __name__ == "__main__":
    app.run(debug=True)