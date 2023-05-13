import { Component } from 'react';
import css from './App.module.css';
import { getImagesFromPixabayAPI } from 'functions/pixabayAPI';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuerry: '',
    items: [],
    total: 0,
    pageNumber: 1,
    isLoading: false,
    isLoadMoreShown: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchQuerry, pageNumber } = this.state;

    if (
      prevState.searchQuerry !== searchQuerry ||
      prevState.pageNumber !== pageNumber
    ) {
      this.setState({ isLoading: true, isLoadMoreShown: false });

      getImagesFromPixabayAPI(searchQuerry, pageNumber)
        .then(data => {
          const { hits, total } = data.data;
          if (hits.length !== 0) {
            this.setState(prevState => ({
              items: [...prevState.items, ...hits],
              total: total,
            }));
          } else {
            return Promise.reject(
              `There is no any result on ${searchQuerry} Please, enter valid search querry`
            );
          }
          if (hits.length >= 12) {
            this.setState({ isLoadMoreShown: true });
          }
        })
        .catch(error => window.alert(error))
        .finally(this.setState({ isLoading: false }));
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
        <ImageGallery
          items={items}
          onClickLoadMore={this.handlerLoadMoreButton}
          isLoading={isLoading}
          isLoadMoreShown={isLoadMoreShown}
        />
      </div>
    );
  }
}
