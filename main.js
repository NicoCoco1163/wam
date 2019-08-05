/**
 * @file: main.js
 * @author: NicoCoco1163
 * @create_at: 2019-07-30 17:44:32
 * @update_at: 2019-07-31 14:46:48
 */

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            allowEval: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('asynchronous-message', function (evt, arg) {
    console.log('on asynchronous-message: ', arg);
    evt.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', function (evt, arg) {
    console.log('on synchronous-message', arg);
    evt.returnValue = 'pong';
});
