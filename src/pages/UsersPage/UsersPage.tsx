import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import Title from '../../components/Title/Title';
import UserCard from '../../components/UserCard/UserCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { usersRequest } from '../../redux/slices/usersSlice';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import './userspage.scss';

const HotelsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, users, hasMore } = useAppSelector(state => state.users);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(usersRequest({}));
  }, [dispatch]);
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) dispatch(usersRequest({}));
  }, [loading, hasMore, dispatch]);

  return (
    <main className="users">
      <Title
        text="Пользователи"
        additionallyButton={
          user?.role === 'admin'
            ? {
                click: () => navigate('/users/create'),
                text: 'Добавить пользователя →',
              }
            : undefined
        }
      />

      <section className="users__cards">
        {users.map(user => {
          return (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
              contactPhone={user.contactPhone}
            />
          );
        })}
      </section>

      {error && <p>{error}</p>}
      {loading && <LogoLoader started />}
      {hasMore && users.length > 0 && (
        <BaseButton text={'Показать еще'} click={handleLoadMore} type="button" />
      )}
    </main>
  );
};

export default HotelsPage;
