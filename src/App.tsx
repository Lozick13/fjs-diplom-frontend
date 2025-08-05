import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import { useAppSelector } from './hooks';
import AddHotelPage from './pages/AddHotelPage/AddHotelsPage';
import AddUserPage from './pages/AddUserPage/AddUserPage';
import AuthPage from './pages/AuthPage/AuthPage';
import HotelPage from './pages/HotelPage/HotelPage';
import HotelRoomPage from './pages/HotelRoomPage/HotelRoomPage';
import HotelRoomsPage from './pages/HotelRoomsPage/HotelRoomsPage';
import HotelsPage from './pages/HotelsPage/HotelsPage';
import ReservationsPage from './pages/ReservationsPage/ReservationsPage';
import SignUpPage from './pages/SugnUpPage/SignUpPage';
import UsersPage from './pages/UsersPage/UsersPage';

function App() {
  const location = useLocation();
  const { user } = useAppSelector(state => state.auth);

  const requireAuth = (children: React.ReactNode) => {
    return user !== null ? children : <Navigate to="/hotel-rooms" replace />;
  };
  return (
    <>
      {!['/auth', '/signup'].includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/hotel-rooms" element={<HotelRoomsPage />} />{' '}
        <Route path="/hotel-rooms/:id" element={<HotelRoomPage />} />
        <Route path="/reservations" element={requireAuth(<ReservationsPage />)} />
        <Route path="/reservations/:id" element={requireAuth(<ReservationsPage />)} />
        <Route path="/hotels/:id" element={requireAuth(<HotelPage />)} />
        <Route path="/hotels/create" element={requireAuth(<AddHotelPage />)} />
        <Route path="/hotels" element={requireAuth(<HotelsPage />)} />
        <Route path="/users" element={requireAuth(<UsersPage />)} />
        <Route path="/users/create" element={requireAuth(<AddUserPage />)} />
      </Routes>
    </>
  );
}

export default App;
