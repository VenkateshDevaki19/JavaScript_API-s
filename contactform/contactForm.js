document.getElementById('contactform').addEventListener('submit', function(event){
    event.preventDefault();

    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const Subject = document.getElementById('Subject').value.trim();
    const PhoneNumber = document.getElementById('PhoneNumber').value.trim();
    const message = document.getElementById('message').value.trim();

    let isVaild = true;

    if(name ===''){
        document.getElementById('nameerror').textContent= 'Name is required';
        document.getElementById('nameerror').style.display='block';
        isVaild=false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email ===''||!emailPattern.test(email) ){
        document.getElementById('emailerror').textContent= 'Valid Email is required';
        document.getElementById('emailerror').style.display='block';
        isVaild=false;
    }

    if(Subject ===''){
        document.getElementById('subject-error').textContent= 'subject is required';
        document.getElementById('subject-error').style.display='block';
        isVaild=false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if(PhoneNumber ==='' || !phonePattern.test(PhoneNumber)){
        document.getElementById('Phoneerror').textContent= 'Name is required';
        document.getElementById('Phoneerror').style.display='block';
        isVaild=false;
    }

    if(message ===''){
        document.getElementById('messageerror').textContent= 'Message is required';
        document.getElementById('messageerror').style.display='block';
        isVaild=false;
    }

    if (isVaild) {
        alert('Form submitted successfully!');
    }
});