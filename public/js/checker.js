document.getElementById('submit-btn').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBox = document.querySelector('.chat-box');
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Send input to the server for eligibility check
    const response = await fetch('/check-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: 20, citizenship: 'USA', education: 'High School' }) // Modify this as per the input.
    });

    const data = await response.json();

    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = data.eligibilityMessage;
    chatBox.appendChild(botMessage);

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById('user-input').value = ''; // Clear input field
});