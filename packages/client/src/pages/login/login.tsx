import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../auth/authActions';
import {useAuth} from '../../auth/authProvider';
import {Button} from '../../components/button';
import {Input} from '../../components/input';
import {Link} from '../../components/link';
import {Alert} from '../../components/alert';
import s from './login.module.css';
export const Login = () => {
  const [form, setForm] = useState({email: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);
  const {dispatch, state} = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const {email, password} = form;
    loginUser(dispatch, {email, password});
    setIsLoading(false);
  };

  useEffect(() => {
    if (state.isUserLoggedIn) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isUserLoggedIn]);
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {state.errorMessage && <Alert status="error">{state.errorMessage}</Alert>}
        <form onSubmit={handleSubmit} className={s.form}>
          <div>
            <label htmlFor="#email">Email</label>
            <Input
              type="email"
              required
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="#password">Password</label>
            <Input type="password" required name="password" onChange={handleChange} />
          </div>

          <Button isLoading={isLoading}> Login </Button>
          <Link to="/register">Sign Up</Link>
        </form>
      </div>{' '}
    </div>
  );
};
