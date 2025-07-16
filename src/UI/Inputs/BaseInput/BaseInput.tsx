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
  accept,
  disabled,
  multiple,
  multiline = false,
  rows = 3,
  lineDisplay = false,
}: InputBase & { multiline?: boolean; rows?: number }) => {
  return (
    <div className={`base-input${lineDisplay ? ' base-input_line-display' : ''}`}>
      {label && (
        <label htmlFor={id} className="base-input__label">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value as string | number}
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
          checked={type === 'checkbox' ? Boolean(value) : undefined}
          value={type !== 'checkbox' && typeof value !== 'boolean' ? value : undefined}
          type={type}
          min={min}
          accept={accept}
          multiple={multiple}
          placeholder={placeholder}
          required={required}
          onChange={change}
          disabled={disabled}
          className={`base-input__place ${
            type === 'checkbox' ? 'base-input__place_checkbox' : ''
          }`}
        />
      )}
    </div>
  );
};

export default BaseInput;
