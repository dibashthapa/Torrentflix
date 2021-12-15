import s from "./button.module.css";
export const Button: React.FC = ({ children }) => {
  return <button className={s.btn}>{children}</button>;
};
