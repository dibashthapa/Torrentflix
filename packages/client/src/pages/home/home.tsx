import { useEffect, useState } from "react";
import { Card } from "../../components/card";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { AddIcon, LinkIcon } from "../../components/SVGIcons";
import {
  createVideo,
  getAllVideos,
  VideoListResponse,
} from "../../services/videoService";
import s from "./home.module.css";

export const Home: React.FC = () => {
  const [magnetLink, setMagnetLink] = useState("");
  const [videos, setVideos] = useState<VideoListResponse[]>([]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createVideo(magnetLink);
    setMagnetLink("");
    await fetchVideos();
  };
  async function fetchVideos() {
    const response = await getAllVideos();
    const videoList = response.data.data;
    setVideos(videoList);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMagnetLink(e.target.value);
  };

  useEffect(() => {
    fetchVideos();
  }, []);
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
            <div className={s.videos}>
              {videos.map((value, index) => (
                <Link to={`/videos/${value.hash}`} key={index}>
                  <Card
                    tags={value.tags}
                    thumbnail={value.thumbnail}
                    title={value.filename}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
