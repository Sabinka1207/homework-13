import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
    galleryField: document.querySelector(".gallery"),
    searchForm: document.querySelector(".search-form"),
    url: 'https://pixabay.com/api/',
    postsList: document.querySelector(".gallery-list")
}
let page = 1;
let limit = 500;
const totalPages = limit / 40;

refs.searchForm.addEventListener('submit', onSearch);

// fetchPostsBtn.addEventListener("click", () => {
//   // Check the end of the collection to display an alert
//   if (page > totalPages) {
//     return toggleAlertPopup();
//   }

//   fetchPosts()
//     .then((posts) => {
//       renderPosts(posts);
//       // Increase the group number
//       page += 1;

//       // Replace button text after first request
//       if (page > 1) {
//         fetchPostsBtn.textContent = "Fetch more posts";
//       }
//     })
//     .catch((error) => console.log(error));
// });

function onSearch(evt) {
    evt.preventDefault();

    if (page > totalPages) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results")
    }

    let searchQuery = evt.currentTarget.elements.searchQuery.value

    const params = new URLSearchParams({
        key: '16347216-fb50075837ded8f23f3479d31',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '40'
    })

    axios.get(`${refs.url}?${params}`).then(r => {
        if (r.data.total === 0) {
            Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        } else {
            renderPosts(r.data.hits)
        }
    })
}

function renderPosts(posts) {
  const markup = posts
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
      return `<li>
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes</b>
            ${likes}
            </p>
            <p class="info-item">
            <b>Views</b>
            ${views}
            </p>
            <p class="info-item">
            <b>Comments</b>
            ${comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>
            ${downloads}
            </p>
        </div>
        </div>
        </li>`;
    })
      .join("");
    
  refs.postsList.insertAdjacentHTML('beforeend', markup)
}
