import './menu.js';
import {showPopup} from './popup.js';

if (document.querySelector('#addBasketModal')) {
  const arrModalButtons = document.querySelectorAll('.js__modal-button');

  for (let nodeModalButton of arrModalButtons) {
    nodeModalButton.addEventListener('click', () => showPopup('order'));
  }
}
