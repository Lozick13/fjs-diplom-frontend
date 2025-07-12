import { useEffect } from 'react';
import HotelCard from '../../components/HotelCard/HotelCard';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hotelsRequest } from '../../redux/slices/hotelsSlice';
import './hotelspage.scss';

const HotelsPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, hotels } = useAppSelector(state => state.hotels);

  useEffect(() => {
    dispatch(hotelsRequest());
  }, [dispatch]);

  return (
    <>
      <main className="hotels">
        <h1 className="hotels__title">Гостиницы</h1>
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
