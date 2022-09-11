export * from "./css/styles.css";
export * from "./css/modern-normalize.css";
import metroMap from "./svg/sprite.svg";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import cards from "./template/cards.handlebars";
import SimpleLightbox from "simplelightbox";
import InfiniteScroll from "infinite-scroll";
export * from "./css/simple-lightbox.css";
import ImageApiService from "./js/fetchCard";
import debounce from "lodash.debounce";

let search = "";
const gallery = document.querySelector(".gallery");
const form = document.querySelector("#search-form");

form.addEventListener("submit", onSearch);
form.elements[1].style.background = `url(${metroMap})`;

const imageApiService = new ImageApiService();

function onSearch(e) {
  e.preventDefault();
  let onSearchText = e.currentTarget.elements.searchQuery.value.trim();
  if (!onSearchText) {
    return Notify.failure("Please enter Search Query");
  }
  imageApiService.Query = onSearchText;
  search = onSearchText;
  resetGallery();
  resetFetchPage();
  fetchImageService();

  // setTimeout(() => {
  //   infScroll.loadNextPage();
  // }, 100);
}

function resetFetchPage() {
  imageApiService.Page = 1;
}

function resetGallery() {
  gallery.innerHTML = "";
}

const simpleLightBox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});

// infinite scroll

// window.addEventListener("scroll", new debounce(scroll, 100));
// function scroll() {
//   var scrollHeight = document.documentElement.scrollHeight;
//   var scrollTop = document.documentElement.scrollTop;
//   var clientHeight = document.documentElement.clientHeight;
//   console.log({ scrollHeight, scrollTop, clientHeight });
//   if (scrollTop + clientHeight >= scrollHeight - 666) {
//     llll()
//     smoothScroll();
//   }
// }

window.addEventListener("scroll", async () => {
  // Do not run if currently fetching
  if (imageApiService.isFetching1) return;
  // Scrolled to bottom
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    await fetchImageService();
    setTimeout(() => {
      smoothScroll();
    }, 200);
  }
});

function fetchImageService() {
  return imageApiService
    .fetchImage()
    .then((r) => {
      console.log(r);
      if (!r) {
        throw new Error();
      }
      return r.data.hits;
    })
    .then(generateCards)
    .then((r) => {
      gallery.insertAdjacentHTML("beforeend", r);
      simpleLightBox.refresh();
    })
    .catch((error) => {
      console.log(error);
      return Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    });
}

function generateCards(r) {
  return r
    .map((r) => {
      return cards(r);
    })
    .join("");
}

// infinit scroll by library infiniteScroll

// let infScroll = new InfiniteScroll(gallery, {
//   path: function () {
//     return `https://pixabay.com/api/?key=29692694-bb33da63923d9aeaf742e04ef&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pageIndex}&per_page=40`;
//   },

//   scrollThreshold: 200,
//   responseBody: "json",
//   // status: ".scroll-status",
//   status: ".page-load-status",
//   history: false,
//   checkLastPage: ".gallery__item",
// });

// infScroll.on("load", function (body) {
//   var itemsHTML = body.hits.map(getItemHTML).join("");
//   gallery.insertAdjacentHTML("beforeend", itemsHTML);
//   console.log(body);
//   // Notify.info(`Hooray! We found ${body.totalHits} new images.`);
//   simpleLightBox.refresh();
// });

// infScroll.on("request", function (path, fetchPromise) {
//   fetchPromise.then(console.log);
// });

// infScroll.on("last", function (body, path) {
//   Notify.info("We're sorry, but you've reached the end of search results.");
// });

// infScroll.on("error", function (error, path, response) {
//   console.log(error);
// });

// // generate html for library infiniteScroll

// function getItemHTML(body) {
//   return `<a class="gallery__item" href="${body.largeImageURL}">
//   <img
//     class="gallery__image"
//     src="${body.webformatURL}"
//     alt="${body.tags}"
//     loading="lazy"
//   />
//   <ul class="info">
//     <li class="info-item">
//       <p><b>Likes</b><br>${body.likes}</p>
//     </li>
//     <li class="info-item">
//       <p><b>Views</b><br>${body.views}</p>
//     </li>
//     <li class="info-item">
//       <p><b>Comments</b><br>${body.comments}</p>
//     </li>
//     <li class="info-item">
//       <p><b>Downloads</b><br>${body.downloads}</p>
//     </li>
//   </ul>
// </a>`;
// }

// function handleErrors(response) {
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response;
// }

// scroll to top

const scrollBtn = document.querySelector(".btn");
const btnVisibility = () => {
  if (window.scrollY > 400) {
    scrollBtn.style.visibility = "visible";
  } else {
    scrollBtn.style.visibility = "hidden";
  }
};
document.addEventListener("scroll", () => {
  btnVisibility();
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//smooth scroll

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
  // console.log(cardHeight);
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}
