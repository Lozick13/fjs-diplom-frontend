import React from 'react';

export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'checkbox'
  | 'tel'
  | 'radio';

export interface Input {
  id: string;
  name: string;
  value: string | number | boolean;
  type: InputType;
  change: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  min?: number;
  placeholder?: string;
  required: boolean;
  disabled?: boolean;
}

export interface InputBase extends Input {
  label?: string;
  multiline?: boolean;
  rows?: number;
  lineDisplay?: boolean;
}

export interface InputChat extends Input {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  textarea?: boolean;
}
