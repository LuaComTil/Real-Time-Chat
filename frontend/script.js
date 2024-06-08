//parts do login ;D

const userName= document.querySelector('.userName');
const loginForm= login.querySelector('login__form');
const loginButton= login.querySelector('loginButton');


const user= {id: '', name: '', color:''};

const handleSubmit= (event) =>{
    event.preventDefault();
    console.log(user);
}

loginForm.addEventListener('submit', handleSubmit);
