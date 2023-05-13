import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { imageURL, largeImageURL, id } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <li className={css['gallery-item']}>
          <img
            className={css['gallery-item-image']}
            src={imageURL}
            alt={id}
            onClick={this.openModal}
          />
        </li>
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            id={id}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
