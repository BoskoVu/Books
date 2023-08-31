import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SearchComponent({ checked, setChecked }) {
    const [books, setBooks] = useState([])
    const [title, setTitle] = useState('')
    const [inputTitle, setInputTitle] = useState('')
    const [loading, setLoading] = useState(true)
    const [noResults, setNoResults] = useState(true)
    

    useEffect(() => {
        document.title = 'Book Library';
    }, [])

    
    useEffect(() => {
        if (title) {
            setNoResults(true)
            setBooks([])
            try {
                axios.get(`https://openlibrary.org/search.json?title=${title}&limit=30`)
                    .then((res) => {
                        res.data.docs.forEach(ress => {
                            try {
                                axios.get(`https://openlibrary.org/works/${ress.key.slice(7)}.json`)
                                    .then((element) => {
                                        try {
                                            if (element.data.covers[0] !== 'undefined') {
                                                setBooks((prevState) => [...prevState, element.data])
                                            }
                                        }
                                        catch {
                                        }
                                    })
                                    .catch(error => {
                                        console.log("axios " + error)
                                    })
                            }
                            catch {
                            }
                        })
                    })
                    .catch(er => {
                        console.log("----" + er)
                    })
            }
            catch {
            }
        }
        else {
        }
    }, [title])


    useEffect(() => {
      console.log(books.length)
      const timer = setTimeout(() => {
        if(books.length===0 && inputTitle!==''){
            setNoResults(false)
        }
      }, 15000);
      return () => clearTimeout(timer);
    }, [books, inputTitle]);


    const handleInputChange = (e) => {
        setInputTitle(e)
    }

    const handleChange = () => {
        setLoading(false)
        setTitle('')
        setTitle(inputTitle)
    }



    return (
        <>
            <div className='inputAndSearch'>
                <div className='inputt'>
                    <input type="text"
                        placeholder='Book title'
                        className='input'
                        value={inputTitle}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <span className="input-border"></span>
                </div>
                <div className='searchDiv'>
                    {inputTitle.length ? <button className="button" onClick={() => handleChange()}>Search</button> : <button disabled={true} className="buttonn">Search</button>}
                </div>
            </div>
            <div className='search'>
                <div hidden={!noResults} className='display'>
                    <nav>
                        <ul>
                        {books.length ? books.map
                            (book => (
                                    <Link to={`${book.key}`} >
                                        <div className='searchResult' key={'divkey' + book.key}>
                                        {book.title}
                                    </div></Link>)) : <div hidden={loading} className='loading'><div className="lds-dual-ring"></div></div>}
                        </ul>
                    </nav>
                </div>
                <div hidden={noResults} className='display'>
                    <div className='loading'>No books with specified title</div>
                </div>
            </div>
            <div className='picked'>
                <div>
                    Previously checked books :
                    <nav>
                        <ul>
                            {(checked.length) ? checked.map(book => (<li key={'likey' + book.key}><Link to={`${book.key}`} >{book.title}</Link></li>)) : <h3>No previously checked books</h3>}
                        </ul>
                    </nav>
                </div>
                {checked.length ? <button className='btn' onClick={() => { setChecked([]) }}><i className="fa fa-trash">    Delete</i></button> : null}
            </div>
        </>
    );

}

export default SearchComponent;
