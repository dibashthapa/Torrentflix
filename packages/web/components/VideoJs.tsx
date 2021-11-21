import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";

interface VideoJsProps {
  options: object;
  onReady: (player: any) => void;
}

export const VideoJs: React.FC<VideoJsProps> = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);
  const { options, onReady } = props;

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        if (onReady) {
          onReady(player);
        }
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return <video ref={videoRef} className="video-js vjs-big-play-centered" />;
};
