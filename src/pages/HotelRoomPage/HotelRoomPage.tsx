import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import ReserveRoom from '../../components/ReserveRoom/ReserveRoom';
import Slider from '../../components/Slider/Slider';
import Title from '../../components/Title/Title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddRoomModal from '../../modals/AddRoomModal/AddRoomModal';
import {
  hotelRoomRequest,
  updateHotelRoomRequest,
} from '../../redux/slices/hotelRoomsSlice';
import './hotelroompage.scss';

const HotelRoomPage = () => {
  // hooks
  const dispatch = useAppDispatch();
  const { loading, error, hotelRoom } = useAppSelector(state => state.hotelRooms);
  const {
    loading: reservationLoading,
    error: reservationError,
    success,
  } = useAppSelector(state => state.reservations);
  const { user } = useAppSelector(state => state.auth);
  const { id } = useParams<{ id: string }>();

  // states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //loading room
  useEffect(() => {
    if (id) dispatch(hotelRoomRequest(id));
  }, [dispatch, id]);

  //save changes
  const handleEditRoom = async (data: {
    hotel: string;
    description: string;
    images: File[];
    isEnabled: boolean;
  }) => {
    if (!id || !hotelRoom?.hotel) return;

    await dispatch(
      updateHotelRoomRequest({
        id: id,
        hotel: data.hotel,
        description: data.description,
        images: data.images,
        isEnabled: data.isEnabled,
      }),
    );
    setIsEditModalOpen(false);
    dispatch(hotelRoomRequest(id));
  };

  return (
    <>
      <main className="hotel-room">
        <Title
          text={`Комната гостиницы:\n${
            hotelRoom?.hotel?.title
              ? `"${hotelRoom.hotel.title}"`
              : error
              ? 'ГОСТИНИЦА НЕ НАЙДЕНА'
              : '...'
          }`}
          backButton
          additionallyButton={
            user?.role === 'admin'
              ? {
                  click: () => setIsEditModalOpen(true),
                  text: 'Редактировать',
                }
              : undefined
          }
        />

        {hotelRoom && (
          <>
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

            {id && user?.role === 'client' && (
              <ReserveRoom
                id={id}
                loading={reservationLoading}
                error={reservationError}
                success={success}
              />
            )}
            {user?.role !== 'client' && <p>Авторизуйтесь для бронирования</p>}

            <AddRoomModal
              hotelId={hotelRoom?.hotel.id || ''}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={data => handleEditRoom(data)}
            />
          </>
        )}
        {loading && <LogoLoader started />}
        {error && <p>{error}</p>}
      </main>
    </>
  );
};

export default HotelRoomPage;
