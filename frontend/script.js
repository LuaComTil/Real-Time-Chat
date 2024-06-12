//parts do login ;D
console.log('hello world')

const login = document.querySelector(".login");
const loginForm = login.querySelector("#userNameInput");
const loginButton = login.querySelector("#loginButton");

//parte do chat

const chat= document.querySelector('.chat')



const colors= [
    'OrangeRed',
    'Gold',
    'Violet',
    'Lime',
    'Aqua',
    'Pink'
]

const getRadomColor= () =>{
    const radomIndex= Math.floor(Math.random() * colors.length);
    return colors[radomIndex]

}

const user= {id: '', name: '', color:''}


const handleSubmit= (event) =>{
    event.preventDefault()

    user.id= crypto.randomUUID();
    user.name= loginButton.value;
    user.color= getRadomColor();

    login.style.display = "none"
    chat.style.display = "flex"

    console.log(user);

}

loginForm.addEventListener("submit", handleSubmit);



