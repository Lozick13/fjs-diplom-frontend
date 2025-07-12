import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev: number) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev: number) => (prev - 1 + images.length) % images.length);
  };
  return (
    <>
      <article className="hotel-room-card">
        <h2 className="hotel-room-card__title">
          <b>Гостиница:</b>
          <br />"{hotel.title}"
        </h2>

        {images.length > 0 && (
          <div className="hotel-room-card__slider">
            <img
              className="hotel-room-card__img"
              src={import.meta.env.VITE_API_URL.slice(0, -3) + images[currentImageIndex]}
              alt={hotel.title}
              key={currentImageIndex}
            />
            {images.length > 1 && (
              <>
                <button
                  className="slider-arrow slider-arrow_left"
                  onClick={e => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  &lt;
                </button>
                <button
                  className="slider-arrow slider-arrow_right"
                  onClick={e => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  &gt;
                </button>
              </>
            )}
          </div>
        )}
        <p className="hotel-room-card__description">{description}</p>
        <BaseButton
          text="Перейти"
          click={() => navigate(`/hotels/${hotel.id}/rooms/${id}`)}
        />
      </article>
    </>
  );
};

export default HotelRoomCard;
