import { useCallback, useEffect, useState } from "react";
import { Card } from "../../components/card";
import { Input } from "../../components/input";
import { AddIcon, LinkIcon } from "../../components/SVGIcons";
import { getAllVideos, VideoListResponse } from "../../services/videoService";
import s from "./home.module.css";

export const Home: React.FC = () => {
  const [magnetLink, setMagnetLink] = useState("");
  const [videos, setVideos] = useState<VideoListResponse[]>([]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMagnetLink(e.target.value);
  };

  useEffect(() => {
    async function fetchVideos() {
      const response = await getAllVideos();
      const videoList = response.data.data;
      setVideos(videoList);
    }
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
                <Card
                  key={index}
                  tags={value.tags}
                  thumbnail={value.thumbnail}
                  title={value.filename}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
