import { Link as ReactLink, LinkProps } from "react-router-dom";
import s from "./link.module.css";
export const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <ReactLink {...rest} className={s.link}>
      {children}
    </ReactLink>
  );
};
