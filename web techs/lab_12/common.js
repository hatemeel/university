const title = document.querySelector('[data-name]');
const menu = document.querySelector('[data-menu]');
const grid = document.querySelector('[data-grid]');
const maxOffset = 100;

const titleOpts = {
  x: 320,
  y: -155,
};

const menuOpts = {
  y: -130,
};

grid.onscroll = () => {
  const offset = grid.scrollTop;

  titleOpts.x = 320 - (320 / maxOffset) * offset;
  titleOpts.y = -155 - (-155 / maxOffset) * offset;
  menuOpts.y = -130 - (-130 / maxOffset) * offset;

  title.style.transform = `translate(${toMin(titleOpts.x)}px, ${toMax(
    titleOpts.y
  )}px)`;
  menu.style.transform = `translateY(${toMax(menuOpts.y)}px)`;
};

function toMin(value, min = 0) {
  return value >= min ? value : min;
}

function toMax(value, max = 0) {
  return value <= max ? value : max;
}

(() => {
  new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: 600,
    autoplay: {
      delay: 10000,
    },
  });
})();
