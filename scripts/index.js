const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');
const placesEl = document.querySelector('.places__list');
const placeItemTemplate = document.querySelector('#place-item').content;
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

const places = [
  {
    name: 'Карачаевск',
    link: './assets/images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './assets/images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './assets/images/dombay.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './assets/images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './assets/images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './assets/images/dombay.jpg'
  }
]

function setTextValue(item, value) {
  item.textContent = `${value}`;
}

function createPlaceCard(place) {
  const placeItemEl = placeItemTemplate.cloneNode(true);
  const placeLikeButton = placeItemEl.querySelector('.place__like-button');
  const placeRemoveButton = placeItemEl.querySelector('.place__remove-button');
  const placeImage = placeItemEl.querySelector('.place__image');
  const placeName = placeItemEl.querySelector('.place__name');

  placeName.textContent = place.name;
  placeImage.src = place.link;
  placeImage.alt = place.name;

  placeLikeButton.addEventListener('click', setLikeStatus);
  placeRemoveButton.addEventListener('click', removePlaceItem);
  placeImage.addEventListener('click', openPlacePopup);

  return placeItemEl;
}

function renderPlaceCard(place) {
  placesEl.prepend(createPlaceCard(place));
}

function fillPlaces() {
  for (const place of places) {
    renderPlaceCard(place);
  }
}

function setUserInfoEditFormFieldValue() {
  userNicknameField.value = userNickname.textContent;
  userDescriptionField.value = userDescription.textContent;
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
  openPopup(e);
  setUserInfoEditFormFieldValue();
}

function removePlaceItem(e) {
  e.target.closest('.places__item').remove();
}

function setLikeStatus(e) {
  e.target.classList.toggle('place__like-button_active');
}

function openPlacePopup(e) {
  setPlacePopupData(e);
  openPopup(placePhotoPopup);
}

function setPlacePopupData(e) {
  placePopupImage.src = e.target.src;
  placePopupImage.alt = e.target.alt;
  placePopupImageCaption.textContent = e.target.alt;
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
    link: placeImageField.value
  }

  renderPlaceCard(place);
  closePopup();
});

placeAddButton.addEventListener('click', function () {
  placeAddForm.reset();
  openPopup(placeAddPopup);
});

popups.forEach(popup => {
  popup.addEventListener('click', function (e) {
    if (e.target === popup) closePopup(e);
    if (e.target.classList.contains('popup__close-button')) closePopup(e);
  });
})

setTextValue(userNickname, 'Жак-Ив Кусто');
setTextValue(userDescription, 'Исследователь океана');
fillPlaces();



//////////////////////////////////////
function formSubmit(e) {
  e.preventDefault();
}

function setInputValid({ inputErrorClass, errorClass }, field, errorMessage) {
  console.log(errorMessage)
  field.classList.remove(inputErrorClass);
  errorMessage.classList.remove(errorClass);
}

function setInputInvalid({ inputErrorClass, errorClass }, field, errorMessage) {
  console.log(errorMessage)
  field.classList.add(inputErrorClass);

  errorMessage.textContent = field.validationMessage;
  errorMessage.classList.add(errorClass);
}

function checkInputValidity(rest, form, field) {
  const errorMessage = form.querySelector(`#error-${field.id}`);

  if (field.validity.valid) {
    console.log(form, errorMessage)
    setInputValid(rest, field, errorMessage);
  } else {
    setInputInvalid(rest, field, errorMessage);
  }
}

function disableSubmitButton(inactiveButtonClass, button) {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
}

function enableSubmitButton(inactiveButtonClass, button) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
}

function checkSubmitButtonValidity({ inactiveButtonClass }, form, button) {
  if (form.checkValidity()) {
    enableSubmitButton(inactiveButtonClass, button)
  } else {
    disableSubmitButton(inactiveButtonClass, button)
  }
}

function enableValidation({ formSelector, inputSelector, submitButtonSelector, ...rest }) {
  const form = document.querySelector(formSelector);
  const fields = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);

  form.addEventListener('submit', formSubmit);

  fields.forEach(field => {
    field.addEventListener('input', function() {
      checkInputValidity(rest, form, field, button);
      checkSubmitButtonValidity(rest, form, button);
    });
  });
}

enableValidation({
   formSelector: '.form',
   inputSelector: '.form__field',
   submitButtonSelector: '.form__submit',
   inactiveButtonClass: 'form__submit_type_disabled',
   inputErrorClass: 'form__field_type_error',
   errorClass: 'form__field-error_visible'
});
