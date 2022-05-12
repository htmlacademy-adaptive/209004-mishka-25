import './menu.js';
import {showPopup} from './popup.js';

const nodeModalButton = document.querySelector('.jsModalButton');

nodeModalButton.addEventListener('click', () => showPopup('order'));
