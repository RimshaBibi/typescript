export class SnackbarTemplate {
    constructor(container) {
        this.container = container;
    }
    render() {
        console.log("snackbar is called");
        const snackbar = document.createElement("div"); //div is used because we want to create it in div
        console.log(snackbar);
        //  const snackbar=document.querySelector("#snackbar") as HTMLDivElement;
        snackbar.className = "snackbar";
        snackbar.textContent = "Login Successfull";
        snackbar.style.display = "block";
        // snackbar.append(snackbar)
        this.container.appendChild(snackbar);
        console.log("Snackbar appended to container:", snackbar);
        setTimeout(() => {
            this.container.removeChild(snackbar);
        }, 3000);
    }
}
