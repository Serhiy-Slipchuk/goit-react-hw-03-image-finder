import { Component } from 'react';
import css from './ImageGallery.module.css';
import { getImagesFromPixabayAPI } from 'functions/pixabayAPI';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';

class ImageGallery extends Component {
  state = {
    items: [],
    pageNumber: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuerry } = this.props;
    const { pageNumber } = this.state;
    // if (prevProps.searchQuerry !== searchQuerry && prevState.pageNumber > 1) {
    //   this.setState({ items: [], pageNumber: 1 });
    //   return;
    // }

    if (
      prevProps.searchQuerry !== searchQuerry ||
      prevState.pageNumber !== pageNumber
    ) {
      if (prevProps.searchQuerry !== searchQuerry) {
        this.setState({items: [], pageNumber: 1})
      }
      this.setState({ isLoading: true });

      setTimeout(() => {
        getImagesFromPixabayAPI(searchQuerry, pageNumber)
          .then(data => {
            if (data.data.hits.length !== 0) {
              this.setState(prevState => ({
                items: [...prevState.items, ...data.data.hits],
              }));
              setTimeout(() => {
                console.log(this.state.items);
              }, 500);
            }
          })
          .finally(this.setState({ isLoading: false }));
      }, 1000);
    }
  }

  handlerLoadMoreButton = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };

  render() {
    const { items, isLoading } = this.state;
    return (
      <>
        <ul className={css.gallery}>
          {items.map(({ id, webformatURL, largeImageURL }) => {
            return <ImageGalleryItem key={id} imageURL={webformatURL} />;
          })}
        </ul>
        {isLoading && <Loader />}
        {items.length > 0 && (
          <Button text="Load more" onClick={this.handlerLoadMoreButton} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuerry: PropTypes.string,
};

export default ImageGallery;
