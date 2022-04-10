export default class UserInfo {
  constructor({ userNicknameSelector, userDescriptionSelector }) {
    this._userNicknameElement = document.querySelector(userNicknameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      userNickname: this._userNicknameElement.textContent,
      userDescription: this._userDescriptionElement.textContent
    }
  }

  setUserInfo({ userNickname, userDescription }) {
    this._userNicknameElement.textContent = userNickname;
    this._userDescriptionElement.textContent = userDescription;
  }
}
