import css from './ImageGallery.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webFormatURL={image.webformatURL}
          onClick={() => onClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
};

const ImageGalleryItem = ({ webFormatURL, onClick }) => {
  const handleItemClick = () => {
    onClick();
  };

  return (
    <li className={css.galleryItem}>
      <img className="img" src={webFormatURL} onClick={handleItemClick} />
    </li>
  );
};
