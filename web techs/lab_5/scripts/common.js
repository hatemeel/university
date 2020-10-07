const menu = document.querySelector('.menu');

document.onclick = ({ target }) => {
  if (target.classList.contains('menu-link')) {
    const parent = target.closest('.menu-item');

    if (!parent.classList.contains('active')) {
      showMenuItem(parent);
    } else {
      hideMenuItem(parent);
    }
  } else {
    menu.querySelectorAll('.menu-item').forEach((el) => hideMenuItem(el));
  }
};

const showMenuItem = (target) => {
  target.classList.add('active');
};

const hideMenuItem = (target) => {
  target.classList.remove('active');
  target.querySelectorAll('.menu-item').forEach((el) => {
    el.classList.remove('active');
  });
};
