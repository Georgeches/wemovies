let popularMovies = document.querySelector('.popular')
let topMovies = document.querySelector('.top-rated')
let upcomingMovies = document.querySelector('.upcoming')

let imageSource = 'https://image.tmdb.org/t/p/w500'
function showMovies(section){
    fetch(`https://api.themoviedb.org/3/movie/${section}?api_key=48dc8450700320739bfcc537a0cc2828&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => {
        for(let result of data.results){
            let image = imageSource+result.poster_path
            let movieCard = `
                <div class="movie-card">
                    <img src='${image}' alt="${result.title}">
                    <p class="title">${result.title}</p>
                </div>
            `
            if(section == 'popular'){
                popularMovies.innerHTML += movieCard
            }
            else if(section == 'top_rated'){
                topMovies.innerHTML += movieCard
            }
            else if(section == 'upcoming'){
                upcomingMovies.innerHTML += movieCard
            }
            
        }
    })
}

showMovies('popular')
showMovies('top_rated')
showMovies('upcoming')