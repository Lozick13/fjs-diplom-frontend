import IconButton from '../../UI/buttons/IconButton/IconButton';
import './imagepreviews.scss';

interface ImagePreviewsProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  previews: string[];
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImagePreviews = ({
  images,
  setImages,
  previews,
  setPreviews,
}: ImagePreviewsProps) => {
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };
  return (
    <section className="image-previews">
      <h4>Загруженные изображения:</h4>

      <div className="image-previews__container">
        {previews.map((preview, index) => (
          <article key={index} className="image-previews__preview">
            <img src={preview} alt={`Preview ${index}`} />
            <div className="image-previews__remove">
              <IconButton icon="delete" type="button" click={() => removeImage(index)} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ImagePreviews;
