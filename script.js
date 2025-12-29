const content = document.getElementById("content");
const cursor = document.getElementById("cursor");
const pdaStatus = document.getElementById("pda-status");

let isTyping = false;
let inputBuffer = "";

// --------------------
// UTILITIES
// --------------------
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(text, speed = 40) {
  isTyping = true;
  for (let char of text) {
    content.textContent += char;
    scrollToBottom(); // Ensure we scroll down as we type
    await sleep(speed);
  }
  content.textContent += "\n";
  scrollToBottom();
  isTyping = false;
}

function prompt() {
  content.textContent += "> ";
  scrollToBottom();
}

// --------------------
// BOOT SEQUENCE
// --------------------
async function bootSequence() {
  await typeLine("SYS_BOOT SEQ 00.77", 50);
  await sleep(600);

  await typeLine("MEMORY CHECK ........ OK", 30);
  await sleep(400);

  await typeLine("POWER CORE STATUS ... STABLE", 30);
  await sleep(400);

  await typeLine("NAVIGATION ARRAY ... OFFLINE", 30);
  await sleep(400);

  await typeLine("LIFE SUPPORT ....... DEGRADED", 30);
  await sleep(600);

  await typeLine("SECURITY PROTOCOLS . ACTIVE", 30);
  await sleep(600);

  await typeLine("AUTHORIZATION REQUIRED", 50);
  await sleep(800);

  await typeLine("TYPE 'HELP' FOR AVAILABLE COMMANDS", 40);
  await sleep(400);

  pdaStatus.style.display = "block";
  prompt();
}

// --------------------
// COMMAND HANDLER
// --------------------
function handleCommand(cmd) {
  const command = cmd.trim().toUpperCase();

  content.textContent += command + "\n";
  scrollToBottom();

  switch (command) {
    case "HELP":
      content.textContent +=
      scrollToBottom();
`AVAILABLE COMMANDS:
- HELP
- LOGS
- CREW
- SECURITY
- CLEAR

`;
      break;

    case "LOGS":
      content.textContent +=
      scrollToBottom();
`ACCESSING SHIP LOGS...
ERROR: MULTIPLE ENTRIES CORRUPTED
LAST CLEAN LOG: DAY 184

`;
      break;

    case "CREW":
      content.textContent +=
      scrollToBottom();
`CREW ROSTER:
- CAPTAIN: STATUS UNKNOWN
- ENGINEER: DECEASED
- MEDICAL: MISSING
- YOU

`;
      break;

    case "SECURITY":
      content.textContent +=
      scrollToBottom();
`SECURITY STATUS:
LOCKDOWNS: PARTIAL
CAMERAS: OFFLINE
THREAT INDEX: ELEVATED

`;
      break;

    case "CLEAR":
      content.textContent = "";
      scrollToBottom();
      break;

    default:
      content.textContent += "UNKNOWN COMMAND\n\n";
  }

  prompt();
}

// --------------------
// INPUT LISTENER
// --------------------
document.addEventListener("keydown", (e) => {
  if (isTyping) return;

  if (e.key === "Backspace") {
    inputBuffer = inputBuffer.slice(0, -1);
    content.textContent = content.textContent.slice(0, -1);
  } 
  else if (e.key === "Enter") {
    content.textContent += "\n";
    handleCommand(inputBuffer);
    inputBuffer = "";
  } 
  else if (e.key.length === 1) {
    inputBuffer += e.key;
    content.textContent += e.key;
  }
});

// --------------------
// STARTUP DELAY
// --------------------
setTimeout(() => {
  bootSequence();
}, 15000); // 15 seconds

// --------------------
// AUTO-SCROLL TERMINAL
// --------------------
function scrollToBottom() {
  const terminal = document.getElementById("terminal");
  terminal.scrollTop = terminal.scrollHeight;
}
