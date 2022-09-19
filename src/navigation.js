window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator () {
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
};

function homePage () {
    console.log('Home');
    getTrendingMoviesPreview();
    getCategoriesPreview();
};
function categoriesPage () {
    console.log('categories');
};
function moviePage () {
    console.log('movie');
};
function searchPage () {
    console.log('search');
};
function trendesgchPage () {
    console.log('trendes');
};