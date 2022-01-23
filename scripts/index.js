const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');

setTextValue(userNickname,'Жак-Ив Кусто');
setTextValue(userDescription, 'Исследователь океана');


function setTextValue(item, value) {
    return item.textContent = `${value}`;
}