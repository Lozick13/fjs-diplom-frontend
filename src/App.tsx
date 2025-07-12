import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import { useAppSelector } from './hooks';
import AuthPage from './pages/AuthPage/AuthPage';
import HotelRoomsPage from './pages/HotelRoomsPage/HotelRoomsPage';
import HotelsPage from './pages/HotelsPage/HotelsPage';
import SignUpPage from './pages/SugnUpPage/SignUpPage';

function App() {
  const location = useLocation();
  const { user } = useAppSelector(state => state.auth);
  const requireAuth = (children: React.ReactNode) => {
    return user !== null ? children : <Navigate to="/auth" replace />;
  };
  return (
    <>
      {!['/auth', '/signup'].includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/hotel-rooms" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/hotel-rooms" element={requireAuth(<HotelRoomsPage />)} />
        <Route path="/hotels" element={requireAuth(<HotelsPage />)} />
      </Routes>
    </>
  );
}

export default App;
