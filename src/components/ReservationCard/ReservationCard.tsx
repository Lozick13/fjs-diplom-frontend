import type React from 'react';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import Time from '../../UI/Time/Time';
import Slider from '../Slider/Slider';
import './reservationcard.scss';

interface ReservationCardProps {
  reservation: {
    id: string;
    startDate: string;
    endDate: string;
    hotelRoom: {
      description: string;
      images: string[];
    };
    hotel: {
      title: string;
      description: string;
    };
  };
  onDelete: (id: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation: { id, startDate, endDate, hotelRoom, hotel },
  onDelete,
}) => {
  return (
    <article className="reservation-card">
      <header className="reservation-card__header">
        <h2 className="reservation-card__title">
          Бронь в гостиницу: <br />
          {hotel.title}
        </h2>
        <Time startDate={startDate} endDate={endDate} />
      </header>

      <div className="reservation-card__content">
        <section className="reservation-card__info">
          <div className="reservation-card__description">
            <h3 className="reservation-card__subtitle">О гостинице:</h3>
            <p>{hotel.description}</p>
          </div>

          <div className="reservation-card__description">
            <h3 className="reservation-card__subtitle">О номере:</h3>
            <p>{hotelRoom.description}</p>
          </div>
        </section>

        <section className="reservation-card__gallery">
          <Slider images={hotelRoom.images} alt={`Фотографии отеля ${hotel.title}`} />
        </section>
      </div>

      <BaseButton
        text="Отменить бронь"
        click={() => onDelete(id)}
        aria-label="Отменить бронь"
      />
    </article>
  );
};

export default ReservationCard;
