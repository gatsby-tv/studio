import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import chalk from 'chalk';
import { app, shell, BrowserWindow } from 'electron';
import { fork, ChildProcess } from 'child_process';

type Main = {
  window: BrowserWindow | undefined;
  server: ChildProcess | undefined;
};

const main: Main = {
  window: undefined,
  server: undefined,
};

const logger = {
  info: (...messages: string[]) => console.log(chalk.bold(...messages)),
  error: (...messages: (string | Error)[]) =>
    console.error(chalk.red(...messages)),
};

if (process.env.NODE_ENV === 'production') {
  require('source-map-support').install();
}

async function Window() {
  logger.info('Starting Window...');

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    logger.info('Installing Electron Devtools...');

    const installer = require('electron-devtools-installer');
    const force = Boolean(process.env.UPGRADE_EXTENSIONS);
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    await installer
      .default(
        extensions.map((name) => installer[name]),
        force
      )
      .catch(logger.error);
  }

  main.window = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  main.window.loadURL(`file://${__dirname}/index.html`);
  main.window.setMenuBarVisibility(false);

  main.window.webContents.on('did-finish-load', () => {
    if (!main.window) {
      throw new Error('main is not defined');
    }

    main.window.show();
    main.window.focus();

    main.window.on('closed', () => void (main.window = undefined));

    main.window.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });
  });
}

async function Server() {
  logger.info('Starting Server...');

  const server =
    process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '../dist/server.dev.js')
      : path.resolve(__dirname, './dist/server.prod.js');

  main.server = fork(server, { stdio: 'inherit' });
}

async function start() {
  if (!app.requestSingleInstanceLock()) return void quit();
  if (main.window === undefined) Window();
  if (main.server === undefined) Server();
}

async function quit() {
  if (main.server) main.server = void main.server.kill();
  if (process.platform !== 'darwin') return void app.quit();
}

app.on('ready', start);
app.on('activate', start);
app.on('window-all-closed', quit);
