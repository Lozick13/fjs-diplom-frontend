import type React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import './hotelcard.scss';

interface props {
  title: string;
  description: string;
  id: string;
}

const HotelCard: React.FC<props> = ({ title, description, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <article className="hotel-card">
        <div className="hotel-card__header">
          <h2 className="hotel-card__title">{title}</h2>
          <img className="hotel-card__img" src="/assets/hotel.png" alt="" />
        </div>
        <span className="hotel-card__description">{description}</span>
        <BaseButton text="Перейти" click={() => navigate(`${id}`)} />
      </article>
    </>
  );
};

export default HotelCard;
