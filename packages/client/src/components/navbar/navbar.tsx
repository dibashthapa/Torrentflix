import s from "./navbar.module.css";
export const Navbar = () => {
  return (
    <div className={s.navbar}>
      <div className={s.nav__wrapper}>
        <h5 className={s.nav__title}>Torrent Flix</h5>
      </div>
    </div>
  );
};
