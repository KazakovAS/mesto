export default class UserInfo {
  constructor({ userNicknameSelector, userDescriptionSelector }) {
    this._userNicknameElement = document.querySelector(userNicknameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._userNicknameElement.textContent,
      about: this._userDescriptionElement.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._userNicknameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
  }
}
