import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../css/style.css'

export default function Home({seriesList, popularMovies, popularSeries, topSeries, upcoming, imageSource, search, setSearch, setViewAdult, viewAdult, moviesList}){

    const [videoIndex, setVideoIndex] = useState(0)
    const videoPop = popularMovies[videoIndex]
    const [showSeries, setShowSeries] = useState(false)
    const [video, setVideo] = useState({})
    const videoRef = useRef(null)
    const [isLoading, setLoading] = useState(true)
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGRjODQ1MDcwMDMyMDczOWJmY2M1MzdhMGNjMjgyOCIsInN1YiI6IjY0MjNkYjk5NjkwNWZiMDBiZDA4YWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9FswfKJaJeW374o-VhH9k7qEQrrQnD7JZgolpoOrSeg'
        }
    };

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${videoPop?.id}/videos?language=en-US`, options)
      .then(response=>response.json())
      .then(data=>{
        setVideo(data?.results?.find(result=>result?.type==="Trailer"))
      })
    }, [videoPop])

    useEffect(()=>{
      videoPop?.id&&(setLoading(false))
    }, [videoPop])

    const handleVideoError = (e) => {
      e.preventDefault()
      console.error('Video loading error');
      setVideoIndex(videoIndex+1)
    };

    // useEffect(()=>{
    //   setInterval(function() {
    //     setVideoIndex(videoIndex+1)
    //     console.log(videoIndex)
    //   }, 10000);
    // }, [videoIndex])

    return(
        <>
        {isLoading?
        <div className='svg-load container d-flex flex-wrap align-items-center justify-content-center' style={{height:"90vh"}}>
          <svg viewBox="0 0 100 100" width="200">
          <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
            <path d="M 21 40 V 59">
              <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="0 21 59; 180 21 59"
              dur="2s"
              repeatCount="indefinite" />
            </path>
            <path d="M 79 40 V 59">
              <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="0 79 59; -180 79 59"
              dur="2s"
              repeatCount="indefinite" />
            </path>
  
            <path d="M 50 21 V 40">
              <animate
              attributeName="d"
              values="M 50 21 V 40; M 50 59 V 40"
              dur="2s"
              repeatCount="indefinite" />
            </path>
            <path d="M 50 60 V 79">
              <animate
              attributeName="d"
              values="M 50 60 V 79; M 50 98 V 79"
              dur="2s"
              repeatCount="indefinite" />
            </path>
            <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">
            <animate
              attributeName="stroke"
              values="rgba(255,255,255,1); rgba(100,100,100,0)"
              dur="2s"
              repeatCount="indefinite" />
            </path>
            <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z"/>
          
            <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
            <animate
              attributeName="stroke"
              values="rgba(100,100,100,0); rgba(255,255,255,1)"
              dur="2s"
              repeatCount="indefinite" />
            </path>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              values="0 0; 0 -19"
              dur="2s"
              repeatCount="indefinite" />
          </g>
        </svg>
        <p>Loading....</p>
        </div>
        :
        <>
        <div className="hero-sections" style={{width: window.screen.width<600?"46vh":"100%"}}>
        {window.screen.width>900&&(
        <div className="intro container-fluid">
            <div className="jumbotron jumbotron-fluid">
                {/**     background-image: url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701168454.jpg"); */}
               
                
                <div className=''  style={{ width: '100%', height: '75vh', marginTop: "100px" }}>
                  <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${video?.key}`}
                      playing={true}
                      controls={true}
                      muted={true}
                      width="100%"
                      height={window.screen.width>600?"110%":"60%"}
                      onEnded={e=>setVideoIndex(videoIndex+1)}
                      onError={handleVideoError}
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
              <div className={'video-captions row'}>
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
    )}
        
    </div>

    <div className="categories">
      
        <div className="category">
            <h3 className="first">Popular Movies</h3>
            <div className="category-body popular">
                {popularMovies.map(movie=>
                    <div className="movie-card" key={movie?.id}>
                        <a href={'/movie/'+movie?.id+'/'+movie?.title}><LazyLoadImage src={imageSource+movie?.poster_path} alt="${result?.title}" loading="eager"/></a>
                    </div>
                )}
            </div>
        </div>

        <div className="category">
          <h3>Upcoming Movies</h3>
          <div className="category-body upcoming">
                {upcoming.map(movie=>
                    <div className="movie-card" key={movie?.id}>
                        <a href={'/movie/'+movie?.id+'/'+movie?.title}><LazyLoadImage src={imageSource+movie?.poster_path} alt="${result?.title}" loading={window.screen.width<600?"eager":"lazy"}/></a>
                    </div>
                )}
          </div>
      </div>

      <div className="category">
          <h3>Popular Series</h3>
          <div className="category-body upcoming">
                {popularSeries.map(movie=>
                    <div className="movie-card" key={movie?.id}>
                        <a href={'/series/'+movie?.id+'/'+movie?.name}><LazyLoadImage src={imageSource+movie?.poster_path} alt="${result?.title}" loading={window.screen.width<600?"eager":"lazy"}/></a>
                    </div>
                )}
          </div>
      </div>

      <div className="category">
          <h3>Top Rated Series</h3>
          <div className="category-body upcoming">
                {topSeries.map(movie=>
                    <div className="movie-card" key={movie?.id}>
                        <a href={'/series/'+movie?.id+'/'+movie?.name}><LazyLoadImage src={imageSource+movie?.poster_path} alt="${result?.title}" loading="lazy"/></a>
                    </div>
                )}
          </div>
      </div>

      <div className='movies-list-section'>
          <h3 className="first">Recommendations</h3>
          {/** 
            <div className="form-check text-secondary ps-5 ps-lg-5">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e=>setViewAdult(!viewAdult)}/>
                <label className="form-check-label" for="flexCheckDefault">
                    Show adult content
                </label>
            </div>
            */}
            <div className='toggle'>
              <button style={{borderBottom: !showSeries?"1px solid grey":"none"}} className='btn text-secondary' onClick={e=>setShowSeries(false)}>Movies</button>
              <button style={{borderBottom: showSeries?"1px solid grey":"none"}} className='btn text-secondary' onClick={e=>setShowSeries(true)}>Series</button>
            </div>
            {!showSeries?
            <div className='results d-flex justify-content-center flex-wrap'>
              {moviesList.map(movie=>
              movie?.poster_path&&(
                <div className="movie-card movie-result" key={movie?.id}>
                    <a href={'/movie/'+movie?.id+'/'+movie?.title}><LazyLoadImage src={imageSource+movie?.poster_path} alt="${result?.title}" loading='lazy'/></a>
                </div>
              )
              )}
            </div>
            :
            <div className='results d-flex justify-content-center flex-wrap'>
              {seriesList.map(movie=>
                movie?.poster_path&&(
                <div className="movie-card movie-result" key={movie?.id}>
                    <a href={'/series/'+movie?.id+'/'+movie?.name}><LazyLoadImage src={imageSource+movie?.poster_path} alt="${result?.title}" loading='lazy'/></a>
                </div>
                )
              )}
            </div>
            }
        </div>
      
    </div>
    </>
    }
    </>
    )
}