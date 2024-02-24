export class ApiService {
    constructor() {
        this.url = "https://api.punkapi.com/v2/beers";
    }
    // used for creating a page with cards, different URL is needed only for the search results page
    async getBeers (pageNum, pageItemsNum, urlEnding = `?page=${pageNum}&per_page=${pageItemsNum}`) {
        const response = await fetch(`${this.url}${urlEnding}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    }

    async getRandomBeer () {
        const response = await fetch(`${this.url}/random`);
        const parsedResponse = await response.json();
        return parsedResponse[0];
    }
}