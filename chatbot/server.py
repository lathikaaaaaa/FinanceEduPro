from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from transformers import pipeline
import os
from getpass import getpass

app = Flask(__name__)  # Use __name__ here
CORS(app)  # Enable CORS for all routes

# Load Hugging Face API token
HUGGINGFACEHUB_API_TOKEN = getpass("Enter your Hugging Face Hub API token: ")
os.environ['HUGGINGFACEHUB_API_TOKEN'] = HUGGINGFACEHUB_API_TOKEN

# Load model
model_name = "google/flan-t5-small"
chatbot = pipeline("text2text-generation", model=model_name)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')
    
    # Define responses for specific cases
    greetings = ["hi", "hello", "good morning", "good evening", "hey"]
    farewells = ["bye", "goodbye", "see you later", "take care"]

    # Normalize user input
    normalized_input = user_input.lower().strip()

    if normalized_input in greetings:
        response_text = "Finance Chatbot: Hello! How can I assist you with your finance questions today?"
    elif normalized_input in farewells:
        response_text = "Finance Chatbot: Goodbye! Have a great day!"
    elif normalized_input == "what is tax":
        response_text = "Finance Chatbot: Tax is a mandatory financial charge or levy imposed by a government on individuals or businesses. It is used to fund public services and infrastructure."
    else:
        # Use the model for other queries
        prompt = f"Answer this finance-related question: {user_input}"
        response = chatbot(prompt)
        response_text = f"Finance Chatbot: {response[0]['generated_text']}"

    return jsonify({"text": response_text})

if __name__ == '__main__':  # Use __name__ here
    app.run(port=5000)
