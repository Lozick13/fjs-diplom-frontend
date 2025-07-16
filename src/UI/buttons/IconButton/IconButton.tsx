import type { ButtonIcon } from '../Button';
import './iconbutton.scss';

const IconButton = ({ icon, click }: ButtonIcon) => {
  return (
    <>
      <button onClick={click} className="icon-button">
        <span className="material-symbols-outlined">{icon}</span>
      </button>
    </>
  );
};

export default IconButton;
