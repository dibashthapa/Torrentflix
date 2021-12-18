import { useCallback, useState } from "react";
import { Input } from "../../components/input";
import { AddIcon, LinkIcon } from "../../components/SVGIcons";
import s from "./home.module.css";

export const Home: React.FC = () => {
  const [magnetLink, setMagnetLink] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMagnetLink(e.target.value);
  };
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.container}>
          <form onSubmit={onSubmit} className={s.search__container}>
            <LinkIcon />
            <Input
              type="text"
              placeholder="Paste Link here"
              onChange={handleChange}
              value={magnetLink}
            />
            <AddIcon />
          </form>

          <div className={s.video__container}>
            <h2>My Videos</h2>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>SpiderMan</td>
                  <td>04:05</td>
                  <td>Downloaded</td>
                  <td>100%</td>
                  <td>
                    <div className={s.actions__container}>
                      <div>Play</div>
                      <div>Delete</div>
                      <div>Edit</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>SpiderMan</td>
                  <td>04:05</td>
                  <td>Downloaded</td>
                  <td>100%</td>
                  <td>Delete</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>SpiderMan</td>
                  <td>04:05</td>
                  <td>Downloaded</td>
                  <td>100%</td>
                  <td>Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
