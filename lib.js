const _v = {
  hasError: false,
  isValidPassword: false,
  // Modifica la regex per accettare solo email nel formato aa@aa.com
  emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}

function validaForm(form, notifica) {
  _v.form = document.querySelector(form);
  _v.notificationItem = document.querySelector(notifica);
  _v.passwordStrength = document.querySelectorAll('#password > span')
  _v.formItems = Array.from(_v.form.elements);
  submitForm();
  checkPasswordStrength();
}

function submitForm() {
  _v.form.addEventListener('submit', (e) => {
    e.stopPropagation();
    e.preventDefault();
    checkValidation();
  }, true);
}


function checkValidation() {
  try {
    // controllo campi obbligatori
    requiredFields();

    // controllo email
    emailValidation();

    // controllo password
    passwordValidation();

    // controlli superati
    _v.notificationItem.textContent = 'Registrazione avvenuta con successo';

  } catch (e) {
    _v.notificationItem.textContent = e.message;
  }
}


function requiredFields() {
  let error;
  _v.hasError = false;

  _v.formItems.forEach((item) => {
    error = false;
    if (item.type !== 'checkbox' && item.required && !item.value) {
      error = true;
    }
    if (item.type === 'checkbox' && item.required && !item.checked) {
      error = true;
    }
    if (error) {
      item.classList.add('error');
      _v.hasError = error;
    } else {
      item.classList.remove('error');
    }
  });
  if (_v.hasError) {
    throw new Error('Campi obbligatori non compilati');
  }
}

function emailValidation() {
  // Accetta solo email nel formato aa@aa.com
  if (!_v.emailPattern.test(_v.form.email.value)) {
    throw new Error('Inserisci un indirizzo email valido');
  }
}

// controllo password
function passwordValidation() {
  const pwd = _v.form.password.value;
  re_pwd = v.form.re_password.value;
  if (!_v.isValidPassword) {
    throw new Error('Inserisci una password valida');
  }
  if (pwd !== re_pwd) {
    throw new Error('Le password non corrispondono');
  }
}




/*
8 caratteri -> valida ma non sicura
8 caratteri - 1 carattere speciale -> mediamente sicura
10 caratteri - 2 carattere speciale -> molto sicura

*/
function checkPasswordStrength() {
  _v.form.password.addEventListener('input', (e) => {
    const isValid = {
      isLow: false,
      isHigh: false
    },

      pwd = e.target.value;

    _v.passwordStrength.forEach((span) => {
      span.classList.remove('active');
    });

    if (pwd.length >= 8) {
      _v.passwordStrength[0].classList.add('active');
      if (regexCount(/[&%?!@]/g, pwd) === 1) {
        _v.passwordStrength[1].classList.add('active');
      }
      isValid.isLow = true;
    }
    if (pwd.length >= 10 && regexCount(/[&%?!@]/g, pwd) >= 2) {
      _v.passwordStrength[0].classList.add('active');
      _v.passwordStrength[1].classList.add('active');
      _v.passwordStrength[2].classList.add('active');
      isValid.isHigh = true;
    }
    _v.isValidPassword = (isValid.isLow || isValid.isHigh) ? true : false;
  });

  function regexCount(pattern, password) {
    return (password.match(pattern) || []).length;
  }

}

export default validaForm;
