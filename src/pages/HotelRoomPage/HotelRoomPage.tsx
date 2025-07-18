import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
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
          additionallyButton={{
            click: () => setIsEditModalOpen(true),
            text: 'Редактировать',
          }}
        />

        {hotelRoom  && (
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
          </>
        )}
        {loading && <LogoLoader started />}
        {error && (
          <>
            <p>{error}</p>
          </>
        )}

        <AddRoomModal
          hotelId={hotelRoom?.hotel.id || ''}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={data => handleEditRoom(data)}
        />
      </main>
    </>
  );
};

export default HotelRoomPage;
