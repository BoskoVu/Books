import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookComponent = ({ checked, setChecked }) => {
  const params = useParams()
  const bookId = params.bookId;
  const navigate = useNavigate()
  const [book, setBook] = useState({})
  const [imgSrc, setImgSrc] = useState('')
  const [author, setAuthor] = useState({})

  useEffect(() => {
    let exists = false
    axios.get(`https://openlibrary.org/works/${bookId}.json`)
      .then(res => {
        setBook(res.data)
        document.title = res.data.title;
        setImgSrc(`https://covers.openlibrary.org/b/id/${res.data.covers[0]}-L.jpg`)
        if (checked.length > 0) {
          checked.forEach(
            check => {
              if (check.key === res.data.key) {
                exists = true;
              }
            }
          )
        }
        if (!exists) {
          setChecked((prevState) => [...prevState, res.data])
        }

        axios.get(`https://openlibrary.org/authors/${res.data.authors[0].author.key.slice(9)}.json`)
          .then((a) => {
            setAuthor(a.data)
          })
          .catch(

        )

      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='books'>
      <div className='buttonDiv'>
        <button className='btnHome' onClick={() => { navigate('/') }}><i className="fa fa-home">     Home</i></button>
      </div>
      <div className='imgDiv'>
        <img src={imgSrc} alt=''></img>
      </div>
      <div className='bookContent'>
        <div className='bookTitle'>
          <h1>{book.title}</h1>
        </div>
        <div className='bookAuthor'>
          <h3>{author.name}</h3>
        </div>
        <div className='bookDesc'>
          {book.description ? (book.description.value ? <div>{book.description.value}</div> : <div>{book.description}</div>) : <h3>DESCRIPTION NOT AVAILABLE</h3>}
        </div>
      </div>

    </div>
  );
}

export default BookComponent;
