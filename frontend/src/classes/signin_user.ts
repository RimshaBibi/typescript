import { HasSignInFormatter } from "../interfaces/HasSignInFormatter"

export class SignInUser implements HasSignInFormatter{
    constructor(     
        readonly email:string,      
        private  password:string,){
    }
    format(){
        return `email ${this.email}  and password is ${this.password}`
    }
   
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
  
}

