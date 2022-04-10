export const placesListSelector = '.places__list';
export const userNicknameSelector = '.user__nickname-text';
export const userDescriptionSelector = '.user__description';
export const placePhotoPopupSelector = '#place-photo-popup';
export const userInfoEditPopupSelector = '#user-info-edit-popup';
export const placeAddPopupSelector = '#place-add-popup';

export const userInfoEditButton = document.querySelector('.user__info-edit-button');
export const placeAddButton = document.querySelector('.profile__place-add-button');

const karachaevskImage = new URL('../../assets/images/karachaevsk.jpg', import.meta.url);
const elbrusImage = new URL('../../assets/images/elbrus.jpg', import.meta.url);
const dombayImage = new URL('../../assets/images/dombay.jpg', import.meta.url);

export const places = [
  {
    name: 'Карачаевск',
    image: karachaevskImage
  },
  {
    name: 'Гора Эльбрус',
    image: elbrusImage
  },
  {
    name: 'Домбай',
    image: dombayImage
  },
  {
    name: 'Карачаево-Черкессия',
    image: karachaevskImage
  },
  {
    name: 'Гора Эльбрус',
    image: elbrusImage
  },
  {
    name: 'Домбай',
    image: dombayImage
  }
];

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_type_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_visible'
};
