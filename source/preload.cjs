"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// electron/preload.cts
var _a = require("electron"), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
contextBridge.exposeInMainWorld("electronAPI", {
    minimize: function () { return ipcRenderer.send("window:minimize"); },
    toggleMaximize: function () { return ipcRenderer.send("window:toggleMaximize"); },
    close: function () { return ipcRenderer.send("window:close"); },
});
try {
    contextBridge.exposeInMainWorld("CRUD", {
        saveJSON: function (data) { return ipcRenderer.invoke("save-json", data); },
        loadJSON: function () { return ipcRenderer.invoke("load-json"); },
        deleteJSON: function (id) { return ipcRenderer.invoke("delete-json", id); },
        editJSON: function (data) { return ipcRenderer.invoke("edit-json", data); },
    });
    console.log("CRUD registrado");
}
catch (err) {
    console.error("Error exponiendo CRUD:", err);
}
