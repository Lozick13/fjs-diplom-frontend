import type { ButtonBase } from '../Button';
import './basebutton.scss';

const BaseButton = ({ click, text, secondary, type }: ButtonBase) => {
  return (
    <>
      <button
        onClick={click}
        type={type}
        className={`base-button${secondary ? ' base-button_secondary' : ''}`}
      >
        {text}
      </button>
    </>
  );
};

export default BaseButton;
