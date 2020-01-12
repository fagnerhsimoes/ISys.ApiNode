const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.name)) {
      errors.name = "Preencha o campo Nome";
  }

  if (Validator.isEmpty(data.email)) {
      errors.email = "Preencha o campo E-mail";
  } else if (!Validator.isEmail(data.email)) {
      errors.email = "E-mail invalido";
  }

  if (Validator.isEmpty(data.password)) {
      errors.password = "Preencha o campo Senha";
  }

  if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Preencha o campo Confirmar Senha';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "A senha deve ter pelo menos 6 caracteres";
  }

  if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "As senhas devem corresponder";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
