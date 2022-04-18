export default class UserInfo {
  constructor({ userNicknameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._userNicknameElement = document.querySelector(userNicknameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNicknameElement.textContent,
      about: this._userDescriptionElement.textContent
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userNicknameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
    this._userAvatarElement.src = avatar;
  }

  setAvatar(url) {
    this._userAvatarElement.src = url;
  }
}
