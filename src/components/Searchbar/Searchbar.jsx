import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  inputOnChangeHandler = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { onSubmit } = this.props;
    const { inputValue } = this.state;
    return (
      <header className={css.searchbar}>
        <form
          className={css.searchform}
          onSubmit={e => {
            e.preventDefault();
            this.setState({ inputValue: '' });
            onSubmit(inputValue);
          }}
        >
          <button type="submit" className={css[`searchform-button`]}>
            <span className={css[`searchform-button-label`]}>Search</span>
          </button>

          <input
            className={css[`searchform-input`]}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.inputOnChangeHandler}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
