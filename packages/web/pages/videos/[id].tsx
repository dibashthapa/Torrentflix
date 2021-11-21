import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRef } from "react";
import { VideoJs } from "../../components/VideoJs";
type VideoJsOptions = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sources: {
    src: string;
    type: string;
  }[];
};

const Video = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const videoJsOptions: VideoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    sources: [
      {
        src: `http://localhost:5600/video/${id}`,
        type: "video/mp4",
      },
    ],
  };

  const playerRef = useRef(null);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <VideoJs options={videoJsOptions} onReady={handlePlayerReady} />{" "}
      </div>
    </div>
  );
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;

  return {
    props: { id },
  };
};
export default Video;
