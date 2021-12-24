const path = require("path");
const exec = require('child_process').exec;
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { createReadStream } = require("./utils");
const log = require('electron-log');
log.transports.file.resolvePath = () => path.join(__dirname, 'steam-extractor/logs/main.log');

const getUserData = require("./read-db");
const os = require("os");
const defaultPath = `${process.env.APPDATA}\\legends-of-idleon\\Local Storage\\leveldb`;
const defaultTargetPath = "c:/dev/idleon-level-db";
let sourceFolderPath = defaultPath;
let targetFolderPath = defaultTargetPath;

const createWindow = () => {
  let win = new BrowserWindow({
    width: 650,
    height: 500,
    frame: false,
    icon: 'build/data-flow.png',
    webPreferences: {
      preload: path.join(__dirname, 'assets', 'preload.js'),
      enableRemoteModule: true
    },
  })
  win.setResizable(false);
  win.setMenu(null);
  // win.webContents.openDevTools();
  win.webContents.send('initialData', { defaultSourcePath: defaultPath, defaultTargetPath: defaultTargetPath });
  win.loadFile(path.join(__dirname, 'assets/index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('close-app', () => {
  app.quit();
});

ipcMain.handle('open-folder', async (e, folderType) => {
  const folder = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (folderType === 'source') {
    sourceFolderPath = folder.filePaths[0];
    return sourceFolderPath;
  } else {
    targetFolderPath = folder.filePaths[0];
    return targetFolderPath;
  }
});

ipcMain.handle('run-process', async () => {
  try {
    const copied = await copyFolder();
    if (!copied) return null;
    const dataAsArray = await createReadStream(targetFolderPath, {});
    if (dataAsArray.length) {
      const userData = await getUserData(dataAsArray);
      return userData;
    } else {
      return null;
    }
  } catch (err) {
    log.error('Error has occurred in run-process()', err);
    return null;
  }
});

const copyFolder = () => {
  return new Promise((resolve, reject) => {
    if (os.platform() === 'win32') {
      exec(`(robocopy "${sourceFolderPath}" "${targetFolderPath}" /r:0 /w:0 /e /purge) ^& IF %ERRORLEVEL% LEQ 1 exit 0`, (error) => {
        if (error) {
          log.error('Error has occurred', error);
          reject(`Error has occurred ${error?.message}`)
        }
        resolve(true)
      })
    }
  })
}