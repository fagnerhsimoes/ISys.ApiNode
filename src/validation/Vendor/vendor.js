const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateVendorInput(data) {
    let errors = {};

    data.name         = !isEmpty(data.name)         ? data.name         : "";
    data.mobile       = !isEmpty(data.mobile)       ? data.mobile       : "";
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
    data.address      = !isEmpty(data.address)      ? data.address      : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Informe o Nome";
    }
    if (Validator.isEmpty(data.mobile)) {
        errors.mobile = "Informe o Celular";
    }
    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = "Informe o Telefone";
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "Informe a Rua";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
