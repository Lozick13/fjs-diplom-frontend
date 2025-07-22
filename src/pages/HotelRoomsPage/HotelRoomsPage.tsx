import { useCallback, useEffect } from 'react';
import HotelRoomCard from '../../components/HotelRoomCard/HotelRoomCard';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import Title from '../../components/Title/Title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hotelRoomsRequest } from '../../redux/slices/hotelRoomsSlice';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import './hotelroomspage.scss';

const HotelRoomsPage = () => {
  // hooks
  const dispatch = useAppDispatch();
  const { loading, error, hotelRooms, hasMore } = useAppSelector(
    state => state.hotelRooms,
  );

  //loading rooms
  const loadHotelRooms = useCallback(
    (reset = false) => {
      dispatch(
        hotelRoomsRequest({
          reset,
        }),
      );
    },
    [dispatch],
  );
  useEffect(() => {
    loadHotelRooms(true);
  }, [loadHotelRooms]);

  //search for additional rooms
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadHotelRooms();
    }
  }, [loading, hasMore, loadHotelRooms]);
  return (
    <>
      <main className="hotel-rooms">
        <Title text="Комнаты гостиниц" />
        <section className="hotel-rooms__cards">
          {hotelRooms ? (
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
        {error && <p>{error}</p>}
        {loading && <LogoLoader started />}
        {hasMore && hotelRooms.length > 0 && (
          <BaseButton text={'Показать еще'} click={handleLoadMore} type="button" />
        )}
      </main>
    </>
  );
};

export default HotelRoomsPage;
