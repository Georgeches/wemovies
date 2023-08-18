import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './search.css'

export default function MovieSearch({imageSource}){

    const {search} = useParams()
    const [searchResults, setResults] = useState([])
    const [page, setPage] = useState(1)
    const [adult, setAdult] = useState(false)
    const [pages, setPages] = useState([])

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGRjODQ1MDcwMDMyMDczOWJmY2M1MzdhMGNjMjgyOCIsInN1YiI6IjY0MjNkYjk5NjkwNWZiMDBiZDA4YWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9FswfKJaJeW374o-VhH9k7qEQrrQnD7JZgolpoOrSeg'
        }
      };
      
      useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=${adult}&language=en-US&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
            setResults(response.results)
            let newPages = []
            for(let i=1; i<=response.total_pages; i++){
                newPages.push(i)
            }
            setPages(newPages)
        })
        .catch(err => console.error(err));
      },[page, adult])

    return(
        <div className="search-page ps-lg-5 pt-5">
            <h2 className="ps-5 ps-lg-0">Search Results of <span>{search}</span></h2>
            {/* <div className="form-check ps-5 ps-lg-0">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e=>setAdult(!adult)}/>
                <label className="form-check-label" for="flexCheckDefault">
                    Show adult content
                </label>
            </div> */}
            <div className="results d-flex justify-content-center flex-wrap">
                {searchResults.map(result=>
                    result?.poster_path!==null && (
                        <div className="movie-card movie-result">
                            <a href={'/movie/'+result?.id+'/'+result?.title}><LazyLoadImage src={imageSource+result?.poster_path} alt={`${result?.title}`} loading="lazy"/></a>
                        </div>
                    )
                )}
            </div>
            <div className="toggle-pages">
                <p>Page:</p>
                <div className="pages">
                {pages.map(this_page=>
                    page===this_page?
                    <button style={{border: "1px solid grey"}}>{this_page}</button>
                    :
                    <button onClick={e=>{
                        setPage(this_page)
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }}>{this_page}</button>
                )}
                </div>
            </div>
        </div>
    )
}