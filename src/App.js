import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useEffect, useState} from 'react';

//Components
import Home from './Components/Home';
import MovieDetail from './Components/MovieDetail';
import Navbar from './Components/Navbar';
import Search from './Components/Search';

function App() {

    const [popularMovies, setPopularMovies] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [search, setSearch] = useState('');
    const [moviesList, setMoviesList] = useState([])
    const [pagesTotal, setPagesTotal] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [viewAdult, setViewAdult] = useState(false)
    let pages = []
    const imageSource = 'https://image.tmdb.org/t/p/w500'

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGRjODQ1MDcwMDMyMDczOWJmY2M1MzdhMGNjMjgyOCIsInN1YiI6IjY0MjNkYjk5NjkwNWZiMDBiZDA4YWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9FswfKJaJeW374o-VhH9k7qEQrrQnD7JZgolpoOrSeg'
      }
    };

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=48dc8450700320739bfcc537a0cc2828&language=en-US&page=1`)
        .then(res => res.json())
        .then(data=>setPopularMovies(data.results))
    },[])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=48dc8450700320739bfcc537a0cc2828&language=en-US&page=1`)
        .then(res => res.json())
        .then(data=>setUpcoming(data.results))
    },[])

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=${viewAdult}&include_video=true&language=en-US&page=${currentPage}&sort_by=popularity.desc`, options)
      .then(response => response.json())
      .then(response => {
        setPagesTotal(response.total_pages)
        setMoviesList(response.results)
      })
      .catch(err => console.error(err));
    }, [currentPage, viewAdult])

    for(let i=1; i<=pagesTotal; i++){
      pages.push(i)
    }

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home setViewAdult={setViewAdult} viewAdult={viewAdult} setCurrentPage={setCurrentPage} currentPage={currentPage} moviesList={moviesList} pages={pages} search={search} setSearch={setSearch} popularMovies={popularMovies} upcoming={upcoming} imageSource={imageSource}/>}/>
          <Route path="/movie/:id/:name" element={
            <>
            <Navbar/>
            <MovieDetail search={search} setSearch={setSearch} popularMovies={popularMovies} upcoming={upcoming} imageSource={imageSource}/>
            </>
          }/>
          <Route path="/search/:search" element={
            <>
            <Navbar search={search} setSearch={setSearch}/>
            <Search imageSource={imageSource} search={search} popularMovies={popularMovies} upcoming={upcoming}/>
            </>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
