const Index = () => {

    if (!localStorage.getItem("auth_token")) {
        window.location.href = "/login"
    } else {
        return(
            <div id="page-index">
    
            </div>
        );
    }

}

export default Index;