import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../auth/authActions";
import { useAuth } from "../../auth/authProvider";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import s from "./login.module.css";
export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { dispatch, state } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    loginUser(dispatch, { email, password });
  };

  useEffect(() => {
    if (state.isUserLoggedIn) {
      navigate("/");
    }
  }, [state.isUserLoggedIn]);
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
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
            <Input
              type="password"
              required
              name="password"
              onChange={handleChange}
            />
          </div>

          <Button> Login </Button>
          <Link to="/register">Sign Up</Link>
        </form>
      </div>{" "}
    </div>
  );
};
