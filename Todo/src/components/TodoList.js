import React from 'react';
import { useState } from 'react';

const TodoList = ({ list, updateList }) => {
  const [q, setQ] = useState('');
  const [searchParam] = useState(['title']);

  const search = (list) => {
    return list.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  return (
    <>
      <h4>Let's go!</h4>
      <form className="p-2 mb-2 bg-light border-bottom">
        <label className="form-check-label">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="form-control me-2"
            placeholder="Search"
            aria-label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </form>

      <ul className="list-group list-group-flush">
        {search(list).map((item) => (
          <span key={item.id} className={!item.completed ? 'keep' : 'move'}>
            <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              {item.title}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={() => updateList(item)}
                  checked={item.completed}
                />
              </div>
            </li>
          </span>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
