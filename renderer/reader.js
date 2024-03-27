
let closeBtn = document.createElement('div')
closeBtn.innerText = 'Done!'

closeBtn.style.position = 'fixed'
closeBtn.style.bottom = '15px'
closeBtn.style.right = '15px'
closeBtn.style.padding = '5px 10px'
closeBtn.style.fontSize = '20px'
closeBtn.style.fontWeight = 'bold'
closeBtn.style.background = 'dodgerblue'
closeBtn.style.color = 'white'
closeBtn.style.borderRadius = '5px'
closeBtn.style.cursor = 'default'
closeBtn.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)'

closeBtn.onclick = e => {

    window.opener.postMessage({
        type: 'page-opened'
    }, '*')

}

document.getElementsByTagName('body')[0].append(closeBtn)


