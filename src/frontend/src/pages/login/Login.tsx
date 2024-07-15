const Login = () => {


    const submitLogin = (event) => {
        event.preventDefault();

        const inputUsername = document.getElementById("input-username") as HTMLInputElement;
        const inputPassword = document.getElementById("input-password") as HTMLInputElement;

        // Making sure the inputs are valid.
        if (!inputUsername.value || !inputPassword.value) {
            return;
        } 

        // Sending the POST request
        fetch("/api/users/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: inputUsername.value,
                password: inputPassword.value
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))

        console.log("User created.");
    }

    return (
        <div id="page-login">
            <form onSubmit={submitLogin}>
                <input id="input-username" name="username" type="string"></input>
                <input id="input-password" name="password" type="password"></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Login;