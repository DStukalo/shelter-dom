//main page
//бургер меню

const burger = document.querySelector(".header__burger");
const modalMenu = document.querySelector(".modal-menu");
const body = document.body;
const header = document.querySelector(".header");
const logo = document.querySelector(".header__logo");

burger.addEventListener("click", function (e) {
    modalMenu.classList.toggle("modal-menu_visible");
    modalMenu.classList.toggle("modal-menu_hidden");
    body.classList.toggle("body-overflow_hidden");
    burger.classList.toggle("header__burger_rotate");
    header.classList.toggle("header_rotate");
    logo.classList.toggle("header__logo_rotate");
});

modalMenu.addEventListener("click", function (e) {
    if (
        e.target.classList == "modal-menu__wrapper" ||
        e.target.classList == "header__navigation-link" ||
        e.target.classList == "link-active-nav"
    ) {
        modalMenu.classList.toggle("modal-menu_visible");
        modalMenu.classList.toggle("modal-menu_hidden");
        body.classList.toggle("body-overflow_hidden");
        burger.classList.toggle("header__burger_rotate");
        header.classList.toggle("header_rotate");
        logo.classList.toggle("header__logo_rotate");
    }
});

//робота із отримання JSON-данних та реалізація інтерактивного слайдера

const url =
    "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json";

const slider = document.querySelector(".friends-content__slider");
const cardList = document.querySelector(".friends-content__card-list");
let petsArray = [];
let currentPets = [];
let indexOfSum = 7;
let indexForFuncRandom = [];
let petsArrayWithoutCurrentPet = new Set();
let lastPets = [];

let promise = fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((element) => {
            petsArray.push(element);
        });
        return petsArray;
    })
    .then((petsArray) => {
        sliderContent(petsArray);
    })
    .catch((rejected) => {
        console.log(rejected);
    });

function sliderContent(array) {
    cardList.innerHTML = "";
    let index = createUniqIndex();
    let fragment = "";
    let sliderEllementOne = addCard(array[index[0]], 1);
    fragment += sliderEllementOne;
    let sliderEllementTwo = addCard(array[index[1]], 2);
    fragment += sliderEllementTwo;
    let sliderEllementThree = addCard(array[index[2]], 3);
    fragment += sliderEllementThree;
    cardList.insertAdjacentHTML("afterbegin", fragment);
    petsArray.forEach((el, i) => {
        petsArrayWithoutCurrentPet.add(el);
    });
    lastPets = [];
    petsArrayWithoutCurrentPet.delete(array[index[0]]);
    petsArrayWithoutCurrentPet.delete(array[index[1]]);
    petsArrayWithoutCurrentPet.delete(array[index[2]]);
    petsArrayWithoutCurrentPet.forEach((el) => {
        lastPets.push(el);
    });
    indexOfSum = petsArrayWithoutCurrentPet.size - 1;
}

function addCard(el, number) {
    return `
    <div class="friends-content__card card position__${number}">
    <img                                    
                                    src="img/friends/${el.name}.png"
                                    alt=${el.name}
                                    class="friends-content__card-image card__image"
                                />
                                <h4
                                    class="friends-content__card-title card__title"
                                >
                                ${el.name}
                                </h4>
                                <button
                                    class="friends-content__card-button button-primary_nonbg card__button"
                                >
                                    Learn more
                                </button>
  </div>
    `;
}

function randomizeIndex() {
    let a = indexOfSum;
    let res = Math.round(Math.random() * a);
    return res;
}

function getThreeIndexes() {
    let res;
    let one = randomizeIndex();
    let two = randomizeIndex();
    if (one == two) {
        return getThreeIndexes();
    }
    let three = randomizeIndex();
    if (three == two || three == one) {
        return getThreeIndexes();
    }
    res = [one, two, three];
    currentPets = res;
    return res;
}

function createUniqIndex() {
    let res;
    if (currentPets) {
        res = getThreeIndexes();
    }
    if (currentPets.length == 0) {
        res = getThreeIndexes();
    }
    return res;
}

slider.addEventListener("click", function (e) {
    const leftBtn = document.querySelector(".left-arrow");
    const rightBtn = document.querySelector(".right-arrow");
    if (e.target === leftBtn) {
        sliderContent(lastPets);
    }
    if (e.target === rightBtn) {
        sliderContent(lastPets);
    }
});

slider.addEventListener("click", function (e) {
    if (e.target.closest(".friends-content__card")) {
        let obj;
        petsArray.forEach((el) => {
            if (
                el.name ==
                e.target.closest(".friends-content__card").children[1].innerText
            ) {
                obj = el;
            }
        });
        addContentToPopup(obj);
    }
});

// робота з popup
const modalFriend = document.querySelector(".modal-friend");
const modalFriendWrapper = document.querySelector(".modal-friend__wrapper");

modalFriend.addEventListener("click", function (e) {
    if (
        e.target.closest(".modal-friend__close") ||
        e.target.classList == "modal-friend modal-friend_visible"
    ) {
        modalFriend.classList.toggle("modal-friend_visible");
        body.classList.toggle("body-overflow_hidden");
    }
});

function addContentToPopup(obj) {
    modalFriendWrapper.innerHTML = "";
    modalFriend.classList.toggle("modal-friend_visible");
    body.classList.toggle("body-overflow_hidden");
    let fragment = "";
    let closeBtn = closeButton();
    fragment += closeBtn;
    let card = createPopup(obj);
    fragment += card;
    modalFriendWrapper.insertAdjacentHTML("afterbegin", fragment);
    addHoverEffectAtBtnClose();
}

function addHoverEffectAtBtnClose() {
    const modalFriendsCard = document.querySelector(".modal-friend__card");
    modalFriendsCard.addEventListener("mouseleave", function (e) {
        const closeBtn = document.querySelector(".modal-friend__close");
        closeBtn.classList.add("modal-friend__close-hover");
    });
    modalFriendsCard.addEventListener("mouseenter", function (e) {
        const closeBtn = document.querySelector(".modal-friend__close");
        closeBtn.classList.remove("modal-friend__close-hover");
    });
}

function closeButton() {
    return `
    <div class="modal-friend__close"></div>`;
}

function createPopup(element) {
    return `
    <div class="modal-friend__card">
    <div class="modal-friend__picture">
    <img src="img/friends/${element.name}.png" alt="${element.name}" class="modal-friend__img"/>
    </div>
    <div class="modal-friend__content">
        <h3 class="modal-friend__title">${element.name}</h3>
        <p class="modal-friend__subtitle">${element.type} - ${element.breed}</p>
        <p class="modal-friend__desq">${element.description}</p>
        <ul class="modal-friend__characteristic-list">
            <li
                class="modal-friend__characteristic-item"
            ><b>Age</b> : ${element.age}</li>
            <li
                class="modal-friend__characteristic-item"
            ><b>Inoculations</b> : ${element.inoculations}</li>
            <li
                class="modal-friend__characteristic-item"
            ><b>Diseases</b>: ${element.diseases}</li>
            <li
                class="modal-friend__characteristic-item"
            ><b>Parasites</b>: ${element.parasites}</li>
        </ul>
    </div>`;
}

// pets page
