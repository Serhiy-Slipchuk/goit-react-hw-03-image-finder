import css from './Modal.module.css';

const Modal = function ({ url, description }) {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={url} alt={description} />
      </div>
    </div>
  );
};

export default Modal;
