import { ClipboardIcon, PlusIcon } from "@heroicons/react/outline";
import { FormEvent, useRef } from "react";
import styles from "../styles/Navbar.module.css";

interface NavbarProps {
  fetchFolders: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ fetchFolders }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { magnetLink: inputRef.current?.value };
    const resp = await fetch("http://localhost:5600/video", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (inputRef.current) inputRef.current.value = "";
    fetchFolders();
  };
  return (
    <div className={styles.navContainer}>
      <div className={styles.menuContainer}>
        <p className={styles.title}>Torrent Flix</p>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.menu}>
            <div className={styles.inputContainer}>
              <ClipboardIcon className="h-8 block mr-4" />

              <input
                type="text"
                className={styles.search}
                placeholder="Paste your magnet link here"
                ref={inputRef}
              />
              <PlusIcon className="h-8 block ml-4 bg-gray-200" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
