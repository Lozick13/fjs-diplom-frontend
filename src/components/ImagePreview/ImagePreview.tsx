import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import './imagepreview.scss';

interface DragItem {
  id: string;
  index: number;
}
interface ImagePreviewProps {
  preview: string;
  index: number;
  onRemove: (index: number) => void;
  onClick: (url: string) => void;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  preview,
  index,
  onRemove,
  onClick,
  moveImage,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // drag with react-dnd
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { id: preview, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop<DragItem>({
    accept: 'IMAGE',
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="image-preview">
      <img src={preview} alt={`Preview ${index + 1}`} onClick={() => onClick(preview)} />

      <div className="image-preview__action image-preview__action_delete">
        <IconButton icon="delete" click={() => onRemove(index)} />
      </div>

      <div className="image-preview__action image-preview__action_drag">
        <IconButton icon="drag_handle" />
      </div>
    </div>
  );
};

export default ImagePreview;
