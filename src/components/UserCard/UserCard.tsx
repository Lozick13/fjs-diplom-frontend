import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import NavigateButton from '../../UI/buttons/NavigateButton/NavigateButton';
import './usercard.scss';

interface props {
  id: string;
  email: string;
  name: string;
  role?: string;
  contactPhone?: string;
}

const UserCard: React.FC<props> = ({ id, email, name, role, contactPhone }) => {
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <>
      <article className="user-card">
        <h2 className="user-card__title">
          <span className="user-card__id">{`id: ${id}`}</span>
          {name}
        </h2>

        <div className="user-card__content">
          <span className="user-card__item">Почта: {email}</span>
          {contactPhone && (
            <span className="user-card__item">Телефон: {contactPhone}</span>
          )}
        </div>

        {role && (
          <span className={`user-card__role user-card__role_${role}`}>{role}</span>
        )}

        {user?.role === 'manager' && (
          <NavigateButton
            text="Посмотреть список броней"
            click={() => navigate(`/reservations/${id}`)}
          />
        )}
      </article>
    </>
  );
};

export default UserCard;
