// electron/preload.cts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window:minimize"),
  toggleMaximize: () => ipcRenderer.send("window:toggleMaximize"),
  close: () => ipcRenderer.send("window:close"),
});

try {
  contextBridge.exposeInMainWorld("CRUD", {
    saveJSON: (data: any) => ipcRenderer.invoke("save-json", data),
    loadJSON: () => ipcRenderer.invoke("load-json"),
    deleteJSON: (id: string) => ipcRenderer.invoke("delete-json", id),
    editJSON: (data: any) => ipcRenderer.invoke("edit-json", data),
  });
  console.log("CRUD registrado");
} catch (err) {
  console.error("Error exponiendo CRUD:", err);
}

