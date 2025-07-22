import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useAppDispatch } from '../../hooks';
import { addReservationsRequest } from '../../redux/slices/reservationsSlice';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import './reserveroom.scss';

interface ReserveRoomProps {
  id: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const ReserveRoom = ({ id, loading, error, success }: ReserveRoomProps) => {
  // hooks
  const dispatch = useAppDispatch();
  // states
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
      <article className="reserve-room">
        <h2 className="reserve-room__title">Забронировать номер</h2>
        <div className="reserve-room__date-pickers">
          <div className="reserve-room__date-picker">
            <span className="reserve-room__date-picker-label">Дата заезда:</span>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Выберите дату"
              className="reserve-room__date-picker-input"
            />
          </div>

          <div className="reserve-room__date-picker">
            <span className="reserve-room__date-picker-label">Дата выезда:</span>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate === null ? undefined : startDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Выберите дату"
              className="reserve-room__date-picker-input"
            />
          </div>
        </div>
        <BaseButton
          click={handleBooking}
          text={loading ? 'Бронируем...' : 'Забронировать'}
        />
        {error && <p>{error}</p>}
        {success && <p>Номер успешно забронирован</p>}
      </article>
    </>
  );
};

export default ReserveRoom;
