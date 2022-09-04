export * from "./css/styles.css";
export * from "./css/modern-normalize.css";
// export * from "";
// const search = require("svg-inline-loader?classPrefix!./logo_two.svg");
import metroMap from "./svg/sprite.svg";

// import { Notify } from "notiflix/build/notiflix-notify-aio";
// import debounce from "lodash/debounce";
import cards from "./template/cards.handlebars";
import SimpleLightbox from "simplelightbox";
import InfiniteScroll from "infinite-scroll";
export * from "./css/simple-lightbox.css";
// import compiledTemplatemany from "./template/markup-many.handlebars";
import { getCard } from "./js/fetchCard";
import ImageApiService from "./js/fetchCard";
// import { getCacheDir } from "gh-pages";

const gallery = document.querySelector(".gallery");
const form = document.querySelector("#search-form");
form.addEventListener("submit", onSearch);
form.elements[1].style.background = `url(${metroMap})`;

const imageApiService = new ImageApiService();
function onSearch(e) {
  e.preventDefault();
  imageApiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  //   getCard(searchQuery)
  llll();
}
const gal = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});
// window.addEventListener("scroll", function () {
//   var scrollHeight = document.documentElement.scrollHeight;
//   var scrollTop = document.documentElement.scrollTop;
//   var clientHeight = document.documentElement.clientHeight;

//   if (scrollTop + clientHeight > scrollHeight - 5) {
//     llll()
//   }
// });
// // ===== Scroll to Top ====
// $(window).scroll(function() {
//     if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
//         $('#return-to-top').fadeIn(200);    // Fade in the arrow
//     } else {
//         $('#return-to-top').fadeOut(200);   // Else fade out the arrow
//     }
// });
// $('#return-to-top').click(function() {      // When arrow is clicked
//     $('body,html').animate({
//         scrollTop : 0                       // Scroll to top of body
//     }, 500);
// });
let elem = document.querySelector(".gallery");
let infScroll = new InfiniteScroll(elem, {
  // options
    path: 'https://pixabay.com/api',
  append: ".post",
  history: false,
});

// // element argument can be a selector string
// //   for an individual element
// let infScroll = new InfiniteScroll(".container", {
//   // options
// });

function llll() {
  imageApiService
    .fetchImage()
    .then((r) => r.data.hits)
    .then((r) => {
      const loll = r
        .map((r) => {
          const lol = cards(r);
          //  console.log(lol);
          return lol;
        })
        .join("");
      // console.log(loll);
      return loll;
    })
    .then((r) => {
      gallery.insertAdjacentHTML("beforeend", r);
      gal.refresh();
    });
}
