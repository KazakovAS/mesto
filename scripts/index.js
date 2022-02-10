const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');
const placesEl = document.querySelector('.places__list');
const userInfoEditButton = document.querySelector('.user__info-edit-button');
const placeAddButton = document.querySelector('.profile__place-add-button');
const popups = document.querySelectorAll('.popup');
const userInfoEditPopup = document.querySelector('#user-info-edit-popup');
const placeAddPopup = document.querySelector('#place-add-popup');

let places = [
  {
    name: 'Карачаевск',
    imagePath: './assets/images/karachaevsk.jpg',
    imageAlt: 'Фото Карачаевска'
  },
  {
    name: 'Гора Эльбрус',
    imagePath: './assets/images/elbrus.jpg',
    imageAlt: 'Фото Эльбруса'
  },
  {
    name: 'Домбай',
    imagePath: './assets/images/dombay.jpg',
    imageAlt: 'Фото Домбая'
  },
  {
    name: 'Карачаево-Черкессия',
    imagePath: './assets/images/karachaevsk.jpg',
    imageAlt: 'Фото Карачаевска'
  },
  {
    name: 'Гора Эльбрус',
    imagePath: './assets/images/elbrus.jpg',
    imageAlt: 'Фото Эльбруса'
  },
  {
    name: 'Домбай',
    imagePath: './assets/images/dombay.jpg',
    imageAlt: 'Фото Домбая'
  }
]

function setTextValue(item, value) {
  return item.textContent = `${value}`;
}

setTextValue(userNickname, 'Жак-Ив Кусто');
setTextValue(userDescription, 'Исследователь океана');


function fillPlaces() {
  for (const place of places) {
    placesEl.insertAdjacentHTML('beforeend', `
      <li class="places__item">
        <article class="place">
            <button
              class="place__remove-button"
              aria-label="Удалить место"
            >
            </button>
          <img
            class="place__image"
            src="${place.imagePath}"
            alt="${place.imageAlt}"
          >
          <div class="place__info">
            <h2 class="place__name">${place.name}</h2>
            <button
              class="place__like-button"
              aria-label="Нравится"
            >
            </button>
          </div>
        </article>
      </li>
    `)
  }
}

fillPlaces();


function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
  setUserInfoEditFormFieldValue();
}

userInfoEditButton.addEventListener('click', function () {
  openPopup(userInfoEditPopup);
});

placeAddButton.addEventListener('click', function () {
  openPopup(placeAddPopup);
});


function closePopup(e) {
  e.target.closest('.popup').classList.remove('popup_opened');
}

popups.forEach(popup => {
  popup.addEventListener('click', function (e) {
    if (e.target === popup) closePopup(e);
    if (e.target.classList.contains('popup__close-button')) closePopup(e);
  });
})



placesEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('place__like-button')) e.target.classList.toggle('place__like-button_active');
});



const userInfoEditForm = document.getElementById('user-info-edit-form');
const userNicknameField = document.getElementById('user-nickname-field');
const userDescriptionField = document.getElementById('user-description-field');

function setUserInfoEditFormFieldValue() {
  userNicknameField.value = userNickname.textContent;
  userDescriptionField.value = userDescription.textContent;
}

userInfoEditForm.addEventListener('submit', function (e) {
  e.preventDefault();

  setTextValue(userNickname, userNicknameField.value);
  setTextValue(userDescription, userDescriptionField.value);

  closePopup(e);
});
