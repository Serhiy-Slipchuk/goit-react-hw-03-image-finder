import css from './App.module.css'
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  return (
    <div className={css.app}>
      <Searchbar />

    </div>
  );
};
