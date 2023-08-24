import './App.css';
import BookComponent from './Components/BookComponent';
import { Route, Routes } from "react-router-dom";
import PageNotFound from './Components/PageNotFound';
import SearchComponent from './Components/SearchComponent';
import { useState } from 'react';
import Header from './Components/Header';

function App() {
  const [checked, setChecked] = useState([]);



  return (
    <>

      <div>
        <div className='header'>
          BookLibrary.com
        </div>
        <Routes>
          <Route path='/' element={<SearchComponent checked={checked} setChecked={setChecked} />}>
          </Route>
          <Route path='/works/:bookId' element={<BookComponent checked={checked} setChecked={setChecked} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        {/* <div className='footer'>
        </div> */}
        {/* <Header /> */}
      </div>
    </>
  );
}

export default App;
