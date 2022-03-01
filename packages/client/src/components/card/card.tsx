import s from './card.module.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import WebSocketClient from '../../client/websocket_instance';
interface CardProps {
  thumbnail: string;
  title: string;
  tags: string[];
  size: string;
  progress?: string;
  hash: number;
}
export const Card: React.FC<CardProps> = props => {
  const {thumbnail, title, tags, progress} = props;

  return (
    <div className={s.card__container}>
      <div className={s.card}>
        <div className={s.card_image__container}>
          <img src={thumbnail} alt={title} className={s.card__image} />
        </div>
        <div className={s.card__footer}>
          <Link to={`/videos/${props.hash}`} className={s.card__footer__title}>
            {title.replaceAll('+', ' ')}
          </Link>

          <div className={s.video__size}>
            <p>Downloading .... {progress}</p>
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
