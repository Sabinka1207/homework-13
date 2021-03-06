import './css/styles.css';
import PostAPI from './js/postAPI';
import renderPosts from './js/render';

const refs = {
    galleryField: document.querySelector(".gallery"),
    searchForm: document.querySelector(".search-form"),
    postsList: document.querySelector(".gallery-list"),
    onLoadMore: document.querySelector(".load-more")
}

const postAPI = new PostAPI ()

refs.searchForm.addEventListener('submit', onSearch);
refs.onLoadMore.addEventListener('click', onLoadMore)

function onSearch(evt) {
    evt.preventDefault()
    clearSearchResults()
    postAPI.resetPage();
    postAPI.query = evt.currentTarget.elements.searchQuery.value
    postAPI.fetchPosts().then(posts => insertPosts(posts));
}

function onLoadMore() {
    postAPI.fetchPosts().then(posts => insertPosts(posts))
}

function insertPosts(posts) {
    refs.postsList.insertAdjacentHTML('beforeend', renderPosts(posts))
}

function clearSearchResults() {
    refs.onLoadMore.classList.add('is-hidden')
    refs.postsList.innerHTML = ""
}
