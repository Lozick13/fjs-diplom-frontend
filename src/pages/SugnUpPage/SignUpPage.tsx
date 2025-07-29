import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormTemplate from '../../components/FormTemplate/FormTemplate';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { registerRequest } from '../../redux/slices/authSlice';
import type { ButtonBase } from '../../UI/buttons/Button';
import type { InputBase } from '../../UI/Inputs/Input';
import './signuppage.scss';

const SignUpPage = () => {
  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector(state => state.auth);

  // states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // registration, reset states
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      registerRequest({
        name,
        email,
        contactPhone: phone.split(' ').join(''),
        password,
      }),
    );
  };

  //redirect after successful registration
  useEffect(() => {
    if (user) {
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      navigate('/hotel-rooms');
    }
  }, [user, navigate]);

  const inputs: InputBase[] = [
    {
      label: 'Имя',
      id: 'name',
      name: 'name',
      value: name,
      type: 'text',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setName(e.target.value),
      placeholder: 'Ваше Имя',
      required: true,
    },
    {
      label: 'Почта',
      id: 'email',
      name: 'email',
      value: email,
      type: 'email',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setEmail(e.target.value),
      placeholder: 'Ваш Email',
      required: true,
    },
    {
      label: 'Телефон',
      id: 'phone',
      name: 'phone',
      value: phone,
      type: 'tel',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setPhone(e.target.value),
      placeholder: 'Ваш телефон',
      required: false,
    },
    {
      label: 'Пароль',
      id: 'password',
      name: 'password',
      value: password,
      type: 'password',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setPassword(e.target.value),
      min: 6,
      placeholder: 'Ваш пароль',
      required: true,
    },
  ];

  const buttons: ButtonBase[] = [
    // registration
    {
      click: () => {},
      type: 'submit',
      text: 'Регистрация',
    },
    // entry
    {
      click: () => {
        navigate('/auth');
      },
      type: 'button',
      text: 'Уже есть аккаунт?',
      secondary: true,
    },
  ];

  return (
    <>
      <main className="signup">
        <div className="signup__header">
          <LogoLoader started={loading} />
          <h1 className="signup__title">{error ? error : 'Мы Вам рады!'}</h1>
        </div>

        <FormTemplate handleSubmit={handleSignUp} inputs={inputs} buttons={buttons} />
      </main>
    </>
  );
};

export default SignUpPage;
