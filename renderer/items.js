const {ipcRenderer} = require('electron')
const items = document.getElementById('items')
const fs = require('fs')

let readerContent
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
    readerContent = data.toString()
})

exports.storage = JSON.parse(localStorage.getItem('items')) || []

ipcRenderer.on('open-item', () => {
    this.open()
})

window.addEventListener('message', e => {
    
    if(e.data.type === 'page-opened') {
        this.delete()
        e.source.close()
    }
})

exports.delete = () => {
    const sIndex = this.getSelectedItemIndex()
    if(sIndex === -1) return
    this.storage.splice(sIndex, 1)
    this.save()
    items.removeChild(this.getSelectedItem())
}

exports.save = () => {
    localStorage.setItem('items', JSON.stringify(this.storage))
}

exports.getSelectedItem = () => {
    return document.getElementsByClassName('read-item selected')[0]
}

exports.getSelectedItemIndex = () => {
    return Array.from(document.getElementsByClassName('read-item')).indexOf(this.getSelectedItem())
}

exports.selectItem = e => {
    this.getSelectedItem()?.classList.remove('selected')
    e.currentTarget.classList.add('selected')
}

exports.open = e => {
    const sItem = this.getSelectedItem()
    if(!sItem) return

    const readWin = window.open(sItem.dataset.url, '', `
        maxWidth=2000,
        maxHeight=2000,
        width=1200,
        height=800,
        backgroudColor=#DEDEDE,
        nodeIntegration=0,
        contextIsolation=1
    `)

    readWin.eval(readerContent)
}

exports.handleSelected = direction => {
    const currItem = this.getSelectedItem()
    if(!currItem) return
    if(direction === 'ArrowUp' && currItem.previousElementSibling) {
        currItem.classList.remove('selected')
        currItem.previousElementSibling.classList.add('selected')
    }
    else if(direction === 'ArrowDown' && currItem.nextElementSibling) {
        currItem.classList.remove('selected')
        currItem.nextElementSibling.classList.add('selected')
    }
    
}

exports.addItem = (item, isNew = true) => {

    const itemNode = document.createElement('div')

    itemNode.setAttribute('class', 'read-item')
    itemNode.setAttribute('data-url', item.url)
    itemNode.innerHTML = `
        <img src="${item.screenShot}"/>
        <h2>${item.title}</h2>
    `
    itemNode.addEventListener('click', this.selectItem)
    itemNode.addEventListener('dblclick', this.open)
    items.appendChild(itemNode)
    if (isNew) {
        this.storage.push(item)
        this.save()
    }
}

this.storage.forEach(item => this.addItem(item, false))