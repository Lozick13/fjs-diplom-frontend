import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import Slider from '../../components/Slider/Slider';
import Title from '../../components/Title/Title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hotelRoomRequest } from '../../redux/slices/hotelRoomsSlice';
import NavigateButton from '../../UI/buttons/NavigateButton/NavigateButton';
import './hotelroompage.scss';

const HotelRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { loading, error, hotelRoom } = useAppSelector(state => state.hotelRooms);

  useEffect(() => {
    if (id) dispatch(hotelRoomRequest(id));
  }, [dispatch, id]);

  const navigate = useNavigate();

  return (
    <>
      <main className="hotel-room">
        {loading && <LogoLoader started />}
        {error && (
          <>
            <NavigateButton click={() => navigate(-1)} text={'← Назад'} />
            <p>{error}</p>
          </>
        )}
        {hotelRoom && !error && !loading && (
          <>
            <Title text={`Комната гостиницы: "${hotelRoom.hotel.title}"`} backButton />

            <div className="hotel-room__content">
              <Slider images={hotelRoom.images} alt={hotelRoom.hotel.title} />

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
