import BaseButton from '../../UI/buttons/BaseButton/BaseButton';
import type { ButtonBase } from '../../UI/buttons/Button';
import BaseInput from '../../UI/Inputs/BaseInput/BaseInput';
import type { InputBase } from '../../UI/Inputs/Input';
import './formtemplate.scss';

interface Form {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputs: InputBase[];
  buttons: ButtonBase[];
  lineDisplay?: boolean;
}

const FormTemplate: React.FC<Form> = ({
  handleSubmit,
  inputs,
  buttons,
  lineDisplay = false,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`form-template${lineDisplay ? ' form-template_line-display' : ''}`}
    >
      <div
        className={`form-template__inputs${
          lineDisplay ? ' form-template__inputs_line-display' : ''
        }`}
      >
        {inputs.map(input => (
          <BaseInput
            key={input.id}
            label={input.label}
            id={input.id}
            name={input.name}
            value={input.value}
            type={input.type}
            options={input.options}
            change={input.change}
            min={input.min}
            placeholder={input.placeholder}
            required={input.required}
            disabled={input.disabled}
            multiline={input.multiline}
            rows={input.rows}
            lineDisplay={input.lineDisplay}
          />
        ))}
      </div>
      {buttons.length > 0 && (
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
      )}
    </form>
  );
};

export default FormTemplate;
