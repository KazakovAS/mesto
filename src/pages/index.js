import './index.css';

import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm";

import {
  places,
  validationConfig,
  userInfoEditPopupSelector,
  userNicknameSelector,
  userDescriptionSelector,
  userInfoEditButton,
  placesListSelector,
  placePhotoPopupSelector,
  placeAddPopupSelector,
  placeAddButton
} from "../scripts/utils/constants.js";

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

function renderCard(data) {
  const card = new Card(data, '#place-item', handleCardImageClick);

  return card.createCard();
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
  placesList.addItem({
    name: data['place-name'],
    image: data['place-image']
  });

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

  userInfoEditPopup.setInputValues({
    'user-nickname': userNickname,
    'user-description': userDescription
  });

  formValidators['user-info-edit-form'].resetErrors();

  userInfoEditPopup.open();
});

placeAddButton.addEventListener('click', function()  {
  formValidators['place-add-form'].resetErrors();

  placeAddPopup.open();
});

enableValidation(validationConfig);
