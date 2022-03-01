import {useEffect, useState} from 'react';
import WebSocketClient from '../../client/websocket_instance';
import {Card} from '../../components/card';
import {Input} from '../../components/input';
import {AddIcon, LinkIcon} from '../../components/SVGIcons';
import {createVideo, getAllVideos, VideoListResponse} from '../../services/videoService';
import s from './home.module.css';

export const Home: React.FC = () => {
  const [magnetLink, setMagnetLink] = useState('');
  const [videos, setVideos] = useState<VideoListResponse[]>([]);
  const [progressBar, setProgressBar] = useState<{value: string; hash: number}>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createVideo(magnetLink);
    setMagnetLink('');
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
    WebSocketClient.initialize('ws://localhost:5000');
    if (WebSocketClient.conn) {
      WebSocketClient.conn.onmessage = function (msg) {
        const data = JSON.parse(msg.data);
        setProgressBar({value: data.progress, hash: data.data.hashedValue});
      };
    }

    // websocketClient.onmessage = function (message) {
    //   const receivedMsg = JSON.parse(message.data);
    //   const foundVideo = videos.find(
    //     value => value.filename === receivedMsg.data.fileName
    //   );
    //   if (foundVideo) {
    //     const clonedVideos = [...videos];
    //     foundVideo.progress = receivedMsg.progress;
    //     const indexOfFoundVideo = videos.indexOf(foundVideo);
    //     clonedVideos[indexOfFoundVideo] = foundVideo;
    //     setVideos(clonedVideos);
    //   }
    // };
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  tags={value.tags}
                  size={value.size}
                  hash={value.hash}
                  key={index}
                  thumbnail={value.thumbnail}
                  title={value.filename}
                  progress={
                    progressBar?.hash === value.hash ? progressBar?.value : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
