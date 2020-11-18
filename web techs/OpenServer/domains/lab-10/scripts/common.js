// menu
(() => {
  const menu = document.querySelector('nav .menu');

  menu.onmouseleave = () => {
    hideAllItems();
  };

  menu.onmouseover = ({ target }) => {
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
        hideAllItems();
        menuItem.classList.add('active');
      }
    } else {
      hideAllItems();
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
          sub: [
            {
              title: 'Integrated',
              link: 'calculator.html',
            },
            {
              title: 'Desmos',
              link: 'https://www.desmos.com/scientific',
              blank: true,
            },
            {
              title: 'Online Calculator',
              link: 'https://www.online-calculator.com/',
              blank: true,
            },
            {
              title: 'Calculator.com',
              link: 'https://calculator.com/',
              blank: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Test',
      sub: [
        {
          title: 'My test',
          link: 'test.html',
        },
        {
          title: 'Some item 1',
          sub: [
            {
              title: 'Sub item 1',
              link: 'https://google.com',
              blank: true,
            },
            {
              title: 'Sub item 2',
              link: 'https://google.com',
              blank: true,
            },
            {
              title: 'Sub item 3',
              link: 'https://google.com',
              blank: true,
            },
          ],
        },
        {
          title: 'Some item 2',
          sub: [
            {
              title: 'Sub item 1',
              link: 'https://google.com',
              blank: true,
            },
            {
              title: 'Sub item 2',
              link: 'https://google.com',
              blank: true,
            },
            {
              title: 'Sub item 3',
              link: 'https://google.com',
              blank: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Google Services',
      sub: [
        {
          title: 'Compute Engine',
          link: 'https://cloud.google.com/compute',
          blank: true,
        },
        {
          title: 'Cloud Storage',
          link: 'https://cloud.google.com/storage',
          blank: true,
        },
        {
          title: 'Cloud SDK',
          link: 'https://cloud.google.com/sdk',
          blank: true,
        },
      ],
    },
    {
      title: 'Gallery',
      link: 'gallery.html',
    },
    {
      title: 'JQuery tasks',
      link: 'jquery-tasks.html',
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
						<a href="${item.link}" ${item.blank ? 'target="_blank"' : ''} class="menu-link">
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

  function hideAllItems() {
    menu
      .querySelectorAll('.menu-item')
      .forEach((el) => el.classList.remove('active'));
  }
})();

// auth controls
(() => {
  const authControlsWrapper = document.querySelector('nav .auth-controls');
  const isLoggedIn = !!localStorage.getItem('auth-token');

  if (isLoggedIn) {
    authControlsWrapper.innerHTML = `
			<span onclick="signOut()" class="menu-link">
				<i class="ri-logout-circle-line"></i>
				<span class="ml-2">Sign Out</span>
			</span>
		`;
  } else {
    authControlsWrapper.innerHTML = `
			<a href="./login.html" class="menu-link">
				<i class="ri-login-circle-line"></i>
				<span class="ml-2">Sign In</span>
			</a>
			<a href="./register.html" class="menu-link">
				<i class="ri-user-add-line"></i>
				<span class="ml-2">Sign Up</span>
			</a>
		`;
  }
})();

function signOut() {
  localStorage.removeItem('auth-token');
  location.reload();
}
