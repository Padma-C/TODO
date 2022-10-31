import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TodoList from './components/TodoList';
import CompletedList from './components/CompletedList';
import axios from 'axios';

const App = () => {
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      await axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => {
          setList(res.data);
        });
      console.log();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const updateList = (item) => {
    const listItemIndex = list.findIndex((i) => i.id === item.id);
    const newItem = [...list][listItemIndex];
    newItem.completed = !newItem.completed;
    [...list][listItemIndex] = newItem;
    setList([...list]);
  };

  return (
    <div>
      {list ? (
        <>
          <div>
            <Router>
              <div className="col-lg-8 mx-auto p-4 py-md-5">
                <main>
                  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <span className="navbar-brand mb-0 h1">✓Todo</span>
                  </nav>

                  <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                      <img
                        src="./pexels-bich-tran-636243.jpg"
                        className="d-block mx-lg-auto img-fluid rounded"
                        alt="Notebook"
                        width="700"
                        height="700"
                        loading="lazy"
                      ></img>
                    </div>

                    <div className="col-lg-6">
                      <h1 className="display-5 fw-bold lh-1 mb-3">
                        To Do. Done.
                      </h1>
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris facilisis suscipit ex sit amet mattis. Fusce
                        tempor vitae lectus eget feugiat. Sed a dapibus augue,
                        ac elementum nibh. Integer vehicula enim ut imperdiet
                        feugiat. Aliquam posuere nulla et facilisis fermentum.
                      </p>
                    </div>
                    <div className="container-fluid p-3 my-3"></div>
                  </div>

                  <div className="row g-5">
                    <div className="col-md-6">
                      <TodoList list={list} updateList={updateList} />
                    </div>
                    <div className="col-md-6">
                      <CompletedList list={list} updateList={updateList} />
                    </div>
                  </div>
                </main>
                <footer className="pt-5 my-5 text-muted border-top">
                  Assessment &copy; 2022
                </footer>
              </div>
            </Router>
          </div>
        </>
      ) : (
        <div class="spinner-border text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default App;
