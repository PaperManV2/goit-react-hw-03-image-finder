import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = () => {
  return (
    <div className={css.btnContainer}>
      <button className={css.button}>Load More</button>
    </div>
  );
};
