import type React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import Slider from '../Slider/Slider';
import './hotelroomcard.scss';

interface props {
  id: string;
  description: string;
  images: string[];
  hotel: {
    id: string;
    title: string;
  };
}

const HotelRoomCard: React.FC<props> = ({ id, description, images, hotel }) => {
  const navigate = useNavigate();
  return (
    <>
      <article className="hotel-room-card">
        <h2 className="hotel-room-card__title">
          <b>Гостиница:</b>
          <br />"{hotel.title}"
        </h2>

        <Slider images={images} alt={hotel.title} />
        <p className="hotel-room-card__description">{description}</p>
        <BaseButton text="Перейти" click={() => navigate(`/hotel-rooms/${id}`)} />
      </article>
    </>
  );
};

export default HotelRoomCard;
