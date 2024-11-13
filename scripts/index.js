//
// arrays
//

const initialCards = [
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

//
// variables
//

const profileEditbutton = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-profile-modal");

const closeButton = editModal.querySelector(".modal__close-btn");

//
// form variables
//

const editProfileForm = editModal.querySelector(".modal__form");

const nameInput = editProfileForm.querySelector("#profile-name-input");

const jobInput = editProfileForm.querySelector("#profile-discription-input");

const profileNameElement = document.querySelector(".profile__name");

const profileJobElement = document.querySelector(".profile__discription");

//
// template variables
//

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

//
// functions
//

function openModal() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

//
// form function
//

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;

  profileJobElement.textContent = jobInput.value;

  closeModal();
}

//
// template function
//

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  // question - why dont i have to do const cardElement = cardTemplate.querySelector(".card") then add .content and .querySelector(".card")  .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");

  // question - was expection to use something like this
  // userElement.querySelector(".user__avatar").src = "path/to/image.jpg";
  // userElement.querySelector(".user__name").textContent = "Duke, mayor of Cormorant";

  cardNameEl.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;
  // question
  // - how does the data that is passed her from the object not get all misked up and put in the wrong order , is it because of the "const cardElement = getCardElement(initialCards[i]);"
  // also not sure how to pass the alt text since there is no alt object in the array do i need to add one ?
  return cardElement;

  // question
  // i was getting an error for a while because i didnt have the retun function im guessing its needed , but why ?
}

//
// event listeners
//

profileEditbutton.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// for loop for template

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  // why is the for loop not used inside the function
  // is the [i] bracket i a place holder or the actual value in the array
  // the cardElement is being used in the function on top why dosent it cause a problem

  cardsList.prepend(cardElement);
}
