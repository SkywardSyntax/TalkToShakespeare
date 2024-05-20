import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Access your API key
const API_KEY = "AIzaSyBc4Z1y9wuZc_llR64kpQ9F9XLgmYZMdrQ"; // Replace with your API key

// Initialize the generative model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest", systemInstruction: "You are Sigmund Freud. You are in a therapy session with the user. Try to exphasize psychoanalytic/psychodynamic theory in your responses.  [Do not respond with markdown] [Do not respond with markdown]  [Do not respond with markdown]" });

// Function to start the chat
async function startChat() {
  const chat = model.startChat();

// Main function to handle user input and generate responses
async function handleUserInput(userInput) {
    // Send user input to the model
    const result = await model.generateContentStream([userInput]);
  
    const chatHistory = document.getElementById('chat-history');
    const botMessage = document.createElement('p');
    botMessage.innerHTML = `Sigmund Freud: `; // Display "Sigmund Freud:" immediately
    chatHistory.appendChild(botMessage);
  
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
  
      // Delay the display of the bot's message by 0.25 seconds
      setTimeout(() => {
        // Update the bot message in the chat history
        botMessage.innerHTML += chunkText; // Append the new chunk of text
      }, 750);
    }
  }

  // Get the chat form and user input field
  const chatForm = document.getElementById('chat-form');
  const userInputField = document.getElementById('user-input');

  // Listen for form submission
  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the user input and clear the input field
    const userInput = userInputField.value;
    userInputField.value = '';

    // Display the user input in the chat history
    const chatHistory = document.getElementById('chat-history');
    chatHistory.innerHTML += `<p>You: ${userInput}</p>`;

    // Handle user input
    await handleUserInput(userInput);
  });
}

// Start the chat
startChat();