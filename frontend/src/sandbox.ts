import { SignUpUser } from './classes/signup_user.js'
import { SignInUser } from './classes/signin_user.js'
import { HasFormatter } from './interfaces/HasFormatter.js'
import { HasSignInFormatter } from './interfaces/HasSignInFormatter.js';
import {Database} from './databases/database.js'

const form =document.querySelector('.new-item-form') as HTMLFormElement;
// console.log(form.children)

const inputName =document.querySelector("#name") as HTMLInputElement
const inputEmail =document.querySelector("#email") as HTMLInputElement
const inputPassword =document.querySelector("#password") as HTMLInputElement
const signupBtn=document.querySelector("#signupBtn") as HTMLButtonElement
const signinBtn=document.querySelector("#signinBtn") as HTMLButtonElement
const namefield=document.querySelector("#namefield") as HTMLDivElement;
const title=document.querySelector("#title") as HTMLTitleElement;
const snackbar=document.querySelector("#snackbar") as HTMLDivElement;


 const database = new Database();




let isSignInScreen : boolean; 
isSignInScreen=false;

  const toggleToSignIn=()=>{
    namefield.style.maxHeight = "0";
    title.innerHTML = "Sign in";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    isSignInScreen = true;
  }

  const toggleToSignUp=()=>{
    namefield.style.maxHeight = "60px";
    title.innerHTML = "Sign up";
    signinBtn.classList.add("disable");
    signupBtn.classList.remove("disable");
    isSignInScreen = false;
  }

   

signupBtn.addEventListener('click',(e:Event)=>
{
    if (isSignInScreen) {
        toggleToSignUp();
      }
    e.preventDefault()
    let doc:HasFormatter;
    if(inputName.value!==""&&inputEmail.value!==""&&inputPassword.value!==""){
      doc=new SignUpUser(inputName.value,
        inputEmail.value,
        inputPassword.value)
           
        if (doc instanceof SignUpUser) {
          // console.log(`Password: ${doc.getPassword()}`);
          // console.log(`Email: ${doc.getEmail()}`);
          database.signUp(doc.getName(),doc.getEmail(), doc.getPassword());
      }
     
    }
   
   
})


signinBtn.addEventListener('click',(e:Event)=>
{
    if (!isSignInScreen) {
        toggleToSignIn();
      }
    e.preventDefault()
    let doc:HasSignInFormatter;
    if(inputEmail.value!==""&&inputPassword.value!==""){
        doc=new SignInUser(
            inputEmail.value,
            inputPassword.value)
            // console.log(`doc = ${doc.format()}`);
            
            if (doc instanceof SignInUser) {

              // console.log(`Password: ${doc.getPassword()}`);
              // console.log(`Email: ${doc.getEmail()}`);
              database.signIn(doc.getEmail(), doc.getPassword());
          }
      
        
         
 
    }

   

})