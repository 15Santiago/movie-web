let maxPage;
let page = 1;
let infiiteScroll;

//Buttons
searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value}`;
});
trendingPreviewBtn.addEventListener('click', () => {
    location.hash = '#trends';
});
arrowBtn.addEventListener('click', () => {
    window.history.back();
});

//Windows
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiiteScroll, false);

function navigator () {

    if (infiiteScroll) {
        window.removeEventListener('scroll', infiiteScroll, {passive: false});
        infiiteScroll = undefined;
    };

    if (location.hash.startsWith('#trends')) {
        trendesgchPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviePage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

    if (infiiteScroll) {
        window.addEventListener('scroll', infiiteScroll, {passive: false});
    }
};

function homePage () {
    window.scrollTo(0, 0);

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    likedMoviesListSection.classList.remove('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
};
function categoriesPage () {
    window.scrollTo(0, 0);

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    likedMoviesListSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
    infiiteScroll = getPaginatedMoviesByCategory(categoryId);
};
function moviePage () {
    window.scrollTo(0, 0);

    headerSection.classList.add('header-container--long');
    // headerSection.getElementsByClassName.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    likedMoviesListSection.classList.add('inactive');

    const [_, MvoieId] = location.hash.split('=');
    getMovieById(MvoieId);
};
function searchPage () {
    window.scrollTo(0, 0);

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    likedMoviesListSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
    infiiteScroll = getPaginatedMoviesBySearch(query);
};
function trendesgchPage () {
    window.scrollTo(0, 0);

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    likedMoviesListSection.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Trends';

    getTrendingMovies();
    infiiteScroll = getPaginatedTrendingMovies;
};