import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = function ({imageURL}) {
  return (
    <li className={css['gallery-item']}>
      <img className={css['gallery-item-image']} src={imageURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;