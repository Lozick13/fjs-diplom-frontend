import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import Title from '../../components/Title/Title';
import { useAppDispatch } from '../../hooks';
import { addUserRequest } from '../../redux/slices/usersSlice';
import type { InputBase } from '../../UI/Inputs/Input';
import './adduserpage.scss';

const AddUserPage = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // states
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [role, setRole] = useState<string>('client');

  //inputs
  const inputs: InputBase[] = [
    {
      label: 'Email',
      id: 'email',
      name: 'email',
      value: email,
      type: 'email',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setEmail(e.target.value),
      placeholder: 'Почта пользователя',
      required: true,
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
      placeholder: 'Пароль пользователя',
      required: true,
    },
    {
      label: 'Имя',
      id: 'name',
      name: 'name',
      value: name,
      type: 'text',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setName(e.target.value),
      placeholder: 'Имя пользователя',
      required: true,
    },
    {
      label: 'Роль',
      id: 'role',
      name: 'role',
      value: role,
      type: 'select',
      options: [
        { value: 'client', label: 'Клиент' },
        { value: 'manager', label: 'Менеджер' },
        { value: 'admin', label: 'Администратор' },
      ],
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setRole(e.target.value),
      required: true,
    },
    {
      label: 'Телефон',
      id: 'phone',
      name: 'phone',
      value: contactPhone,
      type: 'tel',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setContactPhone(e.target.value),
      placeholder: 'Телефон пользователя',
      required: false,
    },
  ];

  //adding a hotel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addUserRequest({ email, password, name, contactPhone, role }));
    navigate('/users');
  };
  return (
    <>
      <main className="add-hotel">
        <Title text="Добавление пользователя" backButton />

        <div className="add-hotel__form">
          <FormTemplate
            handleSubmit={handleSubmit}
            inputs={inputs}
            buttons={[
              {
                click: () => {},
                type: 'submit',
                text: 'Добавить',
              },
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default AddUserPage;
