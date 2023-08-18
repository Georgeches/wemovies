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
    const [viewAdult, setViewAdult] = useState(false)
    const imageSource = 'https://image.tmdb.org/t/p/w200'
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

    useEffect(() => {
      const fetchPages = async () => {
        const totalPages = 200;
        const fetchPromises = [];
    
        for (let page = 1; page <= totalPages; page++) {
          const url = `https://api.themoviedb.org/3/discover/movie?include_adult=${viewAdult}&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`;
          fetchPromises.push(fetch(url, options).then(response => response.json()));
        }
    
        try {
          const responses = await Promise.all(fetchPromises);
          const combinedResults = responses.flatMap(response => response.results);
          setMoviesList(combinedResults);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchPages();
    }, [viewAdult]);

    console.log(moviesList)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home setViewAdult={setViewAdult} viewAdult={viewAdult} moviesList={moviesList} search={search} setSearch={setSearch} popularMovies={popularMovies} upcoming={upcoming} imageSource={imageSource}/>}/>
          <Route path="/movie/:id/:name" element={
            <>
            <Navbar/>
            <MovieDetail search={search} setSearch={setSearch} imageSource={imageSource}/>
            </>
          }/>
          <Route path="/search/:search" element={
            <>
            <Navbar search={search} setSearch={setSearch}/>
            <Search imageSource={imageSource} search={search}/>
            </>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
