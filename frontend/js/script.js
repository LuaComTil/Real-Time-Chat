// elementos do login

const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

// elementos do Chat
const chat = document.querySelector('.chat')
const chatForm = chat.querySelector('.chat__form')
const chatInput = chat.querySelector('.chat__input')
const chatMessages = chat.querySelector('.chat__messages')

// elementos de usuarios 
const user = {
    id:"",
    name:"",
    color:"",
}

const colors = [
    "pink",
    "palegreen",
    "blueviolet",
    "mediumaquamarine",
    "black",
    "chocolat",
    "red",
    "lightsalmon"

]

const getRandomColor= () => {
    const randomIndex = Math.floor(Math.random() * colors.length)

    return colors[randomIndex]

}

// server Websocket

let websocket

//Login 
const handleLogin= (event) => {
    event.preventDefault()

    user.id= crypto.randomUUID()
    user.name= loginInput.value
    user.color= getRandomColor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("wss://real-time-chat-zsno.onrender.com")
    websocket.onmessage = processMessage

}
// Processamento das mensagens 


const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }
    
    websocket.send(JSON.stringify(message))

    chatInput.value = ""

}

const ownMessage= (content) => {
    const div = document.createElement("div")

    div.classList.add('message--self')
    div.innerHTML = content

    return div
}

const senderMessage= (content, sender, senderColor) => {
    const div = document.createElement('div')
    const span = document.createElement('span')

    div.classList.add('message--other')

    span.classList.add('message--sender')
    span.style.color= senderColor
    
    div.appendChild(span)
    
    span.innerHTML = sender
    div.innerHTML += content

    return div 
}

const processMessage = ({data}) => {
    const {userId, userName, userColor, content} = JSON.parse(data)

    const message = userId == user.id
      ? ownMessage(content) : senderMessage(content, userName, userColor)

    chatMessages.appendChild(message)

    scrollScreen()

}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}


loginForm.addEventListener('submit', handleLogin);
chatForm.addEventListener('submit', sendMessage);
