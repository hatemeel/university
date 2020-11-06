let animation;

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

// Task 4
function toggleOpacity(event) {
  const $target = $(event.target);

  $target
    .closest('.image-effects-container')
    .find('.image-effects-target')
    .toggleClass('opacity-50');
}

function onImageHover() {
  if (animation) {
    animation.restart();
  }

  animation = anime({
    targets: '.image-effects-target',
    translateX: function () {
      return 100;
    },
    translateY: function () {
      return 50;
    },
    scale: function (_, _, l) {
      return l + 0.25;
    },
    rotate: function () {
      return anime.random(-360, 360);
    },
    borderRadius: function () {
      return ['50%', anime.random(10, 35) + '%'];
    },
    duration: function () {
      return anime.random(1200, 1800);
    },
    delay: function () {
      return anime.random(0, 400);
    },
    direction: 'alternate',
  });
}

// Task 5
let tableHtml = '';
const tableStructure = Array(5)
  .fill(Array(4).fill(''))
  .map((tr, trIndex) => {
    tableHtml += '<tr>';
    tr.map((td, tdIndex) => {
      tableHtml += `<td>${trIndex + 1}:${tdIndex + 1}</td>`;
      return td;
    });
    tableHtml += '</tr>';
    return tr;
  });

$('.target-table tbody').html(tableHtml);

function markTable() {
  const $target = $('.target-table tbody');

  $target.find('tr').map((trIndex, tr) => {
    if ((trIndex + 1) % 2 === 0) {
      $(tr).addClass('bg-light');
    } else {
      $(tr).addClass('bg-secondary text-white');
    }

    if (trIndex === tableStructure.length - 1) {
      $($(tr).find('td')[tableStructure[0].length - 1]).addClass(
        'text-success'
      );
    }
  });
}

// Task 6
(async () => {
  $('[typeahead]').autocomplete({
    lookup: await fetch('https://restcountries.eu/rest/v2/all')
      .then((r) => r.json())
      .then((res) =>
        res.map(({ name }) => ({
          value: name,
        }))
      ),
    lookupLimit: 5,
    lookupFilter: (suggestion, query, queryLowerCase) => {
      return suggestion.value.toLowerCase().startsWith(queryLowerCase);
    },
    autoSelectFirst: true,
    orientation: 'auto',
  });
})();

// Helpers
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
