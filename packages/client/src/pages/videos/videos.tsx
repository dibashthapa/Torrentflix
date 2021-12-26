import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config";
import { getSingleVideo, VideoListResponse } from "../../services/videoService";
import s from "./videos.module.css";

export const Video = () => {
  const params = useParams();
  const [video, setVideo] = useState<VideoListResponse>();

  const fetchSingleVideo = async () => {
    if (!params.id) return;
    const singleVideo = await getSingleVideo(params.id);
    setVideo(singleVideo.data.data);
  };

  useEffect(() => {
    fetchSingleVideo();
  }, [params.id]);
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <video controls poster={video?.thumbnail} className={s.video}>
          <source src={`${apiUrl}/video/${params.id}/play`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>{" "}
      </div>
    </div>
  );
};
