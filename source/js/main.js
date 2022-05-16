import './menu.js';
import {showPopup} from './popup.js';

if (document.querySelector('.contacts__map')) {
  const MAP_NOJS_STYLE = 'contacts__map--nojs';
  const nodeMapArea = document.querySelector('.contacts__map');

  nodeMapArea.classList.remove(MAP_NOJS_STYLE);
}

if (document.querySelector('#addBasketModal')) {
  const arrModalButtons = document.querySelectorAll('.js__modal-button');

  for (let nodeModalButton of arrModalButtons) {
    nodeModalButton.addEventListener('click', () => showPopup('order'));
  }
}
