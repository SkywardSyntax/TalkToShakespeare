// Import the GoogleGenerativeAI object from the appropriate module
// This line might need to be adjusted depending on the actual module you're using
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the model object
const API_KEY = "AIzaSyC3WRBpDQwAh0CHTWFkkQcolD_Zo7RPyWs";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

// Set up the event listener for the send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Get the user input and send button elements
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Add an event listener for the keypress event
userInput.addEventListener('keypress', function(event) {
    // Check if the pressed key was the Enter key
    if (event.key === 'Enter') {
        // Prevent the default action to avoid a form submit
        event.preventDefault();

        // Click the send button
        sendButton.click();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatHistory = document.getElementById('chat-history');

    // Check if the user's input is empty
    if (userInput.value.trim() === '') {
        // The input is empty, return from the function without sending the message
        return;
    }

    // Add user's message to chat history
    chatHistory.innerHTML += `<div class="message user-message"><strong>User:</strong><br>${userInput.value}</div>`;

    // Scroll the chat history to the bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Get the entire chat history as a string
    const chatHistoryText = chatHistory.innerText;

    // Concatenate the chat history with the current user's message if the chat history is not empty
    // Add special characters or a specific string before and after the current message
    const inputToModel = chatHistoryText.trim() !== '' ? chatHistoryText + "\n---\n" + userInput.value + "\n---\n" : userInput.value;

    const result = await model.generateContent(inputToModel);
    const response = await result.response;
    const text = response.text();

    // Create a showdown converter
    const converter = new showdown.Converter();

    // Convert the Markdown text to HTML
    const html = converter.makeHtml(text);

    // Add model's response to chat history
    chatHistory.innerHTML += `<div class="message model-message"><strong>Model:</strong> ${html}</div>`;

    // Scroll the chat history to the bottom again
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Clear the typing box
    userInput.value = '';

    console.log('Message sent successfully.');
}