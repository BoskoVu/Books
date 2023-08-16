import './App.css';
import BookComponent from './Components/BookComponent';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PageNotFound from './Components/PageNotFound';
import SearchComponent from './Components/SearchComponent';
import { useState } from 'react';

function App() {
  const [pregledano, setPregledano] = useState([]);

  

  return (
    <>
      
      <div>
        <Routes>
          <Route path='/' element={<SearchComponent pregledano={pregledano} setPregledano={setPregledano} />}>
            {/* <Route path=':bookId' element={<BookComponent />} /> */}
          </Route>
            <Route path='/works/:bookId' element={<BookComponent pregledano={pregledano} setPregledano={setPregledano} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
