import User from "../../models/User";
import { registerUser } from "../../api/authenticate";

const Register = () => {


    const submitRegister = (event: any) => {
        event.preventDefault();

        const inputUsername = document.getElementById("input-username") as HTMLInputElement;
        const inputPassword = document.getElementById("input-password") as HTMLInputElement;

        // Making sure the inputs are valid.
        if (!inputUsername.value || !inputPassword.value) {
            return;
        } 

        const userCredentials: User = {
            username: inputUsername.value,
            password: inputPassword.value
        }

        // Sending the POST request
        registerUser(userCredentials);
        
        console.log("User created.");
    }

    return (
        <div id="page-register">
            <form onSubmit={submitRegister}>
                <input id="input-username" name="username" type="string"></input>
                <input id="input-password" name="password" type="password"></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Register;