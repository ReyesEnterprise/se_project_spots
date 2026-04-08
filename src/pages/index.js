import "core-js/stable";
import "regenerator-runtime/runtime";
import "../pages/index.css";
import { setButtonText } from "../utils/helpers.js";

import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

//
// instant of API class
//

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "315cbc90-dc58-499d-9f13-3a755e826431",
    "Content-Type": "application/json",
  },
});

//
// calling get initial cards method
//

api
  .getAppInfo()
  .then(([cards, users]) => {
    console.log(cards, users);
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
    return users;
  })
  .then((users) => {
    profileNameElement.textContent = users.name;
    profileJobElement.textContent = users.about;
    profileAvatar.src = users.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

//
// profile  Variables
//

const editProfileModal = document.querySelector("#edit-profile-modal");

const profilecloseButton = editProfileModal.querySelector(".modal__close-btn");

const profileEditbutton = document.querySelector(".profile__edit-btn");

const newPostButton = document.querySelector(".profile__plus-btn");

const profileAvatar = document.querySelector(".profile__avatar");

const avatarModalBtn = document.querySelector(".profile__avatar-btn");

//
// Edit profile form Variables
//

const editProfileForm = editProfileModal.querySelector(".modal__form");

const nameInput = editProfileForm.querySelector("#profile-name-input");

const jobInput = editProfileForm.querySelector("#profile-description-input");

const profileNameElement = document.querySelector(".profile__name");

const profileJobElement = document.querySelector(".profile__description");

//
// add card form Variables
//

const addCardModal = document.querySelector("#add-card-modal");

const addCardCloseBtn = addCardModal.querySelector(".modal__close-btn");

const cardForm = addCardModal.querySelector(".modal__form");

const cardSubmitBtn = addCardModal.querySelector(".modal__submit-btn");

const cardLinkInput = addCardModal.querySelector("#add-card-link-input");

const cardNameInput = addCardModal.querySelector("#add-card-caption-input");

//
// Template variables
//

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

//
//  preview Modal Variables
//

const previewModal = document.querySelector("#preview-modal");

const previewModalImg = previewModal.querySelector(".modal__img");

const previewModalCaption = previewModal.querySelector(".modal__caption");

const closePreviewBtn = previewModal.querySelector(".modal__close-btn_preview");

//
// Avatar Modal/ button  Variables
//

const avatarModal = document.querySelector("#avatar-modal");
const avatarModalForm = avatarModal.querySelector(".modal__form");
const avatarsubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

//
// Delete form Variables
//

const deleteModal = document.querySelector("#delete__card-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

//
// Id veriables
//

let selectedCard, selectedCardId;

//
// close Overlay functions
//

const setModalCloseListeners = () => {
  const modalList = Array.from(document.querySelectorAll(".modal"));
  modalList.forEach((modalElement) => {
    modalElement.addEventListener("click", (e) => {
      if (
        e.target === modalElement ||
        e.target.classList.contains("modal__close-btn") ||
        e.target.classList.contains("modal__cancel-btn")
      ) {
        closeModal(modalElement);
      }
    });
  });
};

setModalCloseListeners();

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

//
// open / close functions
//

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeEsc);
}

//
// Edit form handle functions
//

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: nameInput.value,
      about: jobInput.value,
    })
    .then((data) => {
      console.log(data.likes);
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

//
// add card form handle functions
//

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .createCard({
      name: cardNameInput.value,
      link: cardLinkInput.value,
    })
    .then((data) => {
      const cardEl = getCardElement(data);
      cardsList.prepend(cardEl);

      evt.target.reset();
      disableButton(cardSubmitBtn, settings);
      closeModal(addCardModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

//
// Avatar submit form handle functions
//

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .avatarInfo({
      avatar: avatarInput.value,
    })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);

      evt.target.reset();
      disableButton(cardSubmitBtn, settings);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

//
// Delete form handle functions
//

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false, "Delete", "Deleting...");
    });
}

//
// handle Delete card function
//

function handleCardDelete(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;

  openModal(deleteModal);
}

//
// handle like card function
//

function handleLike(evt, id) {
  const likeBtn = evt.target;

  const isLiked = likeBtn.classList.contains("card__like-btn-liked");

  api
    .handleLike(id, isLiked)
    .then(() => {
      likeBtn.classList.toggle("card__like-btn-liked");
    })
    .catch(console.error);
}

//
// Template functions
//

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");
  const cardLikedBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete_btn");

  if (data.isLiked) {
    cardLikedBtn.classList.add("card__like-btn-liked");
  }

  cardNameEl.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;

  cardLikedBtn.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  cardDeleteBtn.addEventListener("click", () => {
    handleCardDelete(cardElement, data._id);
  });

  cardImg.addEventListener("click", () => {
    previewModalImg.src = data.link;
    previewModalImg.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

//
// Event Listeners
//

profileEditbutton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  resetValidation(editProfileForm, [nameInput, jobInput], settings);
  openModal(editProfileModal);
});

newPostButton.addEventListener("click", () => {
  openModal(addCardModal);
});

//
// Event form Listeners
//

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

avatarModalForm.addEventListener("submit", handleAvatarSubmit);

cardForm.addEventListener("submit", handleCardFormSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
