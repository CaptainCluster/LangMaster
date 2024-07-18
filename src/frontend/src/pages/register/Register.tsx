import Header from '../../components/Header';
import Credentials from '../../components/Credentials';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/authenticate';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/store';
import { useEffect } from 'react';

function Register() {

    const navigate = useNavigate();
    const {updateCurrentPageName} = useStore();
    
    const { mutate } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate('/login');
        },
    });
    
    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            window.location.href = '/';
        } 
        updateCurrentPageName("Register");
    }, []);
  
  const submitRegister = (username: string, password: string) => {
      mutate({
          username: username,
          password: password,
        });
    };

    return (
        <>
            <Header/>
            <div id="page-register">
                <Credentials onSubmit={submitRegister} />
            </div>
        </>
    );
};

export default Register;
