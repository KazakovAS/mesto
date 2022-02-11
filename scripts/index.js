const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');
const placesEl = document.querySelector('.places__list');
const userInfoEditButton = document.querySelector('.user__info-edit-button');
const placeAddButton = document.querySelector('.profile__place-add-button');
const popups = document.querySelectorAll('.popup');
const userInfoEditPopup = document.querySelector('#user-info-edit-popup');
const placeAddPopup = document.querySelector('#place-add-popup');
const placePhotoPopup = document.querySelector('#place-photo-popup');
const placePopupImage = document.querySelector('.place-popup__image');
const placePopupImageCaption = document.querySelector('.place-popup__caption');

let places = [
  {
    id: createUUID(),
    name: 'Карачаевск',
    imagePath: './assets/images/karachaevsk.jpg',
    imageAlt: 'Фото Карачаевска'
  },
  {
    id: createUUID(),
    name: 'Гора Эльбрус',
    imagePath: './assets/images/elbrus.jpg',
    imageAlt: 'Фото Эльбруса'
  },
  {
    id: createUUID(),
    name: 'Домбай',
    imagePath: './assets/images/dombay.jpg',
    imageAlt: 'Фото Домбая'
  },
  {
    id: createUUID(),
    name: 'Карачаево-Черкессия',
    imagePath: './assets/images/karachaevsk.jpg',
    imageAlt: 'Фото Карачаевска'
  },
  {
    id: createUUID(),
    name: 'Гора Эльбрус',
    imagePath: './assets/images/elbrus.jpg',
    imageAlt: 'Фото Эльбруса'
  },
  {
    id: createUUID(),
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
    addPlace(place);
  }
}

function addPlace(place) {
  placesEl.insertAdjacentHTML('afterbegin', `
    <li class="places__item" data-id="${place.id}">
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

fillPlaces();


function openPopup(popupEl) {
  popupEl.classList.remove('popup_closed');
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
  const popup = e.target.closest('.popup');

  popup.classList.add('popup_closed');
  popup.classList.remove('popup_opened');
}

popups.forEach(popup => {
  popup.addEventListener('click', function (e) {
    if (e.target === popup) closePopup(e);
    if (e.target.classList.contains('popup__close-button')) closePopup(e);
  });
})


placesEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('place__like-button')) e.target.classList.toggle('place__like-button_active');

  if (e.target.classList.contains('place__remove-button')) {
    const item = e.target.closest('.places__item');

    places.splice(findItemPosition(item), 1);
    item.remove();
  }

  if (e.target.classList.contains('place__image')) {
    const item = places[findItemPosition(e.target)];

    placePopupImage.src = item.imagePath;
    placePopupImage.alt = item.imageAlt;
    placePopupImageCaption.textContent = item.name;
    openPopup(placePhotoPopup);
  }
});

function findItemPosition(e) {
  const item = e.closest('.places__item');
  const itemId = item.dataset.id;

  return places.findIndex(e => e.id === itemId);
}


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

const placeAddForm = document.getElementById('place-add-form');
const placeName = document.getElementById('place-name-field');
const placeImage = document.getElementById('place-image-field');

placeAddForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const place = {
    id: createUUID(),
    name: placeName.value,
    imagePath: placeImage.value,
    imageAlt: `Фото ${ placeName.value }`
  }

  places.unshift(place);

  addPlace(place);
  closePopup(e);
});

function createUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

