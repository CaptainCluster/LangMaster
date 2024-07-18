import Header from "../components/Header";
import useStore from '../stores/store';
import { useEffect } from 'react';

const Home = () => {
    const { updateCurrentPageName } = useStore();

    useEffect(() => {
        if (!localStorage.getItem("auth_token")) {
            window.location.href = "/login"
        } 
        updateCurrentPageName("Home");
    }, []);

    return (
        <>
            <Header />
            <div id="page-index">
    
            </div>
        </>
    );
}


export default Home;