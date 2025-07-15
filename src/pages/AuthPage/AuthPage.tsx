import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginRequest } from '../../redux/slices/authSlice';
import type { ButtonBase } from '../../UI/buttons/Button';
import type { InputBase } from '../../UI/Inputs/Input';
import './authpage.scss';

const AuthPage = () => {
  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector(state => state.auth);

  // states
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // authentication, reset states
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginRequest({ email, password }));
  };

  //redirect after successful auth
  useEffect(() => {
    if (user) {
      setEmail('');
      setPassword('');
      navigate('/hotel-rooms');
    }
  }, [user, navigate]);

  const inputs: InputBase[] = [
    {
      label: 'Почта',
      id: 'email',
      name: 'email',
      value: email,
      type: 'email',
      change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setEmail(e.target.value),
      placeholder: 'Ваш Email',
      required: true,
    },
    {
      label: 'Пароль',
      id: 'password',
      name: 'password',
      value: password,
      type: 'password',
      change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setPassword(e.target.value),
      min: 6,
      placeholder: 'Ваш пароль',
      required: true,
    },
  ];

  const buttons: ButtonBase[] = [
    // entry
    {
      click: () => {},
      type: 'submit',
      text: 'Вход',
    },
    // registration
    {
      click: () => {
        navigate('/signup');
      },
      type: 'button',
      text: 'Ещё нет аккаунта?',
      secondary: true,
    },
  ];

  return (
    <>
      <main className="auth">
        <div className="auth__header">
          <LogoLoader started={loading} />
          <h1 className="auth__title">{error ? error : 'Добро Пожаловать!'}</h1>
        </div>

        <FormTemplate handleSubmit={handleAuth} inputs={inputs} buttons={buttons} />
      </main>
    </>
  );
};

export default AuthPage;
