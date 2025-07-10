import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks';
import AuthPage from './pages/AuthPage/AuthPage';
import HotelPage from './pages/HotelsPage/HotelsPage';
import SignUpPage from './pages/SugnUpPage/SignUpPage';
import Header from './components/Header/Header';

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
        <Route path="/" element={<Navigate to="/hotels" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/hotels" element={requireAuth(<HotelPage />)} />
        <Route path="/hotels/:id" element={requireAuth(<HotelPage />)} />
      </Routes>
    </>
  );
}

export default App;
