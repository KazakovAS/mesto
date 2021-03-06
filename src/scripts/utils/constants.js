import Api from "../components/Api";

export const placesListSelector = '.places__list';
export const userNicknameSelector = '.user__nickname-text';
export const userDescriptionSelector = '.user__description';
export const userAvatarSelector = '.user__avatar-image';
export const avatarEditPopupSelector = '#avatar-edit-popup';
export const placePhotoPopupSelector = '#place-photo-popup';
export const userInfoEditPopupSelector = '#user-info-edit-popup';
export const placeAddPopupSelector = '#place-add-popup';
export const placeDeletePopupSelector = '#place-delete-popup';

export const userAvatarEditButton = document.querySelector('.user__avatar-edit-button');
export const userInfoEditButton = document.querySelector('.user__info-edit-button');
export const placeAddButton = document.querySelector('.profile__place-add-button');

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_type_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_visible'
};

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020',
    'Content-Type': 'application/json'
  }
});
