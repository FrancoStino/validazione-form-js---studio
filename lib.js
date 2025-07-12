const _v = {
  hasError: false,
  isValidPassword: false,
  emailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
