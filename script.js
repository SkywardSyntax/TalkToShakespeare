document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            displayMessage(message, 'user');
            fetchGeminiResponse(message);
            userInput.value = ''; // Clear input after sending
        }
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = sender;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to the bottom
    }

    function fetchGeminiResponse(message) {
        // Placeholder for Gemini API request
        // This function should send the user's message to the Gemini API
        // and then display the response using displayMessage function.
        // Example: displayMessage(response, 'gemini');
        
        // Simulating API response delay
        setTimeout(() => {
            const simulatedResponse = "This is a simulated response from Gemini.";
            displayMessage(simulatedResponse, 'gemini');
        }, 1500);
    }
});
