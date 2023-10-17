
// class Database{

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
  
 
  async signUp(inputName:string,inputEmail:string,inputPassword:string): Promise<void> {
   

    const requestBody = {
      userName:inputName,
      userEmail : inputEmail,
      userPassword: inputPassword,
    };
// console.log("requestBody= ",requestBody)
    try {
      const response: Response = await fetch('http://127.0.0.1:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (response.status === 201) {
        const status = response.status;

     
      } else if (response.status === 401) {
        
        const errorMessage = await response.text();
        // console.error('Login Error:', errorMessage);
      } else if (response.status === 409) {
        // User does not exist
        const errorMessage = await response.text();
        console.error('Signup Error:', errorMessage);
      }
      else {
     
        console.error('Unexpected Error:', response.status);
      }

      console.log(response);
    } catch (e) {
      console.error('Signup Error:', e);
    }
  }


  async signIn(inputEmail:string,inputPassword:string): Promise<void> {
    const snackbar=document.querySelector("#snackbar") as HTMLDivElement;

    const requestBody = {
      userEmail : inputEmail,
      userPassword: inputPassword,
    };
console.log("requestBody= ",requestBody)
    try {
      const response: Response = await fetch('http://127.0.0.1:8080/signin', {
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
          setTimeout(function() {
              snackbar.style.display = "none";
          }, 3000);
     
     
      } else if (response.status === 401) {
        
        const errorMessage = await response.text();
        // console.error('Login Error:', errorMessage);
      } else {
     
        console.error('Unexpected Error:', response.status);
      }

      // console.log(response);
    } catch (e) {
      console.error('Login Error:', e);
    }
  }


}
