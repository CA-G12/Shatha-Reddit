// client side validation
const email = document.querySelector('#email');
const password = document.querySelector('#password');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   ValidateInputs();
// });

const setError = (element, msg, index2) => {
  const formControl = element.parentElement;
  const small = document.querySelectorAll('.small');
  small.forEach((e, index) => {
    if (index === index2) {
      e.classList.add('error');
      e.textContent = msg;
    }
  });
  formControl.classList.add('error');
  formControl.classList.remove('success');
};

const setSuccess = (element, msg) => {
  const formControl = element.parentElement;
  const small = document.querySelector('.small');
  small.innerText = '';

  formControl.classList.add('success');
  formControl.classList.remove('error');
};

const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const ValidateInputs = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === '') {
    setError(email, 'email is required', 0);
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'provide a valid email value', 0);
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'password is required', 1);
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 character', 1);
  } else {
    setSuccess(password);
  }
};
// end client side validation

const signInBtn = document.querySelector('.signin-button');

signInBtn.addEventListener('click', (e) => {
  e.preventDefault();
  ValidateInputs();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  fetch('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json()).then(data=> {
    if(data==='sign in success'){
        window.location.href='/home'
    }
  }).catch(err=> console.log('err', err))
});
