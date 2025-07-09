import type { InputBase } from '../Input';
import './baseinput.scss';

const BaseInput = ({
  label,
  id,
  name,
  value,
  type,
  change,
  min,
  placeholder,
  required,
  disabled,
}: InputBase) => {
  return (
    <>
      <div className="base-input">
        <label htmlFor={id} className="base-input__label">
          {label}
        </label>
        <input
          id={id}
          name={name}
          value={value}
          type={type}
          min={min}
          placeholder={placeholder}
          required={required}
          onChange={change}
          disabled={disabled}
          className="base-input__place"
        />
      </div>
    </>
  );
};

export default BaseInput;
