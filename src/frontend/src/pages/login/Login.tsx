import Header from '../../components/Header';
import Credentials from '../../components/Credentials';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/authenticate';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
        if(localStorage.getItem("auth_token")) {
            navigate('/'); 
        }
    },
  });

  const submitLogin = (username: string, password: string) => {
    mutate({
      username: username,
      password: password,
    });
  };

  if (localStorage.getItem('auth_token')) {
    window.location.href = '/';
  } else {
      return (
        <>
          <Header />
          <div id="page-register">
            <Credentials onSubmit={submitLogin} />
          </div>
        </>
      );
  }

};

export default Register;
