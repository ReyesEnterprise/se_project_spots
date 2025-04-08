/* 

                                           Arrays  

*/

const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "  https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

/* 

                                     profile  Variables   

*/
const editProfileModal = document.querySelector("#edit-profile-modal");

const profilecloseButton = editProfileModal.querySelector(".modal__close-btn");

const profileEditbutton = document.querySelector(".profile__edit-btn");

const newPostButton = document.querySelector(".profile__plus-btn");

/* 

                                     Edit profile form Variables   

*/

const editProfileForm = editProfileModal.querySelector(".modal__form");

const nameInput = editProfileForm.querySelector("#profile-name-input");

const jobInput = editProfileForm.querySelector("#profile-discription-input");

const profileNameElement = document.querySelector(".profile__name");

const profileJobElement = document.querySelector(".profile__discription");

/* 

                                     add card form Variables   

*/
const addCardModal = document.querySelector("#add-card-modal");

const addCardCloseBtn = addCardModal.querySelector(".modal__close-btn");

const cardForm = addCardModal.querySelector(".modal__form");

const cardSubmitBtn = addCardModal.querySelector(".modal__submit-btn");

const cardLinkInput = addCardModal.querySelector("#add-card-link-input");

const cardNameInput = addCardModal.querySelector("#add-card-caption-input");

/* 

                                      Template variables 

*/

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

/* 

                                      preview Modal Variables   

*/

const previewModal = document.querySelector("#preview-modal");

const previewModalImg = previewModal.querySelector(".modal__img");

const previewModalCaption = previewModal.querySelector(".modal__caption");

const closePreviewBtn = previewModal.querySelector(".modal__close-btn_preview");

/* 

                                        close Overlay functions  

*/

const closeOverlay = () => {
  const modalList = Array.from(document.querySelectorAll(".modal"));
  modalList.forEach((modalElement) => {
    modalElement.addEventListener("click", (e) => {
      if (
        e.target === modalElement ||
        e.target.classList.contains("modal__close-btn")
      ) {
        closeModal(modalElement);
      }
    });
  });
};

closeOverlay();

// closeOverlay  with escape key

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

//   event listener for the escape key

document.addEventListener("keydown", closeEsc);

/* 



                                        open / close functions  

*/

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

/* 

                                          Edit form handle functions  

*/

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;

  profileJobElement.textContent = jobInput.value;

  closeModal(editProfileModal);
}

/* 

                                        add card form handle functions  

*/

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardEl = getCardElement(inputValues);
  cardsList.prepend(cardEl);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);
  closeModal(addCardModal);
}

/* 

                                          Template functions   

*/

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");
  const cardLikedBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete_btn");

  cardNameEl.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;

  cardLikedBtn.addEventListener("click", () => {
    cardLikedBtn.classList.toggle("card__like-btn-liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImg.addEventListener("click", () => {
    previewModalImg.src = data.link;
    previewModalImg.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

/* 

                                         For loops for template  

*/

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
  console.log(cardsList);
});

/* 

                                            Event Listeners  

*/

profileEditbutton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  resetValidation(editProfileForm, [nameInput, jobInput], settings);
  openModal(editProfileModal);
});

// profilecloseButton.addEventListener("click", () => {
//   closeModal(editProfileModal);
// });

newPostButton.addEventListener("click", () => {
  openModal(addCardModal);
});

// addCardCloseBtn.addEventListener("click", () => {
//   closeModal(addCardModal);
// });

// closePreviewBtn.addEventListener("click", () => {
//   closeModal(previewModal);
// });

/* 

                                            Event form Listeners  

*/

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

cardForm.addEventListener("submit", handleCardFormSubmit);
