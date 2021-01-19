// ---------------------------- THiS Area is not to be Tampered with-------------------------
const path = require('path')
const os = require('os')
const { app, BrowserWindow, Menu, globalShortcut, ipcMain, shell, ipcRenderer } = require('electron')
// -------------------------------------------------------------------------------------------------------


// -------------------------import functions from .js files ------------------------
const {longestCommonSubsequence} = require('./app/Algos/lcs.js');
const {shortestCommonSupersequence} = require('./app/Algos/scs.js');
const {levenshteinDistance} = require('./app/Algos/ld.js');
const {LongestIncreasingSubsequence} = require('./app/Algos/lis.js');
//---------------------------------------------------------------------------------------



// ---------------------------- THiS Area is not to be Tampered with-------------------------

process.env.NODE_ENV = 'development' // set environment

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false //for checking macOS or not since we want this to be cross-platfrom app.
//---------------------------------------------------------------------------------------



// ---------------------------- Creation of Windows in this Section-------------------------

// ---------------------------- THiS Area is not to be Tampered with-------------------------
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
// -------------------------------------------------------------------------------------------------------


// ------------------- Most probably, there won't be the need to change this area ------------------------
function createAlgoWindow (algoName){
    AlgoWindow = new BrowserWindow({
        width: 1500,
        height: 800,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    if (algoName === 'Longest Common Subsequence'){
        AlgoWindow.loadFile('./app/AlgoViews/lcs.html')
    }
    else if (algoName === 'Shortest Common Supersequence'){
        AlgoWindow.loadFile('./app/AlgoViews/scs.html')
    }
    else if (algoName === 'Levenshtein Distance'){
        AlgoWindow.loadFile('./app/AlgoViews/ld.html')
    }
    else if (algoName === 'Longest Increasing Subsequence'){
        AlgoWindow.loadFile('./app/AlgoViews/lis.html')
    }
    else if (algoName === 'Matrix Chain Multiplication'){
        AlgoWindow.loadFile('./app/AlgoViews/mcm.html')
    }
    else if (algoName === '0-1-knapsack-problem'){
        AlgoWindow.loadFile('./app/AlgoViews/kp.html')
    }
    else if (algoName === 'Partition-problem'){
        AlgoWindow.loadFile('./app/AlgoViews/pp.html')
    }
    else if (algoName === 'Rod Cutting Problem'){
        AlgoWindow.loadFile('./app/AlgoViews/rcp.html')
    }
    else if (algoName === 'Coin-change-making-problem'){
        AlgoWindow.loadFile('./app/AlgoViews/ccp.html')
    }
    else if (algoName === 'Word Break Problem'){
        AlgoWindow.loadFile('./app/AlgoViews/wbp.html')
    }  
}
// -------------------------------------------------------------------------------------------------------

// -------------------------------END of Window's Creation Section -----------------------------------------


// ------------------------------ APP and MENU SECTION -----------------------------------------------
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

// ------------------------------ END OF APP and MENU SECTION -----------------------------------------------





//----------------------------------------------MAIN LOGIC SECTION----------------------------------------

// when you click on any algo in the Main Window, the control is transfered here
ipcMain.on('OpenAlgo', (e,options) =>{
    createAlgoWindow(options.content)
    // make a algo window depending on the algo selected
})


// when the user select a sample input in Algo Window, the conbrol is tranfered here
ipcMain.on('ExecuteAlgo', (e,options) =>{
    // a dict is recieved in options
    // options.algo contain SELECTED algo name
    // change variable: changeThisAccordingly name according to the type of answer algo return.

    if (options.algo === 'LCS'){
        let longestSequence = longestCommonSubsequence(options.content.str1,options.content.str2)

        // this sends the answer and the control back to the selected algo .html file and fill the output area in that html file with ans.
        AlgoWindow.webContents.send('lcs:done' , longestSequence)

        // i.e 'lcs-done specifies the area to shift control to with the answer
        // the next parameter the answer itself

    }
    else if (options.algo === 'SCS'){
        let superSequence = shortestCommonSupersequence(options.content.str1,options.content.str2)
        AlgoWindow.webContents.send('scs:done' , superSequence)
    }
    else if (options.algo === 'LD'){
        let editDistance = levenshteinDistance(options.content.str1,options.content.str2)
        AlgoWindow.webContents.send('ld:done' , editDistance)
    }
    else if (options.algo === 'LIS'){
        let lengthLis = LongestIncreasingSubsequence(options.content.sample)
        AlgoWindow.webContents.send('lis:done' , lengthLis)
    }

    // from here onward changes will be needed
    else if (options.algo === 'MCM'){
        let changeThisAccordingly = LongestIncreasingSubsequence(options.content.sample)
        AlgoWindow.webContents.send('mcm:done' , changeThisAccordingly)
    }
    else if (options.algo === 'KP'){
        let changeThisAccordingly = LongestIncreasingSubsequence(options.content.sample)
        AlgoWindow.webContents.send('kp:done' , changeThisAccordingly)
    }
    else if (options.algo === 'PP'){
        let changeThisAccordingly = LongestIncreasingSubsequence(options.content.sample)
        AlgoWindow.webContents.send('pp:done' , changeThisAccordingly)
    }
    else if (options.algo === 'RCP'){
        let changeThisAccordingly = LongestIncreasingSubsequence(options.content.sample)
        AlgoWindow.webContents.send('rcp:done' , changeThisAccordingly)
    }
    else if (options.algo === 'CCP'){
        let changeThisAccordingly = LongestIncreasingSubsequence(options.content.sample)
        AlgoWindow.webContents.send('ccp:done' , changeThisAccordingly)
    }
    else if (options.algo === 'WBP'){
        let changeThisAccordingly = LongestIncreasingSubsequence(options.content.sample)
        AlgoWindow.webContents.send('wbp:done' , changeThisAccordingly)
    }
    
})

// ---------------------------END OF MAIN LOGIC SECTION------------------------------------------------------





// ------------------------------------LAST SECTION------------------------------------------
// ---------------------------- THiS Area is not to be Tampered with-------------------------
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
// ---------------------------------------------------------------------------------------------------
// ---------------------------END OF LAST SECTION------------------------------------------------------
