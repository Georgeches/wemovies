import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useEffect, useState} from 'react';

import Home from './Components/Home';
import MovieDetail from './Components/MovieDetail';
import Navbar from './Components/Navbar';

function App() {

  const [popularMovies, setPopularMovies] = useState([])
    const [topRated, setTopRated] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const imageSource = 'https://image.tmdb.org/t/p/w500'

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=48dc8450700320739bfcc537a0cc2828&language=en-US&page=1`)
        .then(res => res.json())
        .then(data=>setPopularMovies(data.results))
    },[])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=48dc8450700320739bfcc537a0cc2828&language=en-US&page=1`)
        .then(res => res.json())
        .then(data=>setTopRated(data.results))
    },[])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=48dc8450700320739bfcc537a0cc2828&language=en-US&page=1`)
        .then(res => res.json())
        .then(data=>setUpcoming(data.results))
    },[])

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home popularMovies={popularMovies} topRated={topRated} upcoming={upcoming} imageSource={imageSource}/>}/>
          <Route path="/movie/:id/:name" element={
            <>
            <Navbar/>
            <MovieDetail popularMovies={popularMovies} topRated={topRated} upcoming={upcoming} imageSource={imageSource}/>
            </>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
