import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import HotelCard from '../../components/HotelCard/HotelCard';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import Title from '../../components/Title/Title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hotelsRequest } from '../../redux/slices/hotelsSlice';
import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import './hotelspage.scss';

const HotelsPage = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, hotels, hasMore } = useAppSelector(state => state.hotels);

  // states
  const [searchQuery, setSearchQuery] = useState('');

  //loading hotels
  const loadHotels = useCallback(
    (reset = false) => {
      dispatch(hotelsRequest({ reset, title: reset ? searchQuery : undefined }));
    },
    [dispatch, searchQuery],
  );
  useEffect(() => {
    loadHotels(true);
  }, [loadHotels]);

  //search hotels
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loadHotels(true);
    },
    [loadHotels],
  );

  //search for additional hotels
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadHotels();
    }
  }, [loading, hasMore, loadHotels]);
  return (
    <main className="hotels">
      <Title
        text="Гостиницы"
        additionallyButton={{
          click: () => navigate('/hotels/create'),
          text: 'Добавить отель →',
        }}
      />

      <section className="hotels__search">
        <FormTemplate
          handleSubmit={handleSearch}
          inputs={[
            {
              type: 'text',
              value: searchQuery,
              change: e => setSearchQuery(e.target.value),
              placeholder: 'Поиск по названию...',
              id: 'search',
              name: 'search',
              required: true,
            },
          ]}
          buttons={[]}
          lineDisplay
        />
      </section>

      <section className="hotels__cards">
        {hotels ? (
          hotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              title={hotel.title}
              description={hotel.description}
            />
          ))
        ) : (
          <p>Нет доступных отелей</p>
        )}
      </section>

     {error && <p>{error}</p>}
        {loading && <LogoLoader started />}
        {hasMore && hotels.length > 0 && (
          <BaseButton text={'Показать еще'} click={handleLoadMore} type="button" />
        )}
    </main>
  );
};

export default HotelsPage;
