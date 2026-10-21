const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// Đặt AppUserModelId cho Windows 10/11 để thanh Taskbar nhận diện đúng Icon App
if (process.platform === 'win32') {
  app.setAppUserModelId('com.minecraft.fuwaypoint');
}

function resolveWindowIcon() {
  const candidates = process.platform === 'win32'
    ? [
        path.join(process.resourcesPath || '', 'icon.ico'),
        path.join(__dirname, 'dist', 'icon.ico'),
        path.join(__dirname, 'public', 'icon.ico'),
        path.join(__dirname, 'dist', 'icon.png'),
      ]
    : [
        path.join(process.resourcesPath || '', 'icon.png'),
        path.join(__dirname, 'dist', 'icon.png'),
        path.join(__dirname, 'public', 'icon.png'),
      ];

  for (const p of candidates) {
    if (p && fs.existsSync(p)) return p;
  }
  return path.join(__dirname, 'dist', 'icon.png');
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 820,
    minWidth: 400,
    minHeight: 560,
    title: 'fu-WAYPOINT v2.1.2',
    icon: resolveWindowIcon(),
    backgroundColor: '#111015',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
