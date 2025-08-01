import Modal from '../../UI/Modal/Modal';

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

const ImageModal = ({ src, onClose }: ImageModalProps) => {
  return (
    <Modal isOpen={true} onClose={onClose} title="Просмотр изображения">
      <div className="image-modal-content">
        <img src={src} alt="Полноразмерное изображение" />
      </div>
    </Modal>
  );
};

export default ImageModal;
