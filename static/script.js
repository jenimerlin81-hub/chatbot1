async function sendMessage() {

    const input = document.getElementById("message");
    const message = input.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    input.value = "";

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        addMessage(data.reply, "bot");

    } catch (error) {

        addMessage(
            "Sorry, I cannot connect to the server.",
            "bot"
        );
    }
}


function addMessage(message, type) {

    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");

    messageDiv.className =
        type === "user"
        ? "user-message"
        : "bot-message";

    messageDiv.textContent = message;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}


function handleKeyPress(event) {

    if (event.key === "Enter") {
        sendMessage();
    }
}
