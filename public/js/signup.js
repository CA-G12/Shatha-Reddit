// client side validation
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#password2');
const errMsg = document.querySelector('.err-msg');
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
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordValue2 = confirmPassword.value.trim();

  if (usernameValue === '') {
    setError(username, 'username is required', 0);
  } else {
    setSuccess(username);
  }

  if (emailValue === '') {
    setError(email, 'email is required', 1);
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'provide a valid email value', 1);
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'password is required', 2);
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 character', 2);
  } else {
    setSuccess(password);
  }

  if (passwordValue2 === '') {
    setError(confirmPassword, 'Please confirm your password', 3);
  } else if (passwordValue !== passwordValue2) {
    setError(confirmPassword, 'Passwords doesn\'t match', 3);
  } else {
    setSuccess(confirmPassword);
  }
};
// end client side validation

const signUpBtn = document.querySelector('.signup-button');
signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  ValidateInputs();

  fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    }),
  }).then((res) => res.json()).then((data) => {
    if (data === 'sign up success') {
      window.location.href = '/home';
    } else if (data.status === 400 || data.status === 500) {
      errMsg.textContent = data.msg;
    }
  }).catch((err) => console.log('err', err));
});
