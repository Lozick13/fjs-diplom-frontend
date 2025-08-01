import React from 'react';
import ImagePreview from '../ImagePreview/ImagePreview';
import './imagepreviews.scss';

interface ImagePreviewsProps {
  previews: string[];
  onRemove: (index: number) => void;
  onClick: (url: string) => void;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
}

const ImagePreviews: React.FC<ImagePreviewsProps> = ({
  previews,
  onRemove,
  onClick,
  moveImage,
}) => {
  return (
    <div className="image-previews">
      <div className="image-previews__container">
        {previews.map((preview, index) => (
          <ImagePreview
            key={preview}
            preview={preview}
            index={index}
            onRemove={onRemove}
            onClick={onClick}
            moveImage={moveImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagePreviews;
