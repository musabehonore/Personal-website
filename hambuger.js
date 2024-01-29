document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.menubox');
  const nav = document.querySelector('.navigation3');

  hamburger.addEventListener('click', function () {
    if (nav.style.display === 'block') {
      // If the menu is currently visible, hide it with fadeOutMenu animation
      nav.style.animation = 'fadeOutMenu 0.5s ease-out';
      setTimeout(() => {
        nav.style.animation = '';
        nav.style.display = 'none';
      }, 500);
    } else {
      // If the menu is currently hidden, show it with fadeInMenu animation
      nav.style.animation = 'fadeInMenu 0.5s ease-out';
      setTimeout(() => {
        nav.style.animation = '';
      }, 500);
      nav.style.display = 'block';
    }

    // Adding the click animation to the hamburger icon
    hamburger.style.animation = 'scaleIn 0.3s ease-out';
    setTimeout(() => {
      hamburger.style.animation = '';
    }, 50);
  });
});