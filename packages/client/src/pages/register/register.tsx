import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import s from "./register.module.css";
export const Register = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <form onSubmit={handleSubmit} className={s.form}>
          <div>
            <label htmlFor="#name">Full Name</label>
            <Input type="text" required id="name" />
          </div>
          <div>
            <label htmlFor="#email">Email</label>
            <Input type="email" required id="email" />
          </div>

          <div>
            <label htmlFor="#password">Password</label>
            <Input type="password" required />
          </div>

          <Button> Sign Up </Button>
          <Link to="/login">Login</Link>
        </form>
      </div>{" "}
    </div>
  );
};
