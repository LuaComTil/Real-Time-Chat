// Elementos do login

const login = document.getElementById("login")
const loginForm = document.getElementById("login__form")
const loginInput = document.getElementById("login__input")

// Elementos do Chat
const chat = document.getElementById('chat')
const chatForm = document.getElementById('chat__form')
const chatInput = document.getElementById('chat__input')
const chatMessages = document.getElementById('chat__messages')

// Elementos de usuarios 
const user = {
    id:"",
    name:"",
    color:"",
}

const colors = [
    "#d818ed", //ROSA SHOCK
    "#240ec9", //AZUL FORTE
    "#12db81", //CIANO
    "#12db19", //CHROMA KEY
    "#dbc412", //BITCOIN>
    "#4f180f", //HARD R
    "#3e18d6", //ROXO
    "#d61818"  //VERMELHO MENSTRUAÇÃO

]

const getRandomColor= () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

// Server Websocket
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
