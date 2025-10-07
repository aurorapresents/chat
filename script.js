const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getResponse(input) {
  input = input.toLowerCase().trim();
  let matchedKey = Object.keys(knowledgeBase).find(key =>
    input.includes(key)
  );

  if (matchedKey) {
    const responses = knowledgeBase[matchedKey];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  const fallback = [
    "Hmm… I’m still learning about that.",
    "I’m not sure yet, but it sounds interesting!",
    "Can you ask that in another way?",
    "That’s a great question! I’ll need more data for that."
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
}

function typeWriterEffect(text, sender) {
  let i = 0;
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;

  const interval = setInterval(() => {
    msg.textContent += text.charAt(i);
    i++;
    chatLog.scrollTop = chatLog.scrollHeight;
    if (i >= text.length) clearInterval(interval);
  }, 20);
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getResponse(text);
    typeWriterEffect(reply, "bot");
  }, 600);
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});
