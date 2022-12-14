export const RegisterValidation = (email, name, password) => {
    let error = {};
    if (!email) {
        error.email = "Required field!";
    }
    if (!name) {
        error.name = "Required field!";
    }

    if (!password) {
        error.password = "Required field!";
    }
    if (
        !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
        error.email = "Invalid Email Format";
    }

    return error;
};

export const LoginValidation = (email, password) => {
    let error = {};
    if (!email) {
        error.email = "Required field!";
    }

    if (!password) {
        error.password = "Required field!";
    }
    if (
        !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
        error.email = "Invalid Email Format";
    }

    return error;
};

export const themeValidator = (color_one, color_two, bgImage) => {
    let error = {};
    if (!color_one) {
        error.color_one = "Please provide color #1";
    }
    if (!color_two) {
        error.color_two = "Please provide color #2";
    }
    if (!bgImage) {
        error.bgImage = "Please provide background image";
    }

    return error;
};
