// Task 1
$('[collapse-toggle]').on('click', (e) => {
  $(e.target).closest('[collapse]').find('[collapse-content]').slideToggle(150);
});

function toggleBold({ target }) {
  $(target).offsetParent().toggleClass('font-weight-bold');
}

function changeColor({ target }) {
  $(target).offsetParent().css('color', getRandomColor());
}

function resetStyles({ target }) {
  $(target)
    .offsetParent()
    .removeClass('font-weight-bold')
    .css('color', 'initial');
}

// Task 2
function increase(event, reverse = false) {
  event.preventDefault();
  const $target = $(event.target);
  const currentSize = parseFloat($target.css('width'), 10);
  const newSize = reverse ? currentSize / 1.5 : currentSize * 1.5;
  $target.css('width', `${newSize}px`).css('height', `${newSize}px`);
}

// Task 3
function move(event, reverse = false) {
  event.preventDefault();
  const $target = $(event.target);
  const currentMargin = parseFloat($target.css('margin-top'), 10);
  const newMargin = reverse ? currentMargin - 10 : currentMargin + 10;
  $target
    .css('margin-top', `${newMargin >= 0 ? newMargin : 0}px`)
    .css('margin-left', `${newMargin >= 0 ? newMargin : 0}px`);
}

// Helpers
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
