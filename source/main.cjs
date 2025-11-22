"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, ipcMain = _a.ipcMain;
var path = require("node:path");
var fs = require("fs");
// const FILE_PATH = path.join(__dirname, "..", "data", "sets.json");
var FILE_PATH = path.join(app.getPath("userData"), "sets.json");
var win = null;
var createWindow = function () {
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
    });
    // win?.setMenu(null);
    // win?.loadFile(path.join(__dirname, "..", "dist-react", "index.html"));
    win === null || win === void 0 ? void 0 : win.loadURL('http://localhost:5173');
    win === null || win === void 0 ? void 0 : win.on("closed", function () {
        win = null;
    });
};
ipcMain.on("window:minimize", function () { return win === null || win === void 0 ? void 0 : win.minimize(); });
ipcMain.on("window:toggleMaximize", function () {
    if (!win)
        return;
    win.isMaximized() ? win === null || win === void 0 ? void 0 : win.unmaximize() : win === null || win === void 0 ? void 0 : win.maximize();
});
ipcMain.on("window:close", function () { return win === null || win === void 0 ? void 0 : win.close(); });
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "[]", "utf8");
}
ipcMain.handle("load-json", function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        try {
            data = fs.readFileSync(FILE_PATH, "utf8");
            return [2 /*return*/, JSON.parse(data)];
        }
        catch (err) {
            console.error("Error loading JSON:", err);
            return [2 /*return*/, []];
        }
        return [2 /*return*/];
    });
}); });
ipcMain.handle("save-json", function (_, newSet) { return __awaiter(void 0, void 0, void 0, function () {
    var currentData, fileContent;
    return __generator(this, function (_a) {
        try {
            currentData = [];
            if (fs.existsSync(FILE_PATH)) {
                fileContent = fs.readFileSync(FILE_PATH, "utf8");
                if (fileContent.trim() !== "") {
                    currentData = JSON.parse(fileContent);
                }
            }
            if (!Array.isArray(currentData)) {
                currentData = [];
            }
            currentData.push(newSet);
            fs.writeFileSync(FILE_PATH, JSON.stringify(currentData, null, 2), "utf8");
            return [2 /*return*/, { ok: true }];
        }
        catch (err) {
            console.error("Error saving JSON:", err);
            return [2 /*return*/, { ok: false, error: err.message }];
        }
        return [2 /*return*/];
    });
}); });
ipcMain.handle("delete-json", function (_, id) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dataParsed, filterSets;
    return __generator(this, function (_a) {
        try {
            data = fs.readFileSync(FILE_PATH, "utf8");
            dataParsed = JSON.parse(data);
            filterSets = dataParsed.filter(function (set) { return set.id !== id; });
            fs.writeFileSync(FILE_PATH, JSON.stringify(filterSets, null, 2), "utf8");
            return [2 /*return*/, { ok: true }];
        }
        catch (err) {
            console.error("Error deleting Set", err);
            return [2 /*return*/, { ok: false, error: err.message }];
        }
        return [2 /*return*/];
    });
}); });
ipcMain.handle("edit-json", function (_, data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataSets, dataParsed, setIndex;
    return __generator(this, function (_a) {
        try {
            dataSets = fs.readFileSync(FILE_PATH, "utf8");
            dataParsed = JSON.parse(dataSets);
            setIndex = dataParsed.findIndex(function (set) { return set.id === data.id; });
            if (setIndex !== -1) {
                dataParsed[setIndex] = data;
                fs.writeFileSync(FILE_PATH, JSON.stringify(dataParsed, null, 3), "utf8");
                return [2 /*return*/, { ok: true }];
            }
            return [2 /*return*/, { ok: false, error: "Set not found" }];
        }
        catch (err) {
            console.error(err);
            return [2 /*return*/, { ok: false, error: err.message }];
        }
        return [2 /*return*/];
    });
}); });
app.whenReady().then(function () {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
