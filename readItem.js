const {BrowserWindow} = require('electron')

let offScreenWindow

module.exports = (url, callBack) => {

    offScreenWindow = new BrowserWindow({
        width:500,
        height:500,
        show: false,
        webPreferences: {
            offscreen: true,
            contextIsolation: true,
        }
    })

    offScreenWindow.loadURL(url)

    offScreenWindow.webContents.addListener('did-finish-load', async (e) => {

        const title = offScreenWindow.getTitle()

        const nativeImage = await offScreenWindow.webContents.capturePage()
        const screenShot = nativeImage.toDataURL()
        callBack({
            title,
            screenShot,
            url
        })
        offScreenWindow.close()
        offScreenWindow = null
    })

}