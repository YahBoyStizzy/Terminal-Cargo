/* =========================
   GM DEVICE TOGGLE
   ========================= */

// SET ONE TO true
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
   FAKE COMMAND LOGS
   ========================= */

const logs = {
  help: `
AVAILABLE COMMANDS:
> logs
> status
> unlock
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

  unlock: `
ACCESS DENIED
INCORRECT CREDENTIALS
`
};

const terminal = document.getElementById("terminal");

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const lines = terminal.textContent.trim().split("\n");
    const last = lines[lines.length - 1].replace("> ", "").toLowerCase();

    terminal.textContent += logs[last] || "\nUNKNOWN COMMAND";
  }
});
