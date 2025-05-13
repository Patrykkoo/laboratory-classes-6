const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow;
let serverStarted = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferencecs: {
            contextIsolation: true,
        },
    });

    const checkServer = () => {
        http.get('http://localhost:3000', () => {
            mainWindow.loadURL('http://localhost:3000');
        }).on('error', () => {
            setTimeout(checkServer, 500);
        });
    };

    checkServer();
}

app.whenReady().then(() => {
    const serverProcess = spawn('npm', ['start'], {
        shell: true,
        stdio: 'inherit',
    });

    serverProcess.on('close', (code) => {
        console.log(`Backend process exited with code ${code}`);
    });

    createWindow();

    app.on ('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});