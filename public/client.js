const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
            user: name,
            message: message.trim() //trim() to remove the white space
        }
        // Append 
    appendMessage(msg, 'outgoing') //append means inserting at the end in an existing element
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg) //emit means send resending to the server

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => { //here message is prodcasted from server.js
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

//socket.emit is sending
//socket.on is recieving the message
//socket.on is client side code it willl run only in the browser not in the server