import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import Title from '../../components/Title/Title';
import { useAppDispatch } from '../../hooks';
import { addHotelRequest } from '../../redux/slices/hotelsSlice';
import type { InputBase } from '../../UI/Inputs/Input';
import './addhotelspage.scss';

const AddHotelPage = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // states
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  //inputs
  const inputs: InputBase[] = [
    {
      label: 'Название',
      id: 'title',
      name: 'title',
      value: title,
      type: 'text',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setTitle(e.target.value),
      placeholder: 'Ваше название гостиницы',
      required: true,
    },
    {
      label: 'Описание',
      id: 'description',
      name: 'description',
      value: description,
      type: 'text',
      change: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setDescription(e.target.value),
      placeholder: 'Ваше описание гостиницы',
      required: true,
      multiline: true,
      rows: 4,
    },
  ];

  //adding a hotel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addHotelRequest({ title, description }));
    navigate('/hotels');
  };
  return (
    <>
      <main className="add-hotel">
        <Title text="Добавление гостиницы" backButton />

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

export default AddHotelPage;
