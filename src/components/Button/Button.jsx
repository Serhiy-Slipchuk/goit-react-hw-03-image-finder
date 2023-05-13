import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = function ({ text, onClick }) {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
