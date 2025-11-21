const WEBHOOK_URL = https://brkkomunikazioa.app.n8n.cloud/workflow/zVpgXzpRCI5Viw6M; 

const chatButton = document.getElementById("chat-button");
const chatContainer = document.getElementById("chat-container");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("chat-input");
const messagesDiv = document.getElementById("chat-messages");

// Abrir chat
chatButton.addEventListener("click", () => {
    chatContainer.classList.remove("hidden");
});

// Cerrar chat
closeChat.addEventListener("click", () => {
    chatContainer.classList.add("hidden");
});

// Enviar mensaje
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta: text })
    })
    .then(r => r.json())
    .then(data => {
        addMessage(data.respuesta || "Sin respuesta", "bot");
    })
    .catch(() => {
        addMessage("Hubo un error al procesar tu solicitud.", "bot");
    });
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.classList.add("message", type);
    div.innerText = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


