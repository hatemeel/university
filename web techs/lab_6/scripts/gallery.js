const images = [
  'https://images.unsplash.com/photo-1533422902779-aff35862e462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1543698910-a6e22f900282?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1576269574030-771c89878bbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1557823022-f60aa838a2e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1580566132937-d4e04c162727?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1544833021-2f0c8afb7fd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1549400517-1d690397806d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
];
let activeImageIndex;

const viewImage = document.querySelector('.gallery-view img');
const thumbnails = document.querySelector('.gallery-thumbnails');

const generateThumbnails = () => {
  let thumbnailsHTML = images
    .map((image, index) => {
      return `<img onclick="setActiveImage(${index})" src="${image}" alt="" class="shadow" />`;
    })
    .join('');
  thumbnails.innerHTML = thumbnailsHTML;
};
generateThumbnails();

const setActiveImage = (index = 0) => {
  activeImageIndex = index;
  viewImage.src = images[index];

  thumbnails
    .querySelectorAll('img')
    .forEach((el) => el.classList.remove('active'));
  thumbnails.querySelectorAll('img')[index].classList.add('active');
};
setActiveImage();

const prev = () => {
  const prevIndex =
    activeImageIndex > 0 ? activeImageIndex - 1 : images.length - 1;
  setActiveImage(prevIndex);
};

const next = () => {
  const nextIndex =
    activeImageIndex < images.length - 1 ? activeImageIndex + 1 : 0;
  setActiveImage(nextIndex);
};
