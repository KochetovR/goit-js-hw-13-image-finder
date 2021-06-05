const key = '21916161-6ae0745b5418f2e7bb34916ca';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&'
const perPage = 12;

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImg() {
    const url = `${BASE_URL}q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${key}`
    
    return fetch(url)
    .then(res => res.json())
    .then(({hits}) => {
        this.page += 1;
        return hits
        
    }) 
    }

    get searchQ() {
        return this.searchQuery;
    }

    set searchQ(newSearchQ) {
        this.searchQuery = newSearchQ;
    }
}

