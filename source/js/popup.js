const HIDE_CLASS = 'visually-hidden';
const ORDER_FORM_POPUP_AREA = 'form-modal';

const createPopupElements = () => {
  if (!document.querySelector('.form-modal')) {
    const templateBasketNode = document.querySelector('#addBasketModal').content.cloneNode(true);
    document.body.appendChild(templateBasketNode);
    const addBasketModalNode = document.querySelector('.form-modal');
    return {order: addBasketModalNode};
  }
};

const popups = createPopupElements();

const getOpenPopup = () => {
  for (const element in popups) {
    if (!popups[element].classList.contains(HIDE_CLASS)) {
      return popups[element];
    }
  }
  return false;
};

function hidePopup() {
  if (getOpenPopup()) {
    const popupArea = getOpenPopup();
    popupArea.classList.add(HIDE_CLASS);
  }
}

function onPopupEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hidePopup();
  }
}

const showPopup = (popUpType) => {
  const popupArea = popups[popUpType];
  popupArea.classList.remove(HIDE_CLASS);
  document.addEventListener('keydown', onPopupEscKeydown, {once: true});
  popupArea.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(ORDER_FORM_POPUP_AREA)) {
      hidePopup();
    }
  });
};

export {showPopup, hidePopup};
