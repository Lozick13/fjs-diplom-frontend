import type { InputBase } from '../Input';
import './baseinput.scss';

const BaseInput = ({
  label,
  id,
  name,
  value,
  type = 'text',
  change,
  min,
  placeholder,
  required,
  disabled,
  multiline = false,
  rows = 3,
}: InputBase & { multiline?: boolean; rows?: number }) => {
  return (
    <div className="base-input">
      {label && (
        <label htmlFor={id} className="base-input__label">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={change}
          disabled={disabled}
          className="base-input__place base-input__textarea"
          rows={rows}
        />
      ) : (
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
      )}
    </div>
  );
};

export default BaseInput;
