import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import HotelCard from '../../components/HotelCard/HotelCard';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import Title from '../../components/Title/Title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hotelsRequest } from '../../redux/slices/hotelsSlice';
import './hotelspage.scss';

const HotelsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, hotels, hasMore } = useAppSelector(state => state.hotels);
  const [searchQuery, setSearchQuery] = useState('');

  const loadHotels = useCallback(
    (reset = false) => {
      dispatch(
        hotelsRequest({
          title: searchQuery,
          offset: reset ? 0 : undefined,
        }),
      );
    },
    [dispatch, searchQuery],
  );

  useEffect(() => {
    loadHotels(true);
  }, [loadHotels]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasMore ||
      loading
    ) {
      return;
    }
    loadHotels();
  }, [hasMore, loading, loadHotels]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loadHotels(true);
    },
    [loadHotels],
  );

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

        <div className="hotels__search">
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
        </div>

        <section className="hotels__cards">
          {loading && <LogoLoader started />}
          {error && <p>error</p>}
          {hotels && !loading && !error ? (
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
      </main>
    </>
  );
};

export default HotelsPage;
