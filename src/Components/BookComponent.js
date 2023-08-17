import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookComponent = ({ pregledano, setPregledano }) => {
  const params = useParams()
  const bookId = params.bookId;
  const navigate = useNavigate()
  const [book, setBook] = useState({})
  const [imgSrc, setImgSrc] = useState('')
  const [author, setAuthor] = useState({})
  const exists = false

  useEffect(() => {
    axios.get(`https://openlibrary.org/works/${bookId}.json`)
      .then(res => {
        console.log('Trazena knjiga' + res.data.covers)
        setBook(res.data)
        console.log(res.data.description)
        setImgSrc(`https://covers.openlibrary.org/b/id/${res.data.covers[0]}-L.jpg`)
        // setBook(res.data)
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
    
        
        console.log(res.data.authors[0].author.key.slice(9))
        axios.get(`https://openlibrary.org/authors/${res.data.authors[0].author.key.slice(9)}.json`)
          .then((a) => {
            setAuthor(a.data)
            // console.log(a.data.name)
          })
          .catch(

          )
        
        // setPregledano((prevState) => [...prevState, res.data])


        
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  // useEffect(() => {
  //   console.log("key"+book.key)
  //   if(book.key!==undefined){
  //     if (pregledano.length > 0) {
  //       pregledano.map(
  //         pregled => {
  //           if (pregled.key === book.key) {
  //             exists = true;
  //           }
  //         }
  //       )
  //     }
  //     if (!exists) {
  //       setPregledano((prevState) => [...prevState, book])
  //     }

  //   }
  // }, [book])


  return (
    <div className='books'>
      <button onClick={() => { navigate(-1) }}>Go back</button>
      <div className='bookContent'>
        <h1>{book.title}</h1>
        <h3>{author.name}</h3>
        {/* <h5>Godina: {book.first_publish_date}</h5>
        <h5>Ocena: {book.revision}</h5> */}
        <img src={imgSrc} alt=''></img>
        
        
      </div>
      <div className='descContent'>
        {book.description ? (book.description.value ? <div>{book.description.value}</div>:<div>{book.description}</div>) : <h3>OPIS NIJE DOSTUPAN</h3>}
      </div>
      
    </div>
  );
}

export default BookComponent;
