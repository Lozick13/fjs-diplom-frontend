import React, { type ChangeEvent } from 'react';

export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'checkbox'
  | 'tel'
  | 'file'
  | 'radio';

export interface InputBase {
  id: string;
  name: string;
  value: string | number | boolean;
  type: InputType;
  change?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  min?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  multiline?: boolean;
  rows?: number;
  accept?: string;
  multiple?: boolean;
  lineDisplay?: boolean;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}

export interface InputChat extends InputBase {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  textarea?: boolean;
}
