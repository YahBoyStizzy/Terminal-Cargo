/* =========================
   GM DEVICE TOGGLE
   ========================= */

const CRT = true;
const TABLET = false;

const device = document.querySelector(".device");

if (CRT) {
  device.classList.add("crt-mode");
  device.classList.remove("datapad-mode");
}

if (TABLET) {
  device.classList.add("datapad-mode");
  device.classList.remove("crt-mode");
}

/* =========================
   TERMINAL CORE
   ========================= */

const terminal = document.getElementById("content");
let currentInput = "";
let acceptingInput = false;

/* =========================
   BOOT SEQUENCE (TYPEWRITER)
   ========================= */

const bootLines = [
  "SYS_BOOT SEQ 00.77",
  "MEMORY CHECK ........ OK",
  "POWER FLOW .......... STABLE",
  "AUTH REQUIRED",
  "",
];

let bootLineIndex = 0;
let charIndex = 0;

function typeBoot() {
  if (bootLineIndex >= bootLines.length) {
    showPrompt();
    return;
  }

  const line = bootLines[bootLineIndex];

  if (charIndex < line.length) {
    terminal.textContent += line.charAt(charIndex);
    charIndex++;
    setTimeout(typeBoot, 35);
  } else {
    terminal.textContent += "\n";
    bootLineIndex++;
    charIndex = 0;
    setTimeout(typeBoot, 300);
  }
}

/* =========================
   PROMPT
   ========================= */

function showPrompt() {
  terminal.textContent += "> ";
  acceptingInput = true;
  currentInput = "";
}

/* =========================
   COMMAND HANDLER
   ========================= */

const commands = {
  help: `
AVAILABLE COMMANDS:
> help
> logs
> status
`,

  logs: `
LOG 001: CREW TRANSFER COMPLETE
LOG 002: LIFE SUPPORT ERROR
LOG 003: SIGNAL RECEIVED (ORIGIN UNKNOWN)
`,

  status: `
HULL INTEGRITY: 71%
POWER: FLUCTUATING
AI CORE: RESTRICTED
`,
};

function runCommand(cmd) {
  const output = commands[cmd.toLowerCase()] || "\nUNKNOWN COMMAND\n";
  terminal.textContent += output + "\n";
}

/* =========================
   KEYBOARD INPUT
   ========================= */

window.addEventListener("keydown", (e) => {
  if (!acceptingInput) return;

  if (e.key === "Enter") {
    acceptingInput = false;
    terminal.textContent += "\n";
    runCommand(currentInput);
    showPrompt();
  } 
  else if (e.key === "Backspace") {
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1);
      terminal.textContent = terminal.textContent.slice(0, -1);
    }
  } 
  else if (e.key.length === 1) {
    currentInput += e.key;
    terminal.textContent += e.key;
  }
});

/* =========================
   START TERMINAL
   ========================= */

typeBoot();
