const registrationForm = document.getElementById("registration");

registrationForm.addEventListener('submit', function(e){
    e.preventDefault();

    const firstName= document.getElementById('firstName').value;
    const lastName = document.getElementById('LastName').value;
    const userName = document.getElementById('Username').value;
    const emailId = document.getElementById('email_id').value;
    const password = document.getElementById('password').value;

    // Retrieve existing users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // store user data in local storage
    const userData = {
        firstName,
        lastName,
        userName,
        emailId,
        password,
    };

    users.push(userData);

    console.log(userData);

    localStorage.setItem('users', JSON.stringify(users));

    // displaying registration success message
    alert('Registration successful');

    document.getElementById('firstName').value = '';
    document.getElementById('LastName').value = '';
    document.getElementById('Username').value = '';
    document.getElementById('email_id').value = '';
    document.getElementById('password').value = '';

    // window.location.href = login.html;

});