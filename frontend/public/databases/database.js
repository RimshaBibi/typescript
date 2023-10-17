// class Database{
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// signIn=async()=>{
// const    inputEmail =document.querySelector("#email") as HTMLInputElement
//  const   inputPassword =document.querySelector("#password") as HTMLInputElement
//  let  requestBody={
// inputEmail:inputEmail.value,
// inputPassword:inputPassword.value,
//    }
//     try{
//         const response = await fetch('http://127.0.0.1:8080/signin', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(requestBody),  //covert javascript to json
//           });
//           console.log(response)
//     }
//     catch(e){
//         console.error('Login Error:', e);
//     }
// }
// }
export class Database {
    signUp(inputName, inputEmail, inputPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = {
                userName: inputName,
                userEmail: inputEmail,
                userPassword: inputPassword,
            };
            // console.log("requestBody= ",requestBody)
            try {
                const response = yield fetch('http://127.0.0.1:8080/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (response.status === 201) {
                    const status = response.status;
                }
                else if (response.status === 401) {
                    const errorMessage = yield response.text();
                    // console.error('Login Error:', errorMessage);
                }
                else if (response.status === 409) {
                    // User does not exist
                    const errorMessage = yield response.text();
                    console.error('Signup Error:', errorMessage);
                }
                else {
                    console.error('Unexpected Error:', response.status);
                }
                console.log(response);
            }
            catch (e) {
                console.error('Signup Error:', e);
            }
        });
    }
    signIn(inputEmail, inputPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const snackbar = document.querySelector("#snackbar");
            const requestBody = {
                userEmail: inputEmail,
                userPassword: inputPassword,
            };
            console.log("requestBody= ", requestBody);
            try {
                const response = yield fetch('http://127.0.0.1:8080/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (response.status === 200) {
                    const status = response.status;
                    snackbar.innerHTML = "Login Successfull";
                    snackbar.style.display = "block";
                    setTimeout(function () {
                        snackbar.style.display = "none";
                    }, 3000);
                }
                else if (response.status === 401) {
                    const errorMessage = yield response.text();
                    // console.error('Login Error:', errorMessage);
                }
                else {
                    console.error('Unexpected Error:', response.status);
                }
                // console.log(response);
            }
            catch (e) {
                console.error('Login Error:', e);
            }
        });
    }
}
