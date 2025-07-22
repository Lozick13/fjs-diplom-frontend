import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import { addReservationsRequest } from '../../redux/slices/reservationsSlice';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
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
  const { id } = useParams<{ id: string }>();

  // states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const formatDateToDDMMYYYY = (date: Date | null): string => {
    if (!date) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleBooking = () => {
    if (!id || !startDate || !endDate) return;
    const formattedStartDate = formatDateToDDMMYYYY(startDate);
    const formattedEndDate = formatDateToDDMMYYYY(endDate);

    dispatch(
      addReservationsRequest({
        hotelRoom: id,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    );
    setStartDate(null);
    setEndDate(null);
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

            <article className="hotel-room__booking">
              <h2 className="hotel-room__subtitle">Забронировать номер</h2>
              <div className="hotel-room__date-pickers">
                <div className="hotel-room__date-picker">
                  <span className="hotel-room__date-picker-label">Дата заезда:</span>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Выберите дату"
                    className="hotel-room__date-picker-input"
                  />
                </div>

                <div className="hotel-room__date-picker">
                  <span className="hotel-room__date-picker-label">Дата выезда:</span>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate === null ? undefined : startDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Выберите дату"
                    className="hotel-room__date-picker-input"
                  />
                </div>
              </div>
              <BaseButton
                click={handleBooking}
                text={reservationLoading ? 'Бронируем...' : 'Забронировать'}
              />
              {reservationError && <p>{reservationError}</p>}
              {success && <p>Номер успешно забронирован</p>}
            </article>

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
