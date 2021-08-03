import axios from 'axios';
import Notiflix from 'notiflix';

const url = 'https://pixabay.com/api/'
const onLoadMore = document.querySelector(".load-more")
const perPage = 40;

export default class PostAPI {
    constructor() {
        this.searchQuery = ''
        this.page = 1 
     }
    
    get query() {
        return this.searchQuery
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery
    }

    fetchPosts() {
        const params = new URLSearchParams({
        key: '16347216-fb50075837ded8f23f3479d31',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: perPage
        })

    return axios.get(`${url}?${params}`).then(r => {
        if (r.data.total === 0) {
            return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        } else {

            console.log(r.data, this.page, r.data.totalHits/perPage)

            if (this.page > r.data.totalHits/perPage+1) {
            onLoadMore.classList.add('is-hidden')
            return Notiflix.Notify.warning("We're sorry, but you've reached the end of search results")
            }
            this.page += 1
            return r.data.hits
        }
    }).catch(onLoadMore.classList.add('is-hidden'))
    }

    resetPage() {
        this.page = 1
    }
}