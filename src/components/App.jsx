import { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';


export class App extends Component {
  state = {
    searchQuerry: '',
  };

  updateSearchQuerry = newSearchQuerry => {
    if (this.state.searchQuerry !== newSearchQuerry) {
      this.setState({ searchQuerry: newSearchQuerry });
    }
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.updateSearchQuerry} />
        <ImageGallery searchQuerry={this.state.searchQuerry} />
      </div>
    );
  }
}
