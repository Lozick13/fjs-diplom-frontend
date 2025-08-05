import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import ReservationCard from '../../components/ReservationCard/ReservationCard';
import Title from '../../components/Title/Title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  deleteReservationRequest,
  reservationsRequest,
} from '../../redux/slices/reservationsSlice';
import Modal from '../../UI/Modal/Modal';
import './reservationspage.scss';

const ReservationsPage = () => {
  // hooks
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, reservations, deleteLoading, deleteError } = useAppSelector(
    state => state.reservations,
  );
  const { user } = useAppSelector(state => state.auth);

  // states
  const [showDeleteStatus, setShowDeleteStatus] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isManagerView, setIsManagerView] = useState(false);

  //check manager
  useEffect(() => {
    if (user?.role === 'manager' && id) {
      setIsManagerView(true);
    } else {
      setIsManagerView(false);
    }
  }, [user, id]);

  //loading reservations
  useEffect(() => {
    if (user) {
      let dateStartParam = null;
      let dateEndParam = null;

      if (startDate) {
        dateStartParam = startDate.toISOString();
      }

      if (endDate) {
        const endDateWithTime = new Date(endDate);
        endDateWithTime.setHours(23, 59, 59, 999);
        dateEndParam = endDateWithTime.toISOString();
      }

      if (isManagerView && id) {
        const params = {
          userId: id,
          ...(dateStartParam && { dateStart: dateStartParam }),
          ...(dateEndParam && { dateEnd: dateEndParam }),
        };
        dispatch(reservationsRequest(params));
      } else {
        const params = {
          ...(dateStartParam && { dateStart: dateStartParam }),
          ...(dateEndParam && { dateEnd: dateEndParam }),
        };
        dispatch(reservationsRequest(params));
      }
    }
  }, [dispatch, user, id, startDate, endDate, isManagerView, showDeleteStatus]);

  //displaying a modal
  useEffect(() => {
    if (deleteLoading) setShowDeleteStatus(true);
    if (deleteError) setShowDeleteStatus(true);
  }, [deleteLoading, deleteError]);

  //close modal
  const handleCloseModal = () => {
    setShowDeleteStatus(false);
  };

  const handleResetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleDeleteReservation = (id: string) => {
    dispatch(deleteReservationRequest({ id }));
  };

  return (
    <main className="reservations">
      <Title text={isManagerView ? `Брони пользователя ${id}` : 'Ваши брони'} />

      <div className="reservations__filters">
        <div className="reservations__date-pickers">
          <div className="reservations__date-picker">
            <span className="reservations__date-picker-label">Дата заезда:</span>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Выберите дату"
              className="reservations__date-picker-input"
            />
          </div>

          <div className="reservations__date-picker">
            <span className="reservations__date-picker-label">Дата выезда:</span>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Выберите дату"
              className="reservations__date-picker-input"
            />
          </div>
        </div>

        {(startDate || endDate) && (
          <button className="reservations__reset-button" onClick={handleResetDates}>
            Сбросить фильтры
          </button>
        )}
      </div>

      {reservations?.length > 0 ? (
        reservations.map(reservation => (
          <section key={reservation.id} className="reservations__cards">
            <ReservationCard
              reservation={reservation}
              onDelete={handleDeleteReservation}
            />
          </section>
        ))
      ) : (
        <p>{isManagerView && `У пользователя ${id} нет бронирований`}</p>
      )}

      {loading && <LogoLoader started />}
      {error && <p>{error}</p>}

      <Modal isOpen={showDeleteStatus} title="Бронирование" onClose={handleCloseModal}>
        <div className="reservations__delete-modal">
          {deleteLoading && <LogoLoader started />}
          {deleteError && <p>{deleteError}</p>}
          {!deleteError && !deleteLoading && <p>Бронь успешно удалена</p>}
        </div>
      </Modal>
    </main>
  );
};

export default ReservationsPage;
