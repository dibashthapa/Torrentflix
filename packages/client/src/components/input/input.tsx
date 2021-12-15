import { InputHTMLAttributes } from "react";
import s from "./input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return <input className={s.input} {...props} />;
};
