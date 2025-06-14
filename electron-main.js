const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = process.argv.includes("--dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "public", "android-chrome-512x512.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (isDev) {
    // In development mode, load from localhost:3000
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  } else {
    // In production mode, load from the built Next.js output
    win.loadFile(path.join(__dirname, ".next/server/pages/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
