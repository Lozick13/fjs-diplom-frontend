import { useState, type FormEvent } from 'react';
import Modal from '../../UI/Modal/Modal';
import FormTemplate from '../../components/FormTemplate/FormTemplate';

interface EditHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
  initialTitle: string;
  initialDescription: string;
}

const EditHotelModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialTitle,
  initialDescription,
}: EditHotelModalProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактировать отель">
      <FormTemplate
        handleSubmit={handleSubmit}
        inputs={[
          {
            type: 'text',
            value: title,
            change: e => setTitle(e.target.value),
            placeholder: 'Название отеля',
            id: 'hotel-title',
            name: 'hotel-title',
            required: true,
            label: 'Название',
          },
          {
            type: 'text',
            value: description,
            change: e => setDescription(e.target.value),
            placeholder: 'Описание отеля...',
            id: 'hotel-desc',
            name: 'hotel-desc',
            required: true,
            label: 'Описание',
            multiline: true,
            rows: 5,
          },
        ]}
        buttons={[
          {
            text: 'Сохранить',
            type: 'submit',
          },
        ]}
      />
    </Modal>
  );
};

export default EditHotelModal;
