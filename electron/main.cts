const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("node:path");
const fs = require("fs");
// const FILE_PATH = path.join(__dirname, "..", "data", "sets.json");
const FILE_PATH = path.join(app.getPath("userData"), "sets.json");

let win: import("electron").BrowserWindow | null = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    autoHideMenuBar: true,
    icon: "./public/icons/favicon.ico",
    title: "FlashCards App",
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      webSecurity: true,
      backgroundThrottling: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // win?.setMenu(null);
  // win?.loadFile(path.join(__dirname, "..", "dist-react", "index.html"));
  win?.loadURL('http://localhost:5173');

  win?.on("closed", () => {
    win = null;
  });
}

ipcMain.on("window:minimize", () => win?.minimize());
ipcMain.on("window:toggleMaximize", () => {
  if (!win) return;
  win.isMaximized() ? win?.unmaximize() : win?.maximize();
})
ipcMain.on("window:close", () => win?.close());

if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "[]", "utf8");
}

ipcMain.handle("load-json", async () => {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error loading JSON:", err);
        return [];
    }
});

ipcMain.handle("save-json", async (_: any, newSet: any) => {
  try {
    let currentData = [];

    if (fs.existsSync(FILE_PATH)) {
      const fileContent = fs.readFileSync(FILE_PATH, "utf8");
      if (fileContent.trim() !== "") {
        currentData = JSON.parse(fileContent);
      }
    }

    if (!Array.isArray(currentData)) {
      currentData = [];
    }

    currentData.push(newSet);
    fs.writeFileSync(FILE_PATH, JSON.stringify(currentData, null, 2), "utf8");
    return { ok: true }

  } catch (err: any) {
    console.error("Error saving JSON:", err);
    return { ok: false, error: err.message };
  }
});

ipcMain.handle("delete-json", async(_: any, id: string) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const dataParsed = JSON.parse(data) as any[];

    const filterSets = dataParsed.filter(set => set.id !== id);
    fs.writeFileSync(FILE_PATH, JSON.stringify(filterSets, null, 2), "utf8");
    return { ok: true }

  } catch (err: any) {
    console.error("Error deleting Set", err);
    return { ok: false, error: err.message };
  }
})

ipcMain.handle("edit-json", async(_: any, data: any) => {
  try {
    const dataSets = fs.readFileSync(FILE_PATH, "utf8");
    const dataParsed = JSON.parse(dataSets) as any[];

    const setIndex = dataParsed.findIndex(set => set.id === data.id);

    if (setIndex !== -1) {
      dataParsed[setIndex] = data;
      fs.writeFileSync(FILE_PATH, JSON.stringify(dataParsed, null, 3), "utf8");

      return { ok: true }
    }

    return { ok: false, error: "Set not found" }

  } catch (err: any) {
    console.error(err);
    return { ok: false, error: err.message }
  }
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})