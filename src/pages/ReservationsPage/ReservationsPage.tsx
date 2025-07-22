import { useEffect, useState } from 'react';
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
  const dispatch = useAppDispatch();
  const { loading, error, reservations, deleteLoading, deleteError } = useAppSelector(
    state => state.reservations,
  );
  const { user } = useAppSelector(state => state.auth);

  // states
  const [showDeleteStatus, setShowDeleteStatus] = useState(false);

  //loading reservations
  useEffect(() => {
    if (user) dispatch(reservationsRequest({ id: user.id }));
  }, [dispatch, user]);

  //displaying a modal
  useEffect(() => {
    if (deleteLoading) setShowDeleteStatus(true);
    if (deleteError) setShowDeleteStatus(true);
  }, [deleteLoading, deleteError]);

  //close modal
  const handleCloseModal = () => {
    setShowDeleteStatus(false);
    if (user) dispatch(reservationsRequest({ id: user.id }));
  };

  return (
    <main className="reservations">
      <Title text="Ваши брони" />

      {reservations?.map(reservation => (
        <section key={reservation.id} className="reservations__cards">
          <ReservationCard
            reservation={reservation}
            onDelete={(id: string) => dispatch(deleteReservationRequest({ id }))}
          />
        </section>
      ))}

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
