import type { Button } from '../Button';
import './navigatebutton.scss';

const NavigateButton = ({ click, text }: Button) => {
  return (
    <>
      <button onClick={click} type={'button'} className={'navigate-button'}>
        {text}
      </button>
    </>
  );
};

export default NavigateButton;
