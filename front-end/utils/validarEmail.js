function validarEmail(email) {
  const regexp =
    /^[\w\-]+(\.[\w\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/;
  return regexp.test(email);
}

export default validarEmail;
