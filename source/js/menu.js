const NOJS_STYLE = 'page-header__menu-area--nojs';
const MENU_CLOSED_STYLE = 'page-header__menu-area--closed';
const MENU_BUTTON_CLOSE_STYLE = 'page-header__toogle--close';
const nodeButtonMenu = document.querySelector('.page-header__toogle');
const nodeMenuArea = document.querySelector('.page-header__menu-area');

nodeMenuArea.classList.remove(NOJS_STYLE);
nodeMenuArea.classList.add(MENU_CLOSED_STYLE);

nodeButtonMenu.addEventListener('click', () => {
  nodeMenuArea.classList.toggle(MENU_CLOSED_STYLE);
  nodeButtonMenu.classList.toggle(MENU_BUTTON_CLOSE_STYLE);
});
