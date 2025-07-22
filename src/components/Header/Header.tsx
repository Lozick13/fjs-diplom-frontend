import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { logoutRequest } from '../../redux/slices/authSlice';
import ImgButton from '../../UI/buttons/ImgButton/ImgButton';
import './header.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src="/assets/honey-icon.png" alt="logo" />
          <h1 className="header__title">HoneyHotels</h1>
        </div>
        <nav className="header__nav">
          <ImgButton
            click={() => navigate('/users')}
            color="#D68D17"
            img="/assets/users.svg"
          />{' '}
          <ImgButton
            click={() => navigate('/support')}
            color="#D68D17"
            img="/assets/chats.svg"
          />
          <ImgButton
            click={() => navigate('/reservations')}
            color="#D68D17"
            img="/assets/reservation.svg"
          />
          <ImgButton
            click={() => navigate('/hotels')}
            color="#D68D17"
            img="/assets/hotel.svg"
          />
          <ImgButton
            click={() => navigate('/hotel-rooms')}
            color="#D68D17"
            img="/assets/room.svg"
          />
          <ImgButton
            click={async () => dispatch(logoutRequest())}
            color="#D68D17"
            img="/assets/log-out.svg"
          />
        </nav>
      </header>
    </>
  );
};

export default Header;
