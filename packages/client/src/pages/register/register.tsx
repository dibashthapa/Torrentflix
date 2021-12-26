import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../auth/authActions";
import { useAuth } from "../../auth/authProvider";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import s from "./register.module.css";
export const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const { dispatch, state } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name } = form;
    const resp = await registerUser(dispatch, { email, password, name });
    if (resp) {
      navigate("/login");
    }
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
            <label htmlFor="#name">Full Name</label>
            <Input
              type="text"
              required
              id="name"
              onChange={handleChange}
              name="name"
            />
          </div>
          <div>
            <label htmlFor="#email">Email</label>
            <Input
              type="email"
              required
              id="email"
              onChange={handleChange}
              name="email"
            />
          </div>

          <div>
            <label htmlFor="#password">Password</label>
            <Input
              type="password"
              required
              onChange={handleChange}
              name="password"
            />
          </div>

          <Button> Sign Up </Button>
          <Link to="/login">Login</Link>
        </form>
      </div>{" "}
    </div>
  );
};
