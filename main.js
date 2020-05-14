const { app, BrowserWindow, Menu } = require("electron");
var path = require('path')

app.allowRendererProcessReuse = true;

if(process.platform == 'darwin'){
  app.dock.setIcon(path.resolve(__dirname, 'icon.png'));
}

let win;
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    title: 'Browser Develpoment',
    height: 600,
    icon: path.resolve(__dirname, 'icon.png'),
    //alwaysOnTop: true,
  });

  win.maximize();
  win.loadFile(path.resolve(__dirname, 'public', 'index.html'));

  //win.webContents.openDevTools();
  
}

function createMainMenu() {
  const template = [
    {
      label: "Custom",
        submenu: [
          {
            label: 'goBack',
            click () 
            {
              win.loadFile('public/index.html');
  
            }
          }
        ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

//app.whenReady().then(createWindow)
app.on("ready", () => {
  createWindow();
  createMainMenu();
});