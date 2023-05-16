import { Component } from 'react';
import css from './App.module.css';
import { getImagesFromPixabayAPI } from 'functions/pixabayAPI';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

export class App extends Component {
  state = {
    searchQuerry: '',
    items: [],
    total: 0,
    pageNumber: 1,
    isLoading: false,
    isLoadMoreShown: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { searchQuerry, pageNumber } = this.state;

    if (
      prevState.searchQuerry !== searchQuerry ||
      prevState.pageNumber !== pageNumber
    ) {
      try {
        this.setState({ isLoading: true, isLoadMoreShown: false });

        const response = await getImagesFromPixabayAPI(
          searchQuerry,
          pageNumber
        );
        const { hits, total } = response.data;
        if (hits.length !== 0) {
          this.setState(prevState => ({
            items: [...prevState.items, ...hits],
            total: total,
          }));
        } else {
          window.alert(
            `There is no any result on ${searchQuerry} Please, enter valid search querry`
          );
          return;
        }
        if (hits.length >= 12) {
          this.setState({ isLoadMoreShown: true });
        }
      } catch {
        window.alert(
          `There is no connetion to server. Check your internet connection or try later`
        );
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  updateSearchQuerry = newSearchQuerry => {
    if (this.state.searchQuerry !== newSearchQuerry) {
      this.setState({
        searchQuerry: newSearchQuerry,
        pageNumber: 1,
        items: [],
        total: 0,
      });
    }
  };

  handlerLoadMoreButton = () => {
    const { pageNumber, total } = this.state;
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
    if (pageNumber >= total / 12 - 1) {
      this.setState({ isLoadMoreShown: false });
    }
  };

  render() {
    const { items, isLoading, isLoadMoreShown } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.updateSearchQuerry} />
        {items.length > 0 && <ImageGallery items={items} />}
        {isLoading && <Loader />}
        {isLoadMoreShown && (
          <Button text="Load more" onClick={this.handlerLoadMoreButton} />
        )}
      </div>
    );
  }
}
