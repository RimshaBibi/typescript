import { HasFormatter } from "../interfaces/HasFormatter"

//classes/////
export class SignUpUser implements HasFormatter{//class have the same structure as the interfaces
    constructor( 
        readonly name:string,     
        public email:string,      
        private  password:string,){
    }
    format(){
        return `${this.name} has email ${this.email}  and password is ${this.password}`
    }
    getName(){
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
}



