const {Menu, shell} = require('electron')

module.exports = (appWin) => {

    let template = [
        {
            label: 'Items',
            submenu: [
                {
                    label: 'Add new item',
                    accelerator: 'CmdOrCtrl+o',
                    click: () => {
                        appWin.send('add-item')
                    }
                },
                {
                    label: 'Read item',
                    accelerator: 'Space',
                    click: () => {
                        appWin.send('open-item')
                    }
                },
                {
                    label: 'Delete item',
                    accelerator: 'Backspace',
                    click: () => {
                        appWin.send('delete-item')
                    }
                }
            ]
        },
        {
            role: 'editMenu'
        },
        {
            role: 'windowMenu'
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn more',
                    click: () => {
                        shell.openExternal('https://github.com/stackacademytv/master-electron')
                    }
                }
            ]
        },
    ]

    if(process.platform === 'darwin') {
        template.unshift({role: 'appMenu'})
    }

    let menu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(menu)

}