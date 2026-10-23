const { app, BrowserWindow, shell, nativeImage, session } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 820,
    minWidth: 400,
    minHeight: 560,
    title: 'fu-WAYPOINT v2.2.2',
    backgroundColor: '#111015',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Tự động đồng bộ icon cửa sổ & thanh tác vụ theo icon chọn trực tiếp trong App
  mainWindow.webContents.on('page-favicon-updated', (_event, favicons) => {
    if (!favicons || favicons.length === 0) return;
    for (const iconUrl of favicons) {
      if (typeof iconUrl === 'string' && iconUrl.startsWith('data:image/png')) {
        try {
          const img = nativeImage.createFromDataURL(iconUrl);
          if (!img.isEmpty() && mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.setIcon(img);
            break;
          }
        } catch {
          // Bỏ qua nếu data URL không hợp lệ
        }
      }
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  if (session && session.defaultSession) {
    session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
      if (permission === 'media' || permission === 'camera' || permission === 'clipboard-read' || permission === 'clipboard-sanitized-write') {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
