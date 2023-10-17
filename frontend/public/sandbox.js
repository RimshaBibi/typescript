import { SignUpUser } from './classes/signup_user.js';
import { SignInUser } from './classes/signin_user.js';
import { Database } from './databases/database.js';
const form = document.querySelector('.new-item-form');
// console.log(form.children)
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const signupBtn = document.querySelector("#signupBtn");
const signinBtn = document.querySelector("#signinBtn");
const namefield = document.querySelector("#namefield");
const title = document.querySelector("#title");
const snackbar = document.querySelector("#snackbar");
const database = new Database();
let isSignInScreen;
isSignInScreen = false;
const toggleToSignIn = () => {
    namefield.style.maxHeight = "0";
    title.innerHTML = "Sign in";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    isSignInScreen = true;
};
const toggleToSignUp = () => {
    namefield.style.maxHeight = "60px";
    title.innerHTML = "Sign up";
    signinBtn.classList.add("disable");
    signupBtn.classList.remove("disable");
    isSignInScreen = false;
};
signupBtn.addEventListener('click', (e) => {
    if (isSignInScreen) {
        toggleToSignUp();
    }
    e.preventDefault();
    let doc;
    if (inputName.value !== "" && inputEmail.value !== "" && inputPassword.value !== "") {
        doc = new SignUpUser(inputName.value, inputEmail.value, inputPassword.value);
        if (doc instanceof SignUpUser) {
            // console.log(`Password: ${doc.getPassword()}`);
            // console.log(`Email: ${doc.getEmail()}`);
            database.signUp(doc.getName(), doc.getEmail(), doc.getPassword());
        }
    }
});
signinBtn.addEventListener('click', (e) => {
    if (!isSignInScreen) {
        toggleToSignIn();
    }
    e.preventDefault();
    let doc;
    if (inputEmail.value !== "" && inputPassword.value !== "") {
        doc = new SignInUser(inputEmail.value, inputPassword.value);
        // console.log(`doc = ${doc.format()}`);
        if (doc instanceof SignInUser) {
            // console.log(`Password: ${doc.getPassword()}`);
            // console.log(`Email: ${doc.getEmail()}`);
            database.signIn(doc.getEmail(), doc.getPassword());
        }
    }
});
