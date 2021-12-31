import s from "./card.module.css";
interface CardProps {
  thumbnail: string;
  title: string;
  tags: string[];
  size: string;
}
export const Card: React.FC<CardProps> = (props) => {
  const { thumbnail, title, tags , size} = props;
  return (
    <div className={s.card__container}>
      <div className={s.card}>
        <div className={s.card_image__container}>
          <img src={thumbnail} alt={title} className={s.card__image} />
        </div>
        <div className={s.card__footer}>
          <h1 className={s.card__footer__title}>
            {title.replaceAll("+", " ")}
          </h1>
          <div className={s.video__size}>
            <p>Download Size</p>
            <p>{ size }</p>
          </div>
          <div className={s.card__footer__tags}>
            {tags.slice(1, 3).map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
