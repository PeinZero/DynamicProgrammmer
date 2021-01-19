const path = require('path')
const os = require('os')
const { app, BrowserWindow, Menu, globalShortcut, ipcMain, shell, ipcRenderer } = require('electron')
const { exception } = require('console')


// set environment
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false //for checking macOS or not since we want this to be cross-platfrom app.

let mainWindow
let aboutWindow

function createMainWindow () {
    mainWindow = new BrowserWindow({
        title: 'DynamicProgrammer',
        width: 1500,
        height: 800,
        resizable: isDev ? true : false,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    // mainWindow.setFullScreen(true)
    mainWindow.loadFile('./app/index.html')
}

function createAboutWindow () {
    aboutWindow = new BrowserWindow({
        title: 'About',
        width: 350,
        height: 300,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    aboutWindow.loadFile('./app/about.html')
}

function createLCSWindow (){
    LCSWindow = new BrowserWindow({
        title: 'Longest Common Subsequence',
        width: 1500,
        height: 800,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    LCSWindow.loadFile('./app/lcs.html')
}

app.on('ready' , () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('ready' , () => mainWindow = null)
})

const menu = [
    {
        role: 'fileMenu'  //gives a standard file menu   
    },
    { role: 'editMenu' }, //gives a standard edit menu 
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {type: 'separator'},
                {role: 'toggleDevTools'},
            ]
        }
    ] : []),
    ...(!isMac ? [
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: createAboutWindow
                }
            ]
        }
    ] : []),

]

ipcMain.on('OpenAlgo', (e,options) =>{
    if (options.content === 'Longest Common Subsequence'){
        createLCSWindow()
    }
    
})

ipcMain.on('ExecuteAlgo', (e,options) =>{
    var set1 = options.content.str1
    var set2 = options.content.str2
    if (options.algo === 'LCS'){
        const lcsMatrix = Array(set2.length + 1)
            .fill(null)
            .map(() => Array(set1.length + 1).fill(null));

        for (let columnIndex = 0; columnIndex <= set1.length; columnIndex += 1) {
            lcsMatrix[0][columnIndex] = 0;
        }
        for (let rowIndex = 0; rowIndex <= set2.length; rowIndex += 1) {
            lcsMatrix[rowIndex][0] = 0;
        }
        for (let rowIndex = 1; rowIndex <= set2.length; rowIndex += 1) {
            for (let columnIndex = 1; columnIndex <= set1.length; columnIndex += 1) {
            if (set1[columnIndex - 1] === set2[rowIndex - 1]) {
                lcsMatrix[rowIndex][columnIndex] =
                lcsMatrix[rowIndex - 1][columnIndex - 1] + 1;
            } else {
                lcsMatrix[rowIndex][columnIndex] = Math.max(
                lcsMatrix[rowIndex - 1][columnIndex],
                lcsMatrix[rowIndex][columnIndex - 1]
                );
            }
            }
        }

        if (!lcsMatrix[set2.length][set1.length]) {
            return [""];
        }

        const longestSequence = [];
        let columnIndex = set1.length;
        let rowIndex = set2.length;

        while (columnIndex > 0 || rowIndex > 0) {
            if (set1[columnIndex - 1] === set2[rowIndex - 1]) {
            longestSequence.unshift(set1[columnIndex - 1]);
            columnIndex -= 1;
            rowIndex -= 1;
            } else if (
            lcsMatrix[rowIndex][columnIndex] === lcsMatrix[rowIndex][columnIndex - 1]
            ) {
            columnIndex -= 1;
            } else {
            rowIndex -= 1;
            }
        }
        LCSWindow.webContents.send('lcs:done' , longestSequence)
    }
    
})
// ipcMain.on('image:minimize', (e,options) =>{
//     options.dest = path.join(os.homedir(),'imageresizer') //destination path
//     shrinkImage(options)
// } )

// async function shrinkImage({ imgPath, quality, dest }){
    
//     try {
//         const pngQuality = quality/100

//         const files = await imagemin([slash(imgPath)], {
//             destination: dest,
//             plugins: [
//                 imageminMozjpeg({quality}),
//                 imageminPngquant({
//                     quality: [pngQuality, pngQuality ],
//                 }),
//             ],
//         })

//         // shell.openPath(dest) // to open destination folder after resizing

//         // mainWindow.webContents.send('image:done') // send alert to index.html
//     } catch (err) { // to catch an error
//         // log.error(err)
//         console.log(err)
//     }
// }

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
  
  app.allowRendererProcessReuse = true