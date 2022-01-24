const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');
const placesEl = document.querySelector('.places__list');

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
    }
]

function setTextValue(item, value) {
    return item.textContent = `${value}`;
};

function fillPlaces() {
    for(const place of places) {
        placesEl.insertAdjacentHTML('beforeend', `
            <li class="places__item">
                <article class="place">
                    <img 
                        class="place__image"
                        src="${place.imagePath}"
                        alt="${place.imageAlt}"
                    >
                    <div class="place__info">
                        <h2 class="place__name">${place.name}</h2>
                        <button class="place__like-button"></button>
                    </div>
                </article>
            </li>
        `)
    }
};


setTextValue(userNickname,'Жак-Ив Кусто');
setTextValue(userDescription, 'Исследователь океана');

fillPlaces();