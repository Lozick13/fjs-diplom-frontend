import type React from 'react';
import './usercard.scss';

interface props {
  id: string;
  email: string;
  name: string;
  role?: string;
  contactPhone?: string;
}

const UserCard: React.FC<props> = ({ id, email, name, role, contactPhone }) => {
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
      </article>
    </>
  );
};

export default UserCard;
