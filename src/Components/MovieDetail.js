import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import ReactPlayer from 'react-player';
import './movieDetail.css'

export default function MovieDetail({upcoming, popularMovies, topRated}){
    const {id} = useParams();
    const [movie, setMovie] = useState({})
    const [similarMovies, setSimilar] = useState([])
    const [reviews, setReviews] = useState([])
    const [videos, setVideos] = useState([])
    const [starsCount, setStars] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false);
    const [decimalPresent, setPresent] = useState(false)
    const [loadedVideoIndices, setLoadedVideoIndices] = useState([]);
    const imageSource = 'https://image.tmdb.org/t/p/w500'
    const ytEmbed = "https://www.youtube.com/embed/"
    let starsList = []

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGRjODQ1MDcwMDMyMDczOWJmY2M1MzdhMGNjMjgyOCIsInN1YiI6IjY0MjNkYjk5NjkwNWZiMDBiZDA4YWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9FswfKJaJeW374o-VhH9k7qEQrrQnD7JZgolpoOrSeg'
        }
    };

    useEffect(() => {
        Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options),
            fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options),
            fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, options),
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([similarResponse, movieResponse, reviewsResponse, videosResponse]) => {
            setSimilar(similarResponse.results);
            setMovie(movieResponse);
            setStars(Math.floor((movieResponse.vote_average / 10) * 5) - 1);
            if ((movieResponse.vote_average / 10) * 5 - (Math.floor((movieResponse.vote_average / 10) * 5) - 1) > 0) {
                setPresent(true);
            }
            setReviews(reviewsResponse.results);
            setVideos(videosResponse.results);
        })
        .catch(err => console.error(err));
    }, []);

    function handleVideoLoad(index){
        setLoadedVideoIndices((prevIndices) => [...prevIndices, index]);
    };

    const trailer = videos.find(video=>video?.type==="Trailer")

    for(let i=0; i<=starsCount; i++){
        starsList.unshift("star")
    }
    
    return(
        <div className="movie-details-page container-fluid p-lg-5">
            {trailer &&(
                <div className="trailer d-flex justify-content-center">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer?.key}`}
                        height="100%"
                        width="100%"
                        controls={true}
                    />
                </div>
            )}
            <div className="row mt-5 p-lg-5">
                <div className="col-12 col-lg-3 img-section">
                    <img className="" src={imageSource+movie?.poster_path} alt="movie-poster" />
                </div>
                <div className="col-12 col-lg-9 text-secondary mt-4 mt-lg-0 movie-words">
                    <div className="col-header d-flex align-items-center justify-content-between">
                        <h2 className="text-white">{movie?.title}</h2>
                        <div className="stars">
                            {starsList.map(star=>
                                <i className="bi bi-star-fill"></i>
                            )}
                            {decimalPresent&&(
                                <i className="bi bi-star-half"></i>
                            )}
                        </div>
                    </div>
                    
                    <p className="fw-light">{movie?.tagline}</p>
                    <div className="fine-details d-flex align-items-center">
                        <div className="rating d-flex">
                            <i class="bi bi-star-fill"></i>
                            <p className="ms-1 ">{Math.floor(movie.vote_average)}</p>
                        </div>
                        <p>{movie?.release_date?.slice(0,4)}</p>
                        <p>{movie?.runtime} min</p>
                        <p className="status text-white d-none d-md-flex">{movie?.status}</p>
                    </div>
                    <p className="pt-4">{movie?.overview}</p>
                    <div className="buttons d-flex">
                        <i class="bi bi-plus-lg"></i>
                        <i class="bi bi-heart-fill"></i>
                        <i class="bi bi-bookmark-plus-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>
                    <div className="genres d-flex mt-4">
                    {movie?.genres?.map(genre=>
                        <p className="me-2 mb-3">{genre.name}</p>
                    )}
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-3">
                            <p className="lead">Production Companies: </p>
                        </div>
                        <div className="col-md-7 d-flex flex-wrap">
                            {movie?.production_companies?.map(company=>
                                <p className="me-3">{company?.name}</p>
                            )}
                        </div>
                    <hr/>
                    </div>
                </div>
            </div>

            {videos?.filter(video=>video?.type!=="Behind the Scenes").length>0&&
                <div className="videos-section mt-5">
                    <h4>Videos</h4>
                    <div className="videos">
                    {videos.filter(video=>video?.type!=="Behind the Scenes").map((video, index)=>
                        <div key={video.key} className="video-container">
                            {loadedVideoIndices.includes(index) ? (
                                <div className="video-container">
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${video.key}`}
                                        className="video"
                                        style={{ marginRight: "10px" }}
                                        controls={true}
                                    />
                                </div>
                            ) : (
                                <div className="thumbnail"
                                onMouseEnter={e=>{
                                    e.preventDefault()
                                    let button = e.target.parentNode.querySelector(".play")
                                    button.classList.remove("d-none")
                                }}
                                onMouseLeave={e=>{
                                    e.preventDefault()
                                    let button = e.target.parentNode.querySelector(".play")
                                    button.classList.add("d-none")
                                }}
                                >
                                    <img
                                        src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                                        alt="video-preview"
                                        onClick={() => handleVideoLoad(index)}
                                    />
                                    <button className="play d-none" onClick={() => handleVideoLoad(index)}><i class="bi bi-play-circle-fill"></i></button>
                                </div>
                            )}
                        </div>
                    )}
                    </div>
                </div>
            }

            <div className="related-movies mt-5 ps-lg-5">
                <h4>Recommended Shows</h4>
                <div className="recommended">
                    {similarMovies?.map(popular_movie=>
                        popular_movie?.id!==movie?.id&&(
                            popular_movie?.poster_path!==null&&(
                                <div className="movie-card">
                                    <a href={'/movie/'+popular_movie.id+'/'+popular_movie?.title}><img src={imageSource+popular_movie?.poster_path} alt="${result?.title}"/></a>
                                </div>
                            )
                        )
                    )}
                </div>
            </div>

            <div className="reviews container mt-5">
                <h3 className="text-white">Reviews</h3>
                {reviews?.map(review=>
                    <div className="review">
                        <div className="author">
                            <div className="author-image">
                                {review?.author_details?.avatar_path!==null?
                                    <img src={imageSource+review?.author_details?.avatar_path} alt="author"/>
                                :
                                    <img src="https://imgs.search.brave.com/MWlI8P3aJROiUDO9A-LqFyca9kSRIxOtCg_Vf1xd9BA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc" alt="profile"/>
                                }
                            </div>
                            <div className="author-details">
                                <p>{review?.author_details?.name}</p>
                                <p>{review?.created_at?.slice(0,10)}</p>
                            </div>
                        </div>
                        <div className="review-details">
                            <p>
                            {isExpanded ? review.content : `${review.content.slice(0, 300)}...`}
                                <p style={{fontSize: "small"}} className='fw-normal text-danger read-more-less' onClick={e=>setIsExpanded(!isExpanded)}>
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                </p>
                            </p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}