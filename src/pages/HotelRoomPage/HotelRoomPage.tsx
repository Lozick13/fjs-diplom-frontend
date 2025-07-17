import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import Slider from '../../components/Slider/Slider';
import Title from '../../components/Title/Title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddRoomModal from '../../modals/AddRoomModal/AddRoomModal';
import {
  hotelRoomRequest,
  updateHotelRoomRequest,
} from '../../redux/slices/hotelRoomsSlice';
import NavigateButton from '../../UI/buttons/NavigateButton/NavigateButton';
import './hotelroompage.scss';

const HotelRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { loading, error, hotelRoom } = useAppSelector(state => state.hotelRooms);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(hotelRoomRequest(id));
  }, [dispatch, id]);

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
            <Title
              text={`Комната гостиницы: "${hotelRoom.hotel.title}"`}
              backButton
              additionallyButton={{
                click: () => setIsEditModalOpen(true),
                text: 'Редактировать',
              }}
            />

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
        )}{' '}
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
