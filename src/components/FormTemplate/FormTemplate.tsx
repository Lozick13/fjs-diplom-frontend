import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import type { ButtonBase } from '../../UI/buttons/Button';
import BaseInput from '../../UI/Inputs/BaseInput/BaseInput';
import type { InputBase } from '../../UI/Inputs/Input';
import './formtemplate.scss';

interface Form {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputs: InputBase[];
  buttons: ButtonBase[];
}

const FormTemplate: React.FC<Form> = ({ handleSubmit, inputs, buttons }) => {
  return (
    <form onSubmit={handleSubmit} className="form-template">
      <div className="form-template__inputs">
        {inputs.map(input => (
          <BaseInput
            key={input.id}
            label={input.label}
            id={input.id}
            name={input.name}
            value={input.value}
            type={input.type}
            change={input.change}
            min={input.min}
            placeholder={input.placeholder}
            required={input.required}
            disabled={input.disabled}
          />
        ))}
      </div>
      <div className="form-template__buttons">
        {buttons.map((button, index) => (
          <BaseButton
            key={index}
            click={button.click}
            text={button.text}
            type={button.type}
            secondary={button.secondary}
          />
        ))}
      </div>
    </form>
  );
};

export default FormTemplate;
