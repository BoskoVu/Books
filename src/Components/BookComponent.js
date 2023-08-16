import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookComponent = ({ pregledano, setPregledano }) => {
  const params = useParams()
  const bookId = params.bookId;
  const navigate = useNavigate()
  const [book, setBook] = useState({})
  const [imgSrc, setImgSrc] = useState('')
  const exists = false

  useEffect(() => {
    axios.get(`https://openlibrary.org/works/${bookId}.json`)
      .then(res => {
        console.log('Trazena knjiga' + res.data.covers)
        setBook(res.data)
        setImgSrc(`https://covers.openlibrary.org/b/id/${res.data.covers[0]}-L.jpg`)
        if (pregledano.length > 0) {
          pregledano.map(
            pregled => {
              if (pregled.key === res.data.key) {
                exists = true;
              }
            }
          )
        }
        if (!exists) {
          setPregledano((prevState) => [...prevState, res.data])
        }
        // setPregledano((prevState) => [...prevState, res.data])


        
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  return (
    <div className='books'>
      <div className='search'>
        {book.title}
        {book.first_publish_date}
        {book.revision}
        {/* {book.subjects[0]} */}
      </div>
      <div className='picked'>
          <img src={imgSrc} alt=''></img>
        </div>
      <button onClick={() => { navigate(-1) }}>Go back</button>
    </div>
  );
}

export default BookComponent;
