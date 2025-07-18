import type { ButtonImg } from '../Button';
import './imgbutton.scss';

const ImgButton = ({ click, text, img, color }: ButtonImg) => {
  return (
    <>
      <button onClick={click} className="img-button">
        <div className="img-button__bg" style={{ backgroundColor: `${color}60` }}>
          <img src={img} alt={text} className="img-button__img" />
        </div>
        <span style={{ color: color }} className="img-button__text">
          {text}
        </span>
      </button>
    </>
  );
};

export default ImgButton;
