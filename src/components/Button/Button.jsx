import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ handleLoadMore }) => {
  const handleLoadMoreBtn = () => {
    handleLoadMore();
  };

  return (
    <div className={css.btnContainer}>
      <button className={css.button} onClick={handleLoadMoreBtn}>
        Load More
      </button>
    </div>
  );
};
