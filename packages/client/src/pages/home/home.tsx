import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import s from "./home.module.css";
export const Home: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
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
            <Link to="/register">Sign up</Link>
          </form>
        </div>
      </div>
    </>
  );
};
