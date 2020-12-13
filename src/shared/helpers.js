//the email regex check if the email has an @ and if it ends with .[something]
//the password regex check that the password must contain at least one uppercase letter, one lowercase letter and a number
export const validatePasswordAndEmail = (password, email) => {
    let error = null;
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regexEmail.test(email)) {
        console.log(!regexEmail.test(email));
        error = 'Please enter a valid email';
        return error;
    }

    if (password.length < 8) {
        error = 'The password must have at least 8 characters';
        return error;
    }
    if (!regexPassword.test(password)) {
        error =
            'The password must contain at least one uppercase letter, one lowercase letter and a number';
        return error;
    }

    return error;
};

