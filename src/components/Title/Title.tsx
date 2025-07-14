import { useNavigate } from 'react-router-dom';
import NavigateButton from '../../UI/buttons/NavigateButton/NavigateButton';
import './title.scss';

const Title: React.FC<{ text: string; backButton?: boolean }> = ({
  text,
  backButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="title">
        {backButton && (
          <div className="title__back">
            <NavigateButton click={() => navigate(-1)} text={'← Назад'} />
          </div>
        )}
        {text}
      </h1>
    </>
  );
};

export default Title;
