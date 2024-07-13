import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';

export const Form = ({ onSubmit }) => {
  const [query, setQueary] = useState('');
  const handleChange = e => {
    setQueary(e.target.value);
  };

  const handelSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return alert('Sorry, can`t be empty');
    }
    onSubmit(query);
    setQueary('');
  };
  return (
    <form onSubmit={handelSubmit} className={style.form}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        value={query}
        onChange={handleChange}
        required
        autoFocus
      />
    </form>
  );
};
