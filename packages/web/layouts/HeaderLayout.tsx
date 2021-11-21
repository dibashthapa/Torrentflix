import { Navbar } from "../components/Navbar";

interface HeaderLayoutProps {
  children?: React.ReactChild | React.ReactNode | React.ReactChildren;
}

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
