//classes/////
export class SignUpUser {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    format() {
        return `${this.name} has email ${this.email}  and password is ${this.password}`;
    }
}
