import type React from 'react';
import { useState } from 'react';
import './slider.scss';

interface props {
  images: string[];
  alt: string;
}

const Slider: React.FC<props> = ({ images, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    setCurrentImageIndex((prev: number) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev: number) => (prev - 1 + images.length) % images.length);
  };
  return (
    <>
      {images.length > 0 && (
        <div className="slider">
          <img
            className="slider__img"
            src={import.meta.env.VITE_API_URL.slice(0, -3) + images[currentImageIndex]}
            alt={alt + '_' + [currentImageIndex]}
            key={currentImageIndex}
          />
          {images.length > 1 && (
            <>
              <button
                className="slider__arrow slider__arrow_left"
                onClick={e => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                &lt;
              </button>
              <button
                className="slider__arrow slider__arrow_right"
                onClick={e => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                &gt;
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Slider;
