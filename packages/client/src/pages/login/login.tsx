import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import s from "./login.module.css";
export const Login = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <form onSubmit={handleSubmit} className={s.form}>
          <div>
            <label htmlFor="#email">Email</label>
            <Input type="email" required id="email" />
          </div>

          <div>
            <label htmlFor="#password">Password</label>
            <Input type="password" required />
          </div>

          <Button> Login </Button>
          <Link to="/register">Sign Up</Link>
        </form>
      </div>{" "}
    </div>
  );
};
