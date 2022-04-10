import '../styles/pages/index.css';

import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Card from './components/Card.js';
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm";

import places from './places.js';
import {
  userInfoEditPopupSelector,
  userNicknameSelector,
  userDescriptionSelector,
  userInfoEditButton,
  userNicknameField,
  userDescriptionField,
  placesListSelector,
  placePhotoPopupSelector,
  placeAddPopupSelector,
  placeAddButton
} from "./constants.js";


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

function handleCardImageClick(image, title) {
  placePhotoPopup.open(image, title);
}

function handleUserInfoEditFormSubmit(data) {
  userInfo.setUserInfo({
    userNickname: data['user-nickname'],
    userDescription: data['user-description'],
  });

  userInfoEditPopup.close();
}

function handlePlaceAddFormSubmit(data) {
  const card = createCard({
    name: data['place-name'],
    image: data['place-image']
  });

  placesList.addItem(card);
  placeAddPopup.close();
}

const placesList = new Section({
  items: places,
  renderer: renderCard
}, placesListSelector);
placesList.renderItems();

const placePhotoPopup = new PopupWithImage(placePhotoPopupSelector);
placePhotoPopup.setEventListeners();

const userInfo = new UserInfo({
  userNicknameSelector: userNicknameSelector,
  userDescriptionSelector: userDescriptionSelector
});
userInfo.setUserInfo({
  userNickname: 'Жак-Ив Кусто',
  userDescription: 'Исследователь океана'
});

const userInfoEditPopup = new PopupWithForm(userInfoEditPopupSelector, handleUserInfoEditFormSubmit);
userInfoEditPopup.setEventListeners();

const placeAddPopup = new PopupWithForm(placeAddPopupSelector, handlePlaceAddFormSubmit);
placeAddPopup.setEventListeners();

userInfoEditButton.addEventListener('click', function () {
  const { userNickname, userDescription } = userInfo.getUserInfo();

  userNicknameField.value = userNickname;
  userDescriptionField.value = userDescription;

  formValidators['user-info-edit-form'].resetErrors();
  formValidators['user-info-edit-form'].checkSubmitButtonValidity();

  userInfoEditPopup.open();
});

placeAddButton.addEventListener('click', function()  {
  formValidators['place-add-form'].resetErrors();
  formValidators['place-add-form'].checkSubmitButtonValidity();

  placeAddPopup.open();
});

enableValidation(validationConfig);
