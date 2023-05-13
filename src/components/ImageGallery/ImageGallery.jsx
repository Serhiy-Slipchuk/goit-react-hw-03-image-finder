import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';

const ImageGallery = function ({
  items,
  onClickLoadMore,
  isLoading,
  isLoadMoreShown,
}) {
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
      {isLoading && <Loader />}
      {isLoadMoreShown && <Button text="Load more" onClick={onClickLoadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onClickLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadMoreShown: PropTypes.bool.isRequired,
};

export default ImageGallery;
