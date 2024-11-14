function genPassword(length){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for(let i=0;i<length;i++){
        password += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    console.log(password);
    return password;
}

//generate password functionality

document.getElementById('generatePasswordButton').addEventListener('click', () =>{
    const generatedPassword = genPassword(12);
    console.log(generatedPassword);
    document.getElementById('generatedPassword').value = generatedPassword;
    document.getElementById('message').textContent = 'Password Generated successfully!!!'
});

//change password functionality

document.getElementById('changePasswordButton').addEventListener('click',() =>{
    const newPassword = document.getElementById('newPassword').value;
    const generatedPasswordInput = document.getElementById('generatedPassword');

    if(newPassword.trim() === ''){
        document.getElementById('message').textContent = "Password cannot be empty"
        document.getElementById('message').style.color='red';
    }else{
        generatedPasswordInput.value = newPassword;
        document.getElementById('message').textContent = "New password changed"
        document.getElementById('message').style.color= 'green';
    }
})