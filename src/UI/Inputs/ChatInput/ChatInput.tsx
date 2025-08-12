import { useEffect, useRef } from 'react';

import type { InputChat } from '../Input';
import './chatinput.scss';

const ChatInput = ({
  leftElement,
  rightElement,
  id,
  name,
  value,
  type,
  change,
  min,
  placeholder,
  required,
  onEnterPress,
  disabled,
  maxLength,
  textarea = false,
}: InputChat) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoHeight = (elem: HTMLTextAreaElement) => {
    elem.style.height = '1px';
    elem.style.height = `${elem.scrollHeight}px`;
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (onEnterPress) {
        onEnterPress();
      }
    }
  };
  useEffect(() => {
    if (textarea && textAreaRef.current) {
      autoHeight(textAreaRef.current);
    }
  }, [value, textarea]);

  return (
    <>
      <div className="chat-input">
        {leftElement}

        {typeof value !== 'boolean' &&
          (textarea ? (
            <textarea
              ref={textAreaRef}
              id={id}
              name={name}
              value={value}
              maxLength={maxLength}
              placeholder={placeholder}
              required={required}
              onChange={change}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="chat-input__place chat-input__place_textarea"
            />
          ) : (
            <input
              id={id}
              name={name}
              value={value}
              type={type}
              min={min}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              required={required}
              onChange={change}
              disabled={disabled}
              className="chat-input__place"
            />
          ))}

        {rightElement}
      </div>
    </>
  );
};

export default ChatInput;
