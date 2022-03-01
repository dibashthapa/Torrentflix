import React, {InputHTMLAttributes} from 'react';
import s from './input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input className={s.input} {...props} ref={ref} />;
});
