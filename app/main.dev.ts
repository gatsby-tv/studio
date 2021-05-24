import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';

let main: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const SourceMapSupport = require('source-map-support');
  SourceMapSupport.install();
}

async function installExtensions() {
  const installer = require('electron-devtools-installer');
  const force = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      force
    )
    .catch(console.log);
}

async function createWindow() {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  main = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  main.loadURL(`file://${__dirname}/index.html`);

  main.webContents.on('did-finish-load', () => {
    if (!main) {
      throw new Error('main is not defined');
    }

    main.show();
    main.focus();

    main.on('closed', () => {
      main = null;
    });

    main.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  if (main === null) createWindow();
});
