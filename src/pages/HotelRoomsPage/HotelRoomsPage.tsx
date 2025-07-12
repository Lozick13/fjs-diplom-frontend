import { useEffect } from 'react';
import HotelRoomCard from '../../components/HotelRoomCard/HotelRoomCard';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hotelRoomsRequest } from '../../redux/slices/hotelRoomsSlice';
import './hotelroomspage.scss';

const HotelRoomsPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, hotelRooms } = useAppSelector(state => state.hotelRooms);

  useEffect(() => {
    dispatch(hotelRoomsRequest());
  }, [dispatch]);

  return (
    <>
      <main className="hotel-rooms">
        <h1 className="hotel-rooms__title">Комнаты гостиниц</h1>
        <section className="hotel-rooms__cards">
          {loading && <LogoLoader started />}
          {error && <p>error</p>}
          {hotelRooms && !error && !loading ? (
            hotelRooms.map(room => (
              <HotelRoomCard
                key={room.id}
                id={room.id}
                description={room.description}
                images={room.images}
                hotel={room.hotel}
              />
            ))
          ) : (
            <p>Нет доступных комнат</p>
          )}
        </section>
      </main>
    </>
  );
};

export default HotelRoomsPage;
