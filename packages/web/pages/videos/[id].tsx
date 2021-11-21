import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { apiUrl } from "../../config/api";
const Video = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-7xl border-dotted">
        <video src={`${apiUrl}/video/${id}`} controls={true} />
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
