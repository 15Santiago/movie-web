const API = 'https://api.themoviedb.org/3';

async function getTrendingMoviesPreview () {
    try {
        const response = await fetch (`${API}/trending/movie/week?api_key=${API_Key}`);
        const data = await response.json();
        const movies = data.results;

        trendingPreviewmovieListPreview.innerHTML = '';
        movies.forEach(movie => {
            const imgContainer = document.createElement('div');
            const img = document.createElement('img');

            imgContainer.classList.add('movie-container');
            img.classList.add('movie-img');
            img.setAttribute('alt', movie.title);
            img.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);

            imgContainer.appendChild(img);
            trendingPreviewmovieListPreview.appendChild(imgContainer);
        });
    } catch (error){
        console.log(error);
    }
};

async function getCategoriesPreview () {
    try {
        const response = await fetch (`${API}/genre/movie/list?api_key=${API_Key}`);
        const data = await response.json();
        const categories = data.genres;

        categoriesPreviewlist.innerHTML = '';
        categories.forEach(category => {
            
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-container');

            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title');
            categoryTitle.setAttribute('id', `id${category.id}`);
            const categoryTitleText = document.createTextNode(category.name);

            categoryTitle.appendChild(categoryTitleText);
            categoryDiv.appendChild(categoryTitle);
            categoriesPreviewlist.appendChild(categoryDiv);
        });
    } catch (error){
        console.log(error);
    }
};