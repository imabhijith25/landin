export const RegisterValidation = (email, name, password) => {
    let error = {}
    if (!email) {
        error.email = "Required field!"
    }
    if (!name) {
        error.name = "Required field!"
    }

    if (!password) {
        error.password = "Required field!"
    }
    if (!email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        error.email = "Invalid Email Format"
    }

    return error



}