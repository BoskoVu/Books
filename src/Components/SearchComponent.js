import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SearchComponent({ pregledano, setPregledano }) {
    const [books, setBooks] = useState([])
    const [title, setTitle] = useState('Unesite naslov')
    const [pickedBooks, setPickedBooks] = useState([])
    const [inputTitle, setInputTitle] = useState('')
    

    useEffect(() => {
        const storedBooks = localStorage.getItem('pickedBooks');
        if (storedBooks) {
            setPickedBooks(JSON.parse(storedBooks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('pickedBooks', JSON.stringify(pickedBooks));
    }, [pickedBooks]);


    ////////////////////////////// SVE KNJIGE SE PRIKAZUJU
    // useEffect(() => {
    //     if(title){
    //         try{
    //         axios.get(`https://openlibrary.org/search.json?title=${title}&limit=10`)
    //             .then((res) => {
    //                 setBooks(res.data.docs)
    //             })
    //             .catch(er => {
    //                 console.log("Greska " + er)
    //             })
    //         }
    //         catch{
    //             console.log("Greska axios")
    //         }
    //     }
    //     else{
    //         setTitle('Unesite naslov')
    //     }
    // }, [title])



    ////////////////////////////////// CORS ERRORS
    useEffect(() => {
        if(title){
            setBooks([])
            try{
            axios.get(`https://openlibrary.org/search.json?title=${title}&limit=30`)
                .then((res) => {
                    res.data.docs.map( ress => {
                        try{
                            console.log(ress.key.slice(7))
                            axios.get(`https://openlibrary.org/works/${ress.key.slice(7)}.json`)
                            .then((element) => {
                                // console.log(element.data)
                                try{
                                    if(element.data.covers[0]!=='undefined'){
                                        setBooks((prevState) => [...prevState, element.data])
                                    }
                                }
                                catch{
                                    console.log('Greska unutra')
                                }
                            })
                            .catch(error=>{
                                console.log("Greska axios "+error)
                            })
                        }
                        catch{

                        }
                    })
                    // setBooks(res.data.docs)
                })
                .catch(er => {
                    console.log("Greska " + er)
                })
            }
            catch{
                console.log("Greska axios")
            }
        }
        else{
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

    const handleClick = (book) => {
        setPickedBooks((prevState) => [...prevState, book])
    }

    return (
        <>
        <div className='search'>
            <div className='inputt'>
                <input type="text"
                    className='input'
                    value={inputTitle}
                    onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <span className="input-border"></span>
            </div>
            <div className='searchDiv'>
                <button onClick={() => handleChange()}>SUBMIT</button>
            </div>
            <div className='display'>
                <nav>
                    {books.length ? books.map
                        (book => (
                            <div key={'divkey' + book.key}>
                                <Link onClick={() => handleClick(book)} to={`${book.key}`} >
                                    {book.title}</Link>
                            </div>)) : null }
                </nav>
            </div>
        </div>
        <div className='picked'>
                <div>
                    Prethodno izabrane knjige :
                    <nav>
                        <ul>
                            {(pregledano.length) ? pregledano.map
                                (book => (<li key={'likey' + book.key}><Link to={`${book.key}`} >{book.title}</Link></li>)) : <h1>Nema pregledanih</h1>}
                        </ul>
                    </nav>
                </div>
                <button onClick={() => { setPregledano([]) }}>Izbrisi</button>
            </div>
        </>
    );
//     return (
//     <>
//     <div className='search'>
//         <div className='inputt'>
//             <input type="text"
//                 className='input'
//                 value={title}
//                 onChange={(e) => handleChange(e.target.value)} />
//                 <span className="input-border"></span>
            
//         </div>
//         <div className='display'>
//             <nav>
//                 {books.length ? books.map
//                     (book => (
//                         <div key={'divkey' + book.key}>
//                             <Link onClick={() => handleClick(book)} to={`${book.key}`} >
//                                 {book.title} - {book.key.slice(7)}</Link>
//                         </div>)) : <h1>Pogresan unos</h1>}
//             </nav>
//         </div>
//     </div>
//     <div className='picked'>
//             <div>
//                 Prethodno izabrane knjige :
//                 <nav>
//                     <ul>
//                         {(pregledano.length) ? pregledano.map
//                             (book => (<li key={'likey' + book.key}><Link to={`${book.key}`} >{book.title} - {book.key.slice(7)}</Link></li>)) : <h1>Nema pregledanih</h1>}
//                     </ul>
//                 </nav>
//             </div>
//             <button onClick={() => { setPregledano([]) }}>Izbrisi</button>
//         </div>
//     </>
// );
}

export default SearchComponent;
