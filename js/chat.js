// URL de tu webhook de n8n (PRODUCTION URL)
const WEBHOOK_URL = "https://brkkomunikazioa.app.n8n.cloud/webhook/fp-bot";

// Referencias a elementos del DOM (ajusta los IDs a tu HTML)
const chatButton     = document.getElementById("chat-button");      // botón flotante
const chatContainer  = document.getElementById("chat-container");   // ventana de chat
const closeChat      = document.getElementById("chat-close");       // botón cerrar
const sendButton     = document.getElementById("chat-send");        // botón enviar
const inputField     = document.getElementById("chat-input");       // caja de texto
const messagesDiv    = document.getElementById("chat-messages");    // contenedor mensajes

// Idioma por defecto (si luego quieres, puedes cambiarlo con botones ES/EU)
let chatLang = "es";

// Abrir el chat
if (chatButton && chatContainer) {
  chatButton.addEventListener("click", () => {
    chatContainer.classList.remove("hidden");
  });
}

// Cerrar el chat
if (closeChat && chatContainer) {
  closeChat.addEventListener("click", () => {
    chatContainer.classList.add("hidden");
  });
}

// Enviar mensaje al hacer click en el botón
if (sendButton) {
  sendButton.addEventListener("click", sendMessage);
}

// Enviar mensaje al pulsar Enter
if (inputField) {
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });
}

// Función principal de envío
async function sendMessage() {
  const text = inputField.value.trim();
  if (!text) return;

  addMessage(text, "user");
  inputField.value = "";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        lang: chatLang
      }),
    });

    const data = await response.json();
    const answer = data.answer || "Ahora mismo no puedo responder.";
    addMessage(answer, "bot");
  } catch (error) {
    console.error("Error llamando al webhook:", error);
    addMessage("Error al conectar con el servidor.", "bot");
  }
}

// Añadir un mensaje al chat (usuario o bot)
function addMessage(text, sender) {
  if (!messagesDiv) return;
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "chat-msg-user" : "chat-msg-bot";
  msg.innerText = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

