import '../styles/pages/index.css';

import FormValidator from './components/FormValidator.js';


const userInfoEditButton = document.querySelector('.user__info-edit-button');
const placeAddButton = document.querySelector('.profile__place-add-button');
const popups = document.querySelectorAll('.popup');
const placeAddPopup = document.querySelector('#place-add-popup');
const placeAddForm = placeAddPopup.querySelector('#place-add-form');
const placeNameField = placeAddForm.querySelector('#place-name-field');
const placeImageField = placeAddForm.querySelector('#place-image-field');

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

  return card.createCard();
}

function renderCard(data, container) {
  const card = createCard(data);

  container.prepend(card);
}



import Section from './components/Section.js';
import Card from './components/Card.js';
import places from './places.js';
import { placesListSelector } from "./constants.js";

const placesList = new Section({
  items: places,
  renderer: renderCard
}, placesListSelector);

placesList.renderItems();



import UserInfo from "./components/UserInfo.js";
import  { userNicknameSelector, userDescriptionSelector } from './constants.js';

const userInfo = new UserInfo({
  userNicknameSelector: userNicknameSelector,
  userDescriptionSelector: userDescriptionSelector
});

userInfo.setUserInfo({
  userNickname: 'Жак-Ив Кусто',
  userDescription: 'Исследователь океана'
});



import PopupWithImage from "./components/PopupWithImage.js";
const placePhotoPopupSelector = '#place-photo-popup';

const placePhotoPopup = new PopupWithImage(placePhotoPopupSelector);
placePhotoPopup.setEventListeners();

function handleCardImageClick(image, title) {
  placePhotoPopup.open(image, title);
}



import PopupWithForm from "./components/PopupWithForm";

const userInfoEditPopupSelector = '#user-info-edit-popup';

const userInfoEditPopup = new PopupWithForm(userInfoEditPopupSelector, handleSubmitForm);

userInfoEditPopup.setEventListeners();
userInfoEditButton.addEventListener('click', function () {
  userInfoEditPopup.open();
});

function handleSubmitForm(e) {
  e.preventDefault();

  userInfo.setUserInfo({
    userNickname: 'Жак-Ив Кусто',
    userDescription: 'Исследователь океана'
  });

  userInfoEditPopup.close();
}






function openProfilePopup(e) {
  // setUserInfoEditFormFieldValue();
  // openPopup(e);

  formValidators['user-info-edit-form'].resetErrors();
  formValidators['user-info-edit-form'].checkSubmitButtonValidity();
}

function openAddPlacePopup(e) {
  // openPopup(e);

  formValidators['place-add-form'].resetErrors();
  formValidators['place-add-form'].checkSubmitButtonValidity();
}

// function setPlacePopupData(title, image) {
//   placePopupImage.src = image;
//   placePopupImage.alt = title;
//   placePopupImageCaption.textContent = title;
// }

// userInfoEditForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//
//   // setTextValue(userNickname, userNicknameField.value);
//   // setTextValue(userDescription, userDescriptionField.value);
//
//   // closePopup();
// });


placeAddForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const place = {
    name: placeNameField.value,
    image: placeImageField.value
  }

  // renderCard('start', place);
  // closePopup();
});

placeAddButton.addEventListener('click', function () {
  formValidators['place-add-form'].resetForm();
  openAddPlacePopup(placeAddPopup);
});

popups.forEach(popup => {

})

enableValidation(validationConfig);

