const menu = document.querySelector('.menu');

document.onclick = ({ target }) => {
  if (target.classList.contains('menu-link')) {
    const menuItem = target.closest('.menu-item');
    const menuSub = menuItem.closest('.menu-sub');

    if (menuItem.classList.contains('active')) {
      menuItem.classList.remove('active');
      return;
    }

    if (menuSub) {
      menuSub.querySelectorAll('.menu-item').forEach((el) => {
        if (el.isSameNode(menuItem)) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    } else {
      menu
        .querySelectorAll('.menu-item')
        .forEach((el) => el.classList.remove('active'));
      menuItem.classList.add('active');
    }
  } else {
    menu
      .querySelectorAll('.menu-item')
      .forEach((el) => el.classList.remove('active'));
  }
};

const menuItems = [
  {
    title: 'Calculations',
    sub: [
      {
        title: 'Figures Calculations',
        sub: [
          {
            title: 'Square Area',
            link: 'calculations.html?type=square_area',
          },
          {
            title: 'Circle Area',
            link: 'calculations.html?type=circle_area',
          },
          {
            title: 'Triangle Area',
            link: 'calculations.html?type=triangle_area',
          },
          {
            title: 'Circle Length',
            link: 'calculations.html?type=circle_length',
          },
          {
            title: 'Sphere Volume',
            link: 'calculations.html?type=sphere_volume',
          },
        ],
      },
      {
        title: 'Calculator',
        link: 'calculator.html',
      },
    ],
  },
  {
    title: 'Test',
    link: 'test.html',
  },
];

menu.innerHTML = menuItems
  .map((item) => getMenuItemHTML(item))
  .join('')
  .trim();

function getMenuItemHTML(item) {
  let html = `
	<div class="menu-item">
		${
      !item.link
        ? `
					<div class="menu-link">
						${item.title}
						${item.sub && item.sub.length ? '<i class="ri-arrow-down-s-line"></i>' : ''}
					</div>
				`
        : `
					<a href="${item.link}" class="menu-link">
						${item.title}
						${item.sub && item.sub.length ? '<i class="ri-arrow-down-s-line"></i>' : ''}
					</a>
				`
    }
	`;

  if (item.sub && item.sub.length) {
    html += `<div class="menu-sub">`;
    item.sub.map((subitem) => {
      html += getMenuItemHTML(subitem);
    });
    html += `</div></div>`;
  } else {
    html += `
		</div>
		`;
  }

  return html;
}
