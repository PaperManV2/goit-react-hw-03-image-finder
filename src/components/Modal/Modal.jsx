import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, hideModal }) => {
  const handleModalClick = () => {
    hideModal();
  };

  return (
    <div className={css.overlay} onClick={handleModalClick}>
      <div className={css.modal} style={{ pointerEvents: 'none' }}>
        <img src={largeImageURL} />
      </div>
    </div>
  );
};
