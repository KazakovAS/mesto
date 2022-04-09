export default class UserInfo {
  constructor({ userNicknameSelector, userDescriptionSelector }) {
    this._userNicknameSelector = document.querySelector(userNicknameSelector);
    this._userDescriptionSelector = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      userNickname: this._userNicknameSelector.textContent,
      userDescription: this._userDescriptionSelector.textContent
    }
  }

  setUserInfo({ userNickname, userDescription }) {
    this._userNicknameSelector.textContent = userNickname;
    this._userDescriptionSelector.textContent = userDescription;
  }
}
