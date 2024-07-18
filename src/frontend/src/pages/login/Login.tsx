import Header from '../../components/Header';
import Credentials from '../../components/Credentials';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/authenticate';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/store';
import { useEffect } from 'react';


const Register = () => {
    const navigate = useNavigate();
    const {updateCurrentPageName} = useStore();
    

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
        if(localStorage.getItem("auth_token")) {
            navigate('/'); 
        }
    },
  });

  useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            window.location.href = '/';
        } 
        updateCurrentPageName("Login");
    }, []);

  const submitLogin = (username: string, password: string) => {
    mutate({
      username: username,
      password: password,
    });
  };

    return (
        <>
            <Header />
                <div id="page-register">
                <Credentials onSubmit={submitLogin} />
            </div>
        </>
    );
};

export default Register;
