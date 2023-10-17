export class SignInUser {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    format() {
        return `email ${this.email}  and password is ${this.password}`;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
}
