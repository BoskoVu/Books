import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='pageNotFound'>
      <h3>Wrong URL</h3>
        <button className='btnHome' onClick={() => { navigate('/') }}><i className="fa fa-home">     Home</i></button>
    </div>
  );
}

export default PageNotFound;
