const API = 'https://api.themoviedb.org/3';

//Utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach( (entry)=> {
        if (entry.isIntersecting){
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        };
    });
});

function createMovies (movies, container, lazyload = false) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const imgContainer = document.createElement('div');
        const img = document.createElement('img');
        imgContainer.addEventListener('click', () => {
            location.hash = `#movie= ${movie.id}`;
        });

        imgContainer.classList.add('movie-container');
        img.classList.add('movie-img');
        img.setAttribute('alt', movie.title);
        img.setAttribute(
            lazyload ? 'data-img' : 'src', 
            `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        );
        if (lazyload) {
            lazyLoader.observe(img);
        }
        img.addEventListener('error', () => {
            img.setAttribute('src', 'https://image.tmdb.org/t/p/w300/adOzdWS35KAo21r9R4BuFCkLer6.jpg');
        });

        imgContainer.appendChild(img);
        container.appendChild(imgContainer);
    });
};
function createCategories (categories, container) {
    container.innerHTML = '';

    categories.forEach(category => {
            
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryDiv.appendChild(categoryTitle);
        container.appendChild(categoryDiv);
    });
};

//Api call
async function getTrendingMoviesPreview () {
    try {
        const response = await fetch (`${API}/trending/movie/week?api_key=${API_Key}`);
        const data = await response.json();
        const movies = data.results;

        createMovies(movies, trendingPreviewmovieListPreview, true);
    } catch (error){
        console.log(error);
    }
};
async function getCategoriesPreview () {
    try {
        const response = await fetch (`${API}/genre/movie/list?api_key=${API_Key}`);
        const data = await response.json();
        const categories = data.genres;

        // categoriesPreviewlist.innerHTML = '';
        createCategories(categories, categoriesPreviewlist);
    } catch (error){
        console.log(error);
    }
};
async function getMoviesByCategory (id) {
    try {
        const response = await fetch (`${API}/discover/movie?api_key=${API_Key}&&with_genres=${id}`);
        const data = await response.json();
        const movies = data.results;

        createMovies(movies, genericListSection, true);
    } catch (error){
        console.log(error);
    }
};
async function getMoviesBySearch(query) {
    try {
        const response = await fetch (`${API}/search/movie?api_key=${API_Key}&&query=${query}`);
        const data = await response.json();
        const movies = data.results;

        createMovies(movies, genericListSection);
    } catch (error){
        console.log(error);
    }
};
async function getTrendingMovies () {
    try {
        const response = await fetch (`${API}/trending/movie/week?api_key=${API_Key}`);
        const data = await response.json();
        const movies = data.results;

        createMovies(movies, genericListSection);
    } catch (error){
        console.log(error);
    }
};
async function getMovieById (id) {
    try {
        const response = await fetch (`${API}/movie/${id}?api_key=${API_Key}`);
        const movie = await response.json();
        const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    
        headerSection.style.background = `
        linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImgUrl})
        `;
        movieDetailTitle.textContent = `${movie.title}`;
        movieDetailDescription.textContent = `${movie.overview}`;
        movieDetailScore.textContent = `${movie.vote_average}`;

        createCategories(movie.genres, movieDetailCategoriesList);
        getRelatedMoviesById(id);
    } catch (error){
        console.log(error);
    }
}; 
async function getRelatedMoviesById (id) {
    try {
        const response = await fetch (`${API}/movie/${id}/similar?api_key=${API_Key}`);
        const movie = await response.json();
        const relatedMovies = await movie.results;

        createMovies(relatedMovies, relatedMoviesContainer);
    } catch (error){
        console.log(error);
    }
};