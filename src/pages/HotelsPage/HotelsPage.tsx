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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, hotels, hasMore } = useAppSelector(state => state.hotels);
  const [searchQuery, setSearchQuery] = useState('');

  const loadHotels = useCallback(
    (reset = false) => {
      dispatch(hotelsRequest({ reset, title: reset ? searchQuery : undefined }));
    },
    [dispatch, searchQuery],
  );

  useEffect(() => {
    loadHotels(true);
  }, [loadHotels]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loadHotels(true);
    },
    [loadHotels],
  );

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadHotels();
    }
  }, [loading, hasMore, loadHotels]);
  return (
    <>
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
          )}{' '}
          {loading && <LogoLoader started />}
          {error && <p>error</p>}
        </section>

        {hasMore && !loading && hotels.length > 0 && (
          <BaseButton text="Показать еще" click={handleLoadMore} type="button" />
        )}
      </main>
    </>
  );
};

export default HotelsPage;
