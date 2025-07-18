import { useRef, useState, type FormEvent } from 'react';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import ImagePreviews from '../../components/ImagePreviews/ImagePreviews';
import type { InputBase } from '../../UI/Inputs/Input';
import Modal from '../../UI/Modal/Modal';

interface AddRoomModalProps {
  hotelId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    hotel: string;
    description: string;
    images: File[];
    isEnabled: boolean;
  }) => void;
}

const AddRoomModal = ({ hotelId, isOpen, onClose, onSubmit }: AddRoomModalProps) => {
  // states
  const [description, setDescription] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //inputs
  const inputs: InputBase[] = [
    {
      type: 'text',
      value: description,
      change: e => setDescription(e.target.value),
      placeholder: 'Описание номера...',
      id: 'desc-room',
      name: 'desc-room',
      required: true,
      label: 'Описание',
      multiline: true,
      rows: 5,
    },
    {
      type: 'file',
      change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target instanceof HTMLInputElement) {
          if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files);
            setImages(prev => [...prev, ...newImages]);
            const newPreviews = newImages.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
          }
        }
      },
      id: 'room-images',
      name: 'room-images',
      accept: 'image/*',
      multiple: true,
      value: '',
      ref: fileInputRef,
    },
    {
      type: 'checkbox',
      value: isEnabled,
      change: e => {
        setIsEnabled((e.target as HTMLInputElement).checked);
      },
      id: 'enabled',
      name: 'enabled',
      required: true,
      label: 'Доступен для бронирования',
      lineDisplay: true,
    },
  ];

  //adding a room
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      hotel: hotelId,
      description,
      images,
      isEnabled,
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить номер">
      <FormTemplate
        handleSubmit={handleSubmit}
        inputs={inputs}
        buttons={[
          {
            text: 'Добавить',
          },
        ]}
      />

      {previews.length > 0 && (
        <ImagePreviews
          images={images}
          setImages={setImages}
          previews={previews}
          setPreviews={setPreviews}
        />
      )}
    </Modal>
  );
};

export default AddRoomModal;
