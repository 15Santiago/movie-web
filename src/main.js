const API = 'https://api.themoviedb.org/3';

async function getTrendingMoviesPreview () {
    try {
        const response = await fetch (`${API}/trending/movie/week?api_key=${API_Key}`);
        const data = await response.json();
        const movies = data.results;

        movies.forEach(movie => {
            const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
            const imgContainer = document.createElement('div');
            const img = document.createElement('img');

            imgContainer.classList.add('movie-container');
            img.classList.add('movie-img');
            img.setAttribute('alt', movie.title);
            img.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);

            imgContainer.appendChild(img);
            trendingPreviewMoviesContainer.appendChild(imgContainer);
        });
    } catch (error){
        console.log(error);
    }
}

getTrendingMoviesPreview();