import './styles/pages/index.css';

import places from './scripts/data.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';

const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');
const userInfoEditButton = document.querySelector('.user__info-edit-button');
const placeAddButton = document.querySelector('.profile__place-add-button');
const popups = document.querySelectorAll('.popup');
const userInfoEditPopup = document.querySelector('#user-info-edit-popup');
const userInfoEditForm = userInfoEditPopup.querySelector('#user-info-edit-form');
const userNicknameField = userInfoEditForm.querySelector('#user-nickname-field');
const userDescriptionField = userInfoEditForm.querySelector('#user-description-field');
const placeAddPopup = document.querySelector('#place-add-popup');
const placeAddForm = placeAddPopup.querySelector('#place-add-form');
const placeNameField = placeAddForm.querySelector('#place-name-field');
const placeImageField = placeAddForm.querySelector('#place-image-field');
const placePhotoPopup = document.querySelector('#place-photo-popup');
const placePopupImage = placePhotoPopup.querySelector('.popup__image');
const placePopupImageCaption = placePhotoPopup.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_type_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_visible'
};

const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('id');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function createCard(data) {
  const card = new Card(data, '#place-item', handleCardImageClick);

  return card;
}

function renderCard(position, data) {
  const placesEl = document.querySelector('.places__list');

  if (position === 'start') placesEl.prepend(createCard(data).createCard());
  else placesEl.append(createCard(data).createCard());
}

function fillPlaces() {
  for (const place of places) {
    renderCard('start', place);
  }
}

function setUserInfoEditFormFieldValue() {
  userNicknameField.value = userNickname.textContent;
  userDescriptionField.value = userDescription.textContent;
}

function setTextValue(item, value) {
  item.textContent = `${value}`;
}

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup() {
  const popup = document.querySelector('.popup_opened');

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

function closePopupByEscape(e) {
  if (e.key === 'Escape') closePopup();
}

function openProfilePopup(e) {
  setUserInfoEditFormFieldValue();
  openPopup(e);

  formValidators['user-info-edit-form'].resetErrors();
  formValidators['user-info-edit-form'].checkSubmitButtonValidity();
}

function openAddPlacePopup(e) {
  openPopup(e);

  formValidators['place-add-form'].resetErrors();
  formValidators['place-add-form'].checkSubmitButtonValidity();
}

function handleCardImageClick(title, image) {
  setPlacePopupData(title, image);
  openPopup(placePhotoPopup);
}

function setPlacePopupData(title, image) {
  placePopupImage.src = image;
  placePopupImage.alt = title;
  placePopupImageCaption.textContent = title;
}

userInfoEditForm.addEventListener('submit', function (e) {
  e.preventDefault();

  setTextValue(userNickname, userNicknameField.value);
  setTextValue(userDescription, userDescriptionField.value);

  closePopup();
});

userInfoEditButton.addEventListener('click', function () {
  openProfilePopup(userInfoEditPopup);
});

placeAddForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const place = {
    name: placeNameField.value,
    image: placeImageField.value
  }

  renderCard('start', place);
  closePopup();
});

placeAddButton.addEventListener('click', function () {
  formValidators['place-add-form'].resetForm();
  openAddPlacePopup(placeAddPopup);
});

popups.forEach(popup => {
  popup.addEventListener('click', function (e) {
    if (e.target === popup) closePopup();
    if (e.target.classList.contains('popup__close-button')) closePopup();
  });
})

setTextValue(userNickname, 'Жак-Ив Кусто');
setTextValue(userDescription, 'Исследователь океана');
fillPlaces();
enableValidation(validationConfig);

