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

  console.log(_v.formItems);
}

export default validaForm;
