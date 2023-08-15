import React, { useEffect, useState } from 'react'
import '../css/style.css'

export default function Home({popularMovies,topRated,upcoming,imageSource}){

    return(
        <>
        <div className="hero-section">
        <div className="nav">
            <nav className="navbar navbar-expand-lg ">
                <div className="space"><a className="navbar-brand" href="#">Memovies</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="las la-bars"></i>
                </button></div>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">TV Shows</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">My List</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">New & Popular</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Kids</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Popular</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Genre
                        </a>
                        <div className="dropdown-menu drop" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Horror</a>
                          <a className="dropdown-item" href="#">Romance</a>
                          <a className="dropdown-item" href="#">Thriller</a>
                          <a className="dropdown-item" href="#">Comedy</a>
                          <a className="dropdown-item" href="#">Anime</a>
                          <a className="dropdown-item" href="#">Science fiction</a>
                        </div>
                      </li>
                  </ul>
                </div>
              </nav>
        </div>
        <div className="intro">
            <div className="jumbotron jumbotron-fluid">
                
              </div>
              <div className="container texts">

                <h1 className="intro-header">Welcome to Memovies</h1>
                <form action="">
                  <input type="text" id="search" placeholder="Search for movies here"/>
                  <button className="search">Search</button>
                </form>  
              </div>
        </div>
    </div>

    <div className="categories">
        <div className="category">
            <h3 className="first">Popular</h3>
            <div className="category-body popular">
                {popularMovies.map(movie=>
                    <div className="movie-card">
                        <a href={'/movie/'+movie.id+'/'+movie?.title}><img src={imageSource+movie?.poster_path} alt="${result?.title}"/></a>
                        <p className="title">{movie?.title}</p>
                    </div>
                )}
            </div>
        </div>

        <div className="category">
            <h3>Top rated</h3>
            <div className="category-body top-rated">
                {topRated.map(movie=>
                    <div className="movie-card">
                        <img src={imageSource+movie?.poster_path} alt="${result?.title}"/>
                        <p className="title">{movie?.title}</p>
                    </div>
                )}
            </div>
        </div>

        <div className="category">
          <h3>Upcoming</h3>
          <div className="category-body upcoming">
                {upcoming.map(movie=>
                    <div className="movie-card">
                        <img src={imageSource+movie?.poster_path} alt="${result?.title}"/>
                        <p className="title">{movie?.title}</p>
                    </div>
                )}
          </div>
      </div>
    </div>
    </>
    )
}