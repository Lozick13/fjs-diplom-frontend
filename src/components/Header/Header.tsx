import { useNavigate } from 'react-router-dom';
import ImgButton from '../../UI/buttons/ImgButton/ImgButton';
import './header.scss';

const Header = () => {
  const navigate = useNavigate();

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
        </nav>
      </header>
    </>
  );
};

export default Header;
