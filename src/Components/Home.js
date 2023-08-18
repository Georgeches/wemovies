import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player';
import '../css/style.css'

export default function Home({popularMovies,topRated,upcoming,imageSource, search, setSearch}){

    const [videoIndex, setVideoIndex] = useState(0)
    const videoPop = popularMovies[videoIndex]
    const [video, setVideo] = useState({})
    const [paused, setPaused] = useState(false)
    const videoRef = useRef(null)
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGRjODQ1MDcwMDMyMDczOWJmY2M1MzdhMGNjMjgyOCIsInN1YiI6IjY0MjNkYjk5NjkwNWZiMDBiZDA4YWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9FswfKJaJeW374o-VhH9k7qEQrrQnD7JZgolpoOrSeg'
        }
    };
    console.log(videoPop)

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${videoPop?.id}/videos?language=en-US`, options)
      .then(response=>response.json())
      .then(data=>{
        setVideo(data?.results?.find(result=>result?.type==="Trailer"))
      })
    }, [videoPop])

    return(
        <>
        <div className="hero-sections">
        <div className="nav">
            <nav className="navbar navbar-expand-lg ">
                <div className="space d-flex align-items-center">
                  <a className="navbar-brand" href="/">Memovies</a>
                  <form action={"/search/"+search}>
                    <input autoComplete='false' type="text" id="search" placeholder="Search for movies here" onChange={e=>{
                      setSearch(e.target.value)
                    }}/>
                  </form> 
                </div>
                
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
        <div className="intro container-fluid">
            <div className="jumbotron jumbotron-fluid">
                {/**     background-image: url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701168454.jpg"); */}
                <div className=''  style={{ width: '100%', height: '75vh' }}>
                  
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${video?.key}`}
                    playing={true}
                    controls={true}
                    muted={true}
                    width="100%"
                    height={window.screen.width>600?"110%":"60%"}
                    onEnded={e=>setVideoIndex(videoIndex+1)}
                    ref={videoRef}
                  />
                </div>

                

              </div>
              <div className="container texts">

                {/** <form action={"/search/"+search}>
                  <input type="text" id="search" placeholder="Search for movies here" onChange={e=>{
                    setSearch(e.target.value)
                  }}/>
                  <button className="search">Search</button>
                </form> 
                */} 
                
              </div>
              <div className={'video-captions row'} style={{display: !paused?"flex":"none"}}>
                  <div className='col-lg-4 col-md-6'>
                    <h4 className="fw-normal text-white">{videoPop?.title}</h4>
                    <p>{videoPop?.overview}</p>
                    <br/>
                    <div className='caption-buttons'>
                    <a href={'/movie/'+videoPop?.id+'/'+videoPop?.title}> <button><i class="bi bi-play-circle-fill watch"></i> Watch Now</button></a>
                      <button><i class="bi bi-bookmark-plus"></i> Bookamrk</button>
                    </div>
                  </div>
                  <div className='skip-buttons'>
                    <button className='prev-button' onClick={e=>setVideoIndex(videoIndex-1)}><i class="bi bi-caret-left-fill"></i></button>
                    <button className='next-button' onClick={e=>setVideoIndex(videoIndex+1)}><i class="bi bi-caret-right-fill"></i></button>
                  </div>
                </div>
        </div>
        
    </div>

    <div className="categories">
      
        <div className="category">
            <h3 className="first">Popular</h3>
            <div className="category-body popular">
                {popularMovies.map(movie=>
                    <div className="movie-card" key={movie?.id}>
                        <a href={'/movie/'+movie.id+'/'+movie?.title}><img src={imageSource+movie?.poster_path} alt="${result?.title}"/></a>
                    </div>
                )}
            </div>
        </div>

        <div className="category">
            <h3>Top rated</h3>
            <div className="category-body top-rated">
                {topRated.map(movie=>
                    <div className="movie-card" key={movie?.id}>
                        <a href={'/movie/'+movie.id+'/'+movie?.title}><img src={imageSource+movie?.poster_path} alt="${result?.title}"/></a>
                    </div>
                )}
            </div>
        </div>

        <div className="category">
          <h3>Upcoming</h3>
          <div className="category-body upcoming">
                {upcoming.map(movie=>
                    <div className="movie-card" key={movie?.id}>
                        <a href={'/movie/'+movie.id+'/'+movie?.title}><img src={imageSource+movie?.poster_path} alt="${result?.title}"/></a>
                    </div>
                )}
          </div>
      </div>
      
    </div>
    </>
    )
}