import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HotelRoomCard from '../../components/HotelRoomCard/HotelRoomCard';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import Title from '../../components/Title/Title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addHotelRoomRequest,
  hotelRoomsRequest,
} from '../../redux/slices/hotelRoomsSlice';
import { hotelRequest, updateHotelRequest } from '../../redux/slices/hotelsSlice';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import NavigateButton from '../../UI/buttons/NavigateButton/NavigateButton';
import AddRoomModal from '../AddRoomModal/AddRoomModal';
import EditHotelModal from '../EditHotelModal/EditHotelModal';
import './hotelpage.scss';

const HotelPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    loading: hotelsLoading,
    error: hotelsError,
    hotel,
  } = useAppSelector(state => state.hotels);
  const {
    loading: roomsLoading,
    error: roomsError,
    hotelRooms,
    adding: isAddingRoom,
    addError: addRoomError,
  } = useAppSelector(state => state.hotelRooms);

  useEffect(() => {
    if (id) {
      dispatch(hotelRequest(id));
      dispatch(hotelRoomsRequest({ hotel: id }));
    }
  }, [dispatch, id]);

  const handleAddRoom = async (data: {
    hotel: string;
    description: string;
    images: File[];
    isEnabled: boolean;
  }) => {
    await dispatch(addHotelRoomRequest(data));
    setIsModalOpen(false);
    dispatch(hotelRoomsRequest({ hotel: id, reset: true }));
  };

  const handleEditHotel = async (data: { title: string; description: string }) => {
    if (!id) return;
    await dispatch(
      updateHotelRequest({ id: id, title: data.title, description: data.description }),
    );
    setIsEditModalOpen(false);
    dispatch(hotelRequest(id));
  };

  return (
    <>
      <main className="hotel">
        {hotelsLoading && <LogoLoader started />}

        {hotelsError && (
          <>
            <NavigateButton click={() => navigate(-1)} text={'← Назад'} />
            <p>{hotelsError}</p>
          </>
        )}
        {hotel && !hotelsError && !hotelsLoading && (
          <>
            <Title
              text={`Гостиница: "${hotel.title}"`}
              backButton
              additionallyButton={{
                click: () => setIsEditModalOpen(true),
                text: 'Редактировать',
              }}
            />

            <div className="hotel__content">
              <article className="hotel__text-content">
                <section className="hotel__info">
                  <h2 className="hotel__subtitle">ID гостиницы:</h2>
                  <p className="hotel__description">{hotel.id}</p>
                </section>
                <section className="hotel__info">
                  <h2 className="hotel__subtitle">Описание:</h2>
                  <p className="hotel__description">{hotel.description}</p>
                </section>
              </article>

              <div className="hotel__rooms-title">
                <h2>Номера:</h2>
                <div className="hotel__add-rooms">
                  <IconButton icon="add" click={() => setIsModalOpen(true)} />
                </div>
              </div>

              <article className="hotel__rooms">
                {hotelRooms &&
                  id &&
                  hotelRooms.map(room => (
                    <HotelRoomCard
                      key={room.id}
                      id={room.id}
                      description={room.description}
                      images={room.images}
                      hotel={{ id, title: hotel.title }}
                    />
                  ))}
                {roomsLoading && <LogoLoader started />}
                {roomsError && <p>{roomsError}</p>}
                {addRoomError && <p className="error">{addRoomError}</p>}
              </article>
            </div>
          </>
        )}

        <AddRoomModal
          hotelId={id || ''}
          isOpen={isModalOpen}
          onClose={() => !isAddingRoom && setIsModalOpen(false)}
          onSubmit={data => handleAddRoom(data)}
        />
        {hotel && (
          <EditHotelModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={data => handleEditHotel(data)}
            initialTitle={hotel.title}
            initialDescription={hotel.description}
          />
        )}
      </main>
    </>
  );
};

export default HotelPage;
