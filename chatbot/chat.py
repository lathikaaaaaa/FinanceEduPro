import os
from getpass import getpass
from transformers import pipeline

# Get the Hugging Face API token and set it as an environment variable
HUGGINGFACEHUB_API_TOKEN = getpass("Enter your Hugging Face Hub API token: ")
os.environ['HUGGINGFACEHUB_API_TOKEN'] = HUGGINGFACEHUB_API_TOKEN

# Initialize the chatbot model
model_name = "google/flan-t5-small"
chatbot = pipeline("text2text-generation", model=model_name)

def get_response(user_input):
    # Define responses for specific cases
    greetings = ["hi", "hello", "good morning", "good evening", "hey"]
    farewells = ["bye", "goodbye", "see you later", "take care"]
    topic_responses = {
        "women and investment": "Investing can help women achieve financial independence and security. Consider diverse portfolios and long-term strategies to build wealth.",
        "financial planning for families": "Effective financial planning for families involves budgeting, saving for emergencies, and planning for future expenses like education and retirement.",
        "retirement planning for women": "Women should focus on retirement planning by investing early, understanding pension benefits, and saving for long-term financial stability.",
        "debt management": "Debt management includes creating a repayment plan, prioritizing high-interest debts, and avoiding new debt while maintaining a budget.",
        "women in entrepreneurship": "Women in entrepreneurship can benefit from networking, seeking mentorship, and accessing resources designed to support female business owners.",
        "financial literacy": "Financial literacy involves understanding basic financial concepts like budgeting, investing, and managing credit to make informed decisions.",
        "insurance needs": "Insurance needs vary based on personal circumstances. Common types include health, life, auto, and home insurance to protect against unforeseen events.",
        "navigating financial abuse": "Navigating financial abuse involves recognizing signs, seeking help from support organizations, and regaining financial independence through education and resources.",
        "tax planning": "Tax planning helps minimize tax liabilities through strategies like deductions, credits, and tax-efficient investments.",
        "wealth building and legacy planning": "Wealth building and legacy planning include strategies for accumulating assets and planning how to transfer wealth to future generations."
    }
    
    # Normalize user input
    normalized_input = user_input.lower().strip()

    if normalized_input in greetings:
        return " Hello! How can I assist you with your finance questions today?"
    elif normalized_input in farewells:
        return " Goodbye! Have a great day!"
    elif normalized_input == "what is tax":
        return " Tax is a mandatory financial charge or levy imposed by a government on individuals or businesses. It is used to fund public services and infrastructure."
    elif normalized_input in topic_responses:
        return f"{topic_responses[normalized_input]}"
    else:
        # Use the model for other queries
        prompt = f"Answer this finance-related question: {user_input}"
        response = chatbot(prompt)
        return f"{response[0]['generated_text']}"

def chat_with_bot():
    print("Finance Chatbot: Hello! I'm here to help you with your finance questions.")
    print("You can ask me about budgeting, investing, savings, and more.")
    print("Type 'exit' to end the chat.")

    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("Goodbye!")
            break
        
        response = get_response(user_input)
        print(response)

chat_with_bot()
