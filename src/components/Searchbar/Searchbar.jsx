import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchform}>
          <button type="submit" className={css[`searchform-button`]}>
            <span className={css[`searchform-button-label`]}>Search</span>
          </button>

          <input
            className={css[`searchform-button`]}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
