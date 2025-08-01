import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import ImagePreviews from '../../components/ImagePreviews/ImagePreviews';
import { type InputBase } from '../../UI/Inputs/Input';
import Modal from '../../UI/Modal/Modal';
import ImageModal from '../ImageModal/ImageModal';

// image validation consts
const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MIN_WIDTH = 1000;
const MAX_DIMENSION = 5000;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

interface AddRoomModalProps {
  hotelId: string;
  initialDescription: string;
  images: Array<string | File>;
  initialIsEnabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    hotel: string;
    description: string;
    images: Array<File | string>;
    isEnabled: boolean;
  }) => void;
}

const AddRoomModal = ({
  hotelId,
  initialDescription,
  images,
  initialIsEnabled,
  isOpen,
  onClose,
  onSubmit,
}: AddRoomModalProps) => {
  // states
  const [description, setDescription] = useState(initialDescription);
  const [isEnabled, setIsEnabled] = useState(initialIsEnabled);
  const [files, setFiles] = useState<Array<File | string>>(images);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // initializing the modal
  useEffect(() => {
    if (isOpen) {
      const initialPreviews = images.map(image =>
        typeof image === 'string'
          ? `${import.meta.env.VITE_API_URL.slice(0, -3)}${image}`
          : URL.createObjectURL(image),
      );
      setPreviews(initialPreviews);
      setFiles(images);
      setErrors({});
    }
  }, [images, isOpen]);

  //form validation
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (description.length < 100)
      newErrors.description = 'Описание должно содержать минимум 100 символов';
    if (previews.length === 0) newErrors.images = 'Необходимо добавить хотя бы одно фото';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //getting image dimensions
  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (
      !(e.target instanceof HTMLInputElement) ||
      !e.target.files ||
      e.target.files.length === 0
    ) {
      return;
    }

    if (previews.length + e.target.files.length > MAX_IMAGES) {
      setErrors(prev => ({
        ...prev,
        images: `Можно загрузить максимум ${MAX_IMAGES} изображений`,
      }));
      return;
    }

    const selectedFilesArr = Array.from(e.target.files);
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    for (const file of selectedFilesArr) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          images: `Недопустимый формат файла: ${file.name}`,
        }));
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setErrors(prev => ({
          ...prev,
          images: `Файл ${file.name} превышает максимальный размер`,
        }));
        continue;
      }

      try {
        const { width, height } = await getImageDimensions(file);

        if (width < MIN_WIDTH) {
          setErrors(prev => ({
            ...prev,
            images: `Изображение ${file.name} слишком маленькое. Минимальная ширина ${MIN_WIDTH}px`,
          }));
          continue;
        }

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          setErrors(prev => ({
            ...prev,
            images: `Изображение ${file.name} слишком большое. Максимальный размер ${MAX_DIMENSION}px`,
          }));
          continue;
        }
      } catch {
        setErrors(prev => ({
          ...prev,
          images: `Ошибка при обработке файла ${file.name}`,
        }));
        continue;
      }

      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setPreviews(prev => [...prev, ...newPreviews]);
      setErrors(prev => ({ ...prev, images: '' }));
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  //delete image
  const handleRemoveImage = (indexToRemove: number) => {
    setPreviews(prev => {
      const newPreviews = [...prev];
      newPreviews.splice(indexToRemove, 1);
      return newPreviews;
    });

    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(indexToRemove, 1);
      return newFiles;
    });
  };

  //submitting form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      hotel: hotelId,
      description,
      images: files,
      isEnabled,
    });
  };

  // drag and drop
  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setPreviews(prev => {
      const newPreviews = [...prev];
      const [removed] = newPreviews.splice(dragIndex, 1);
      newPreviews.splice(hoverIndex, 0, removed);
      return newPreviews;
    });

    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      const [removed] = newFiles.splice(dragIndex, 1);
      newFiles.splice(hoverIndex, 0, removed);
      return newFiles;
    });
  }, []);

  // URL cleaning
  useEffect(() => {
    return () => {
      previews.forEach(url => {
        if (url.startsWith('blob')) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  // inputs
  const inputs: InputBase[] = [
    {
      type: 'file',
      change: handleFileChange,
      id: 'room-images',
      name: 'room-images',
      accept: 'image/*',
      multiple: true,
      label: 'Загрузка изображений',
      fileInput: true,
      value: '',
      ref: fileInputRef,
      disabled: previews.length >= MAX_IMAGES,
    },
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
      type: 'checkbox',
      value: isEnabled,
      change: e => setIsEnabled((e.target as HTMLInputElement).checked),
      id: 'enabled',
      name: 'enabled',
      label: 'Доступен для бронирования',
      lineDisplay: true,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактировать номер">
      {previews.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <ImagePreviews
            previews={previews}
            onRemove={handleRemoveImage}
            onClick={setSelectedImage}
            moveImage={moveImage}
          />
        </DndProvider>
      )}

      {errors.images && <p>{errors.images}</p>}

      <FormTemplate
        handleSubmit={handleSubmit}
        inputs={inputs}
        buttons={[{ text: 'Сохранить', type: 'submit' }]}
      />

      {errors.description && <p>{errors.description}</p>}

      {selectedImage && (
        <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </Modal>
  );
};

export default AddRoomModal;
