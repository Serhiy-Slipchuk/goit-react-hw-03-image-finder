import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = function ({ items }) {
  return (
    <>
      <ul className={css.gallery}>
        {items.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              imageURL={webformatURL}
              largeImageURL={largeImageURL}
              id={id}
            />
          );
        })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ImageGallery;
