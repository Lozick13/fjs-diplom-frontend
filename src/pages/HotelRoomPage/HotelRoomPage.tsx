import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hotelRoomRequest } from '../../redux/slices/hotelRoomsSlice';
import './hotelroompage.scss';

const HotelRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useAppDispatch();
  const { loading, error, hotelRoom } = useAppSelector(state => state.hotelRooms);

  useEffect(() => {
    if (id) dispatch(hotelRoomRequest(id));
  }, [dispatch, id]);

  const navigate = useNavigate();
  const nextImage = () => {
    if (hotelRoom?.images)
      setCurrentImageIndex((prev: number) => (prev + 1) % hotelRoom.images.length);
  };
  const prevImage = () => {
    if (hotelRoom?.images)
      setCurrentImageIndex(
        (prev: number) => (prev - 1 + hotelRoom.images.length) % hotelRoom.images.length,
      );
  };
  return (
    <>
      <main className="hotel-room">
        <button className="hotel-room__back-button" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        {loading && <LogoLoader started />}
        {error && <p>{error}</p>}
        {hotelRoom && !error && !loading && (
          <>
            <h1 className="hotel-room__title">
              Комната гостиницы: "{hotelRoom.hotel.title}"
            </h1>

            <div className="hotel-room__content">
              {hotelRoom.images.length > 0 && (
                <div className="hotel-room__slider">
                  <img
                    className="hotel-room__img"
                    src={
                      import.meta.env.VITE_API_URL.slice(0, -3) +
                      hotelRoom.images[currentImageIndex]
                    }
                    alt={hotelRoom.hotel.title}
                    key={currentImageIndex}
                  />
                  {hotelRoom.images.length > 1 && (
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
              <article className="hotel-room__text-content">
                <section className="hotel-room__info">
                  <h2 className="hotel-room__subtitle">Описание номера:</h2>
                  <p className="hotel-room__description">{hotelRoom.description}</p>
                </section>

                <section className="hotel-room__info">
                  <h2 className="hotel-room__subtitle">О гостинице:</h2>
                  <p className="hotel-room__description">{hotelRoom.hotel.description}</p>
                </section>
              </article>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default HotelRoomPage;
