import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import s from "./home.module.css";
const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={s.search__icon}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

export const Home: React.FC = () => {
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.container}>
          <div className={s.search__container}>
            <Input type="text" placeholder="Paste Link here" />
            <AddIcon />
          </div>

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
