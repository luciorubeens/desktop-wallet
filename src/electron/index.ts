/* eslint-disable @typescript-eslint/no-var-requires */
import "../plugin/plugins";

import { app, BrowserWindow, screen } from "electron";
import isDev from "electron-is-dev";
import winState, { State } from "electron-window-state";
import path from "path";

// import assignMenu from "./menu";

let mainWindow: BrowserWindow | undefined;
let windowState: State;
let deeplinkingUrl: string | undefined;

const winURL = isDev ? "http://localhost:3000" : `file://${path.resolve("build/index.html")}`;

const isE2E = process.env.NODE_ENV === "e2e";

const installExtensions = async () => {
	if (isDev && !isE2E) {
		const installer = require("electron-devtools-installer");
		const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
		const extensions = ["REACT_DEVELOPER_TOOLS"];

		return Promise.all(extensions.map((name) => installer.default(installer[name], forceDownload))).catch(
			console.log,
		);
	}
};

function broadcastURL(url: string | undefined) {
	if (!url || typeof url !== "string") {
		return;
	}

	if (mainWindow && mainWindow.webContents) {
		mainWindow.webContents.send("process-url", url);
		deeplinkingUrl = undefined;
	}
}

function createWindow() {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	windowState = winState({
		defaultWidth: width,
		defaultHeight: height,
		fullScreen: false,
	});

	mainWindow = new BrowserWindow({
		width: windowState.width,
		height: windowState.height,
		x: windowState.x,
		y: windowState.y,
		backgroundColor: "#f7fafb",
		center: true,
		show: true,
		webPreferences: {
			nodeIntegration: true,
			webviewTag: true,
		},
	});

	windowState.manage(mainWindow);
	mainWindow.loadURL(winURL);
	mainWindow.setBackgroundColor("#f7fafb");
	mainWindow.setContentProtection(true);

	mainWindow.on("close", () => (mainWindow = undefined));
	mainWindow.on("closed", () => (mainWindow = undefined));

	mainWindow.webContents.on("did-finish-load", () => {
		const version = app.getVersion();
		const windowTitle = `ARK Desktop Wallet ${version}`;
		mainWindow?.setTitle(windowTitle);

		broadcastURL(deeplinkingUrl);
	});

	if (isDev && !isE2E) {
		// installExtensions()
		// 	.then(() => mainWindow?.webContents.openDevTools())
		// 	.catch((error) => console.error(error));
	}
}

// app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		// createWindow();
	}
});

app.on("open-url", (event, url) => {
	// Protocol handler for osx
	event.preventDefault();
	deeplinkingUrl = url;
	broadcastURL(deeplinkingUrl);
});

app.setAsDefaultProtocolClient("ark", process.execPath, ["--"]);
