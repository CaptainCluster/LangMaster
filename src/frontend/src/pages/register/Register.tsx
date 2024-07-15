const Register = () => {


    const submitRegister = (event) => {
        event.preventDefault();

        const inputUsername = document.getElementById("input-username") as HTMLInputElement;
        const inputPassword = document.getElementById("input-password") as HTMLInputElement;

        // Making sure the inputs are valid.
        if (!inputUsername.value || !inputPassword.value) {
            return;
        } 

        // Sending the POST request
        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: inputUsername.value,
                password: inputPassword.value
            })
        });

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