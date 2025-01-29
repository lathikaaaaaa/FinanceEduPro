document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    const chatBody = document.querySelector('.chat-body');

    const rasaUrl = 'http://localhost:5005/webhooks/rest/webhook'; // URL of your Rasa server

    async function sendMessage(message) {
        try {
            const response = await fetch(rasaUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            // Check if response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log('Rasa response:', data); // Log response data for debugging
            return data;
        } catch (error) {
            console.error('Error sending message:', error);
            return [];
        }
    }

    function displayMessage(message, isUser = true) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Display a default message when the page loads
    function displayDefaultMessage() {
        const defaultMessage = "How can I assist you with your financial goals today?";
        displayMessage(defaultMessage, false); // Display bot's default message
    }

    sendButton.addEventListener('click', async () => {
        const messageText = inputField.value;
        if (messageText.trim()) {
            displayMessage(messageText); // Display user message
            inputField.value = '';

            // Send message to Rasa
            const response = await sendMessage(messageText);
            if (response && response.length > 0) {
                response.forEach(msg => {
                    if (msg.text) {
                        displayMessage(msg.text, false); // Display bot response
                    } else {
                        console.error('Unexpected response format:', msg);
                    }
                });
            } else {
                displayMessage('No response from bot', false);
            }
        }
    });

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Call the function to display the default message
    displayDefaultMessage();
});
