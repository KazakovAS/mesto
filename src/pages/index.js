import './index.css';

import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm";

import {
  validationConfig,
  avatarEditPopupSelector,
  userInfoEditPopupSelector,
  userNicknameSelector,
  userDescriptionSelector,
  userAvatarSelector,
  userInfoEditButton,
  placesListSelector,
  placePhotoPopupSelector,
  placeAddPopupSelector,
  placeDeletePopupSelector,
  placeAddButton,
  userAvatarEditButton,
  api
} from "../scripts/utils/constants.js";

const formValidators = {};
let userId;

api.getProfile()
  .then(res => {
    userInfo.setUserInfo({
      name: res.name,
      about: res.about,
      avatar: res.avatar
    });

    userId = res._id;
  })
  .catch(console.error);

api.getInitialCards()
  .then(items => {
    items.forEach(data => {
      placesList.addItem({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      });
    })
  })
  .catch(console.error);

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
  const card = new Card(
    data,
    '#place-item',
    handleCardImageClick,
    (id) => {
      placeDeletePopup.open();
      placeDeletePopup.changeHandleSubmit(() => {
        api.deleteCard(id)
          .then(() => {
            card.removeCard();
            placeDeletePopup.close();
          })
          .catch(console.error);
      })
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            card.setLikeStatusDisabled();
            card.updateLikeCount(res.likes)
          })
          .catch(console.error);
      } else {
        api.addLike(id)
          .then((res) => {
            card.setLikeStatusEnabled();
            card.updateLikeCount(res.likes)
          })
          .catch(console.error);
      }
    }
  );

  return card.createCard();
}

function handleCardImageClick(image, title) {
  placePhotoPopup.open(image, title);
}

function handleUserInfoEditFormSubmit(data) {
  const name = data['user-nickname'];
  const about = data['user-description'];

  userInfoEditPopup.setSubmitButtonText('Сохранение...');

  api.editProfile(name, about)
    .then(() => {
      userInfo.setUserInfo({ name, about });
      userInfoEditPopup.close();
      userInfoEditPopup.setSubmitButtonText('Сохранить');
    })
    .catch(console.error);
}

function handlePlaceAddFormSubmit(data) {
  const name = data['place-name'];
  const link = data['place-image'];

  placeAddPopup.setSubmitButtonText('Сохранение...');

  api.addCard(name, link)
    .then((res) => {
      placesList.addItem({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      });

      placeAddPopup.close();
      placeAddPopup.setSubmitButtonText('Сохранить');
    })
    .catch(console.error);
}

function handleAvatarEditFormSubmit(data) {
  const avatar = data['avatar-image'];

  avatarEditPopup.setSubmitButtonText('Сохранение...');

  api.editAvatar(avatar)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      avatarEditPopup.close();
      avatarEditPopup.setSubmitButtonText('Сохранить');
    })
    .catch(console.error);
}

const placesList = new Section({
  items: [],
  renderer: renderCard
}, placesListSelector);
placesList.renderItems();

const placePhotoPopup = new PopupWithImage(placePhotoPopupSelector);
placePhotoPopup.setEventListeners();

const userInfo = new UserInfo({
  userNicknameSelector: userNicknameSelector,
  userDescriptionSelector: userDescriptionSelector,
  userAvatarSelector: userAvatarSelector
});

const userInfoEditPopup = new PopupWithForm(userInfoEditPopupSelector, handleUserInfoEditFormSubmit);
userInfoEditPopup.setEventListeners();

const placeAddPopup = new PopupWithForm(placeAddPopupSelector, handlePlaceAddFormSubmit);
placeAddPopup.setEventListeners();

const placeDeletePopup = new PopupWithForm(placeDeletePopupSelector);
placeDeletePopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(avatarEditPopupSelector, handleAvatarEditFormSubmit);
avatarEditPopup.setEventListeners();

userInfoEditButton.addEventListener('click', function () {
  const { name, about } = userInfo.getUserInfo();

  userInfoEditPopup.setInputValues({
    'user-nickname': name,
    'user-description': about
  });

  formValidators['user-info-edit-form'].resetErrors();

  userInfoEditPopup.open();
});

placeAddButton.addEventListener('click', function()  {
  formValidators['place-add-form'].resetErrors();

  placeAddPopup.open();
});

userAvatarEditButton.addEventListener('click', function() {
  avatarEditPopup.open();
})

enableValidation(validationConfig);
