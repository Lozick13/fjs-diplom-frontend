import { useNavigate } from 'react-router-dom';
import NavigateButton from '../../UI/buttons/NavigateButton/NavigateButton';
import './title.scss';

const Title: React.FC<{
  text: string;
  backButton?: boolean;
  additionallyButton?: { click: () => void; text: string };
}> = ({ text, backButton = false, additionallyButton }) => {
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
        {additionallyButton && (
          <div className="title__additionally">
            <NavigateButton
              click={additionallyButton.click}
              text={additionallyButton.text}
            />
          </div>
        )}
      </h1>
    </>
  );
};

export default Title;
