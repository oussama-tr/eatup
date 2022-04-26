let menuList = document.getElementById('nav-list');

const mediaQuery = window.matchMedia('(max-width: 43.75em)');

const loginListItem = document.createElement('li');
loginListItem.className = 'nav__item';
const loginLink = document.createElement('a');
const loginText = document.createTextNode('Log In');
loginLink.setAttribute('href', '#');
loginLink.setAttribute('id', 'login-link');
loginLink.appendChild(loginText);
loginListItem.appendChild(loginLink);

const registerListItem = document.createElement('li');
registerListItem.className = 'nav__item';
const registerLink = document.createElement('a');
const registerText = document.createTextNode('Register');
registerLink.setAttribute('href', '#');
registerLink.setAttribute('id', 'register-link');
registerLink.appendChild(registerText);
registerListItem.appendChild(registerLink);

function handleMediaChange(e) {
  if (e.matches) {
    menuList.classList.add('nav--hidden');
    menuList.classList.add('nav--grid');
    menuList.appendChild(loginListItem);
    menuList.appendChild(registerListItem);
  } else {
    menuList.classList.remove('nav--hidden');
    menuList.classList.remove('nav--grid');
    if ($('#nav-list').find('#register-link').length > 0)
      menuList.removeChild(menuList.lastChild);
    if ($('#nav-list').find('#login-link').length > 0)
      menuList.removeChild(menuList.lastChild);
    //$('#login-link').remove();
    //$('#register-link').remove();
    document.getElementById('nav-toggle').checked = false;
  }
}

// Register event listener
mediaQuery.addListener(handleMediaChange);

// Initial check
handleMediaChange(mediaQuery);

function toggleMenu() {
  if (menuList.classList.contains('nav--hidden')) {
    menuList.classList.remove('nav--hidden');
  } else {
    menuList.classList.add('nav--hidden');
  }
}
