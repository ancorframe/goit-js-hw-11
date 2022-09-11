const axios = require("axios").default;
const API_KEY = "29692694-bb33da63923d9aeaf742e04ef&q";

// export async function getCard(searchQuery) {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=29692694-bb33da63923d9aeaf742e04ef&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
//     );
//     //   console.log(response.data.hits);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

// function handleErrors(response) {
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response;
// }

export default class ImageApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = "";
    this.isFetching = false;
  }
  async fetchImage() {
    try {
      this.isFetching = true;
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      // console.log(response);
      //   console.log(this.page);
      this.incrementPage();
      this.isFetching = false;
      // console.log(this.page);
      return response;
    } catch (error) {
      // console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get Page() {
    return this.page;
  }
  set Page(newPage) {
    this.page = newPage;
  }
  get Query() {
    return this.searchQuery;
  }
  set Query(newQuery) {
    this.searchQuery = newQuery;
  }
  get isFetching1() {
    return this.isFetching;
  }
  set isFetching1(newFetching) {
    this.isFetching = newFetching;
  }
}
