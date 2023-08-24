import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SearchComponent({ checked, setChecked }) {
    const [books, setBooks] = useState([])
    const [title, setTitle] = useState('Unesite naslov')
    const [inputTitle, setInputTitle] = useState('')



    useEffect(() => {
        if (title) {
            setBooks([])
            try {
                axios.get(`https://openlibrary.org/search.json?title=${title}&limit=30`)
                    .then((res) => {
                        res.data.docs.map(ress => {
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
                                        console.log("Greska axios " + error)
                                    })
                            }
                            catch {

                            }
                        })
                    })
                    .catch(er => {
                        console.log("Greska " + er)
                    })
            }
            catch {
            }
        }
        else {
            setTitle('Unesite naslov')
        }
    }, [title])




    const handleInputChange = (e) => {
        setInputTitle(e)
    }

    const handleChange = () => {
        setTitle('')
        setTitle(inputTitle)
    }


    return (
        <>
            <div className='inputAndSearch'>
                <div className='inputt'>
                    <input type="text"
                        className='input'
                        value={inputTitle}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <span className="input-border"></span>
                </div>
                <div className='searchDiv'>
                    <button class="button" onClick={() => handleChange()}>Search</button>
                </div>
            </div>
            <div className='search'>
                <div className='display'>
                    <nav>
                        <ul>
                        {books.length ? books.map
                            (book => (
                                    <Link to={`${book.key}`} >
                                <div className='searchResult' key={'divkey' + book.key}>
                                        {book.title}
                                </div></Link>)) : null}
                                </ul>
                    </nav>
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
                <button className='btn' onClick={() => { setChecked([]) }}><i class="fa fa-trash">    Delete</i></button>
            </div>
        </>
    );

}

export default SearchComponent;
