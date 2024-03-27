const { ipcRenderer } = require('electron')
const items = require('./items')

const gE = (id) => {
    return document.getElementById(id)
}

const showModal = gE('show-modal'),
    closeModal = gE('close-modal'),
    modal = gE('modal'),
    addItem = gE('add-item'),
    itemUrl = gE('url'),
    search = gE('search')

ipcRenderer.on('add-item', () => {
    showModal.click()
})

ipcRenderer.on('delete-item', () => {
    items.delete()
})


const toggleModal = () => {
    if (addItem.disabled === true) {
        addItem.disabled = false
        addItem.style.opacity = 1
        addItem.innerHTML = 'Add item'
        closeModal.style.display = 'inline'
    }
    else {
        addItem.disabled = true
        addItem.style.opacity = 0.5
        addItem.innerHTML = 'Adding...'
        closeModal.style.display = 'none'
    }
}

showModal.addEventListener('click', e => {
    modal.style.display = 'flex'
    itemUrl.focus()
})

closeModal.addEventListener('click', e => {
    modal.style.display = 'none'
})

addItem.addEventListener('click', e => {
    if (itemUrl.value) {
        ipcRenderer.send('new-item', itemUrl.value)
        toggleModal()
        modal.style.display = 'none'
        itemUrl.value = ''
    }
})

search.addEventListener('keyup', e => {
    Array.from(document.getElementsByClassName('read-item')).forEach(item => {
        const show = item.innerText.includes(search.value)
        item.style.display = show ? 'flex' : 'none'
    })
})

itemUrl.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        addItem.click()
    }
})

document.addEventListener('keydown', e => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        items.handleSelected(e.key)
    }
})

ipcRenderer.on('new-item-success', (e, item) => {
    // console.log('item', item)
    toggleModal()
    modal.style.display = 'none'
    itemUrl.value = ''
    items.addItem(item)
})