import { useRef, useState, type FormEvent } from 'react';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import Modal from '../../UI/Modal/Modal';
import './addroommodal.scss';

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
  const [description, setDescription] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

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
        inputs={[
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
            label: 'Изображения номера',
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
        ]}
        buttons={[
          {
            text: 'Добавить',
          },
        ]}
      />

      {previews.length > 0 && (
        <div className="image-previews">
          <h4>Загруженные изображения:</h4>
          <div className="preview-container">
            {previews.map((preview, index) => (
              <div key={index} className="image-preview">
                <img src={preview} alt={`Preview ${index}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="remove-image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddRoomModal;
