import { useRef } from 'react';
import type { InputBase, InputOption } from '../Input';
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
  fileInput,
  disabled,
  options,
  multiple,
  multiline = false,
  rows = 3,
  lineDisplay = false,
}: InputBase & { multiline?: boolean; rows?: number }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={`base-input${lineDisplay ? ' base-input_line-display' : ''}`}>
      {label && !fileInput && (
        <label htmlFor={id} className="base-input__label">
          {label}
        </label>
      )}
      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value as string | number}
          onChange={change}
          disabled={disabled}
          required={required}
          multiple={multiple}
          className="base-input__place base-input__select"
        >
          {options?.map((option: InputOption) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
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
      ) : fileInput === true ? (
        <div className="file-input">
          <input
            type="file"
            id={id}
            name={name}
            ref={inputRef}
            onChange={change}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className="file-input__hidden"
          />

          <button
            type="button"
            onClick={handleClick}
            className='file-input__button'
          >
            <span className="material-symbols-outlined">upload</span>
            {label}
          </button>
        </div>
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
