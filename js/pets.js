//работа с бургером

const burgerPets = document.querySelector(".header-pets__burger");
const modalMenuPets = document.querySelector(".modal-menu-pets");
const bodyPets = document.body;
const headerPets = document.querySelector(".header-pets");
const logoPets = document.querySelector(".header-pets__logo");

const help = document.head.nextSibling;
console.log(help);

burgerPets.addEventListener("click", function (e) {
    modalMenuPets.classList.toggle("modal-menu_visible");
    modalMenuPets.classList.toggle("modal-menu_hidden");
    bodyPets.classList.toggle("body-overflow_hidden");
    burgerPets.classList.toggle("header-pets__burger_rotate");
    headerPets.classList.toggle("header-pets_rotate");
    logoPets.classList.toggle("header-pets__logo_rotate");
});

modalMenuPets.addEventListener("click", function (e) {
    if (
        e.target.classList == "modal-menu-pets__wrapper" ||
        e.target.classList == "header-pets__navigation-link" ||
        e.target.classList == "link-active-nav-pets"
    ) {
        modalMenuPets.classList.toggle("modal-menu_visible");
        modalMenuPets.classList.toggle("modal-menu_hidden");
        bodyPets.classList.toggle("body-overflow_hidden");
        burgerPets.classList.toggle("header-pets__burger_rotate");
        headerPets.classList.toggle("header-pets_rotate");
        logoPets.classList.toggle("header-pets__logo_rotate");
    }
});

//работа с пагинацией

const urlPets =
    "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json";
const cardListPets = document.querySelector(".pets-content__list");
let petsArrayPets = [];
let allPetsInPages = [];

let promisePets = fetch(urlPets)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((element) => {
            petsArrayPets.push(element);
        });
        return petsArrayPets;
    })
    .then((petsArrayPets) => {
        if (matchMedia("(max-width : 767.9px)").matches) {
            console.log("mobile");
            console.log(matchMedia("(max-width : 767.9px)").matches);
            paginationContentMobile(petsArrayPets);
        } else if (matchMedia("(max-width : 1279.9px)").matches) {
            console.log("tablet");
            console.log(matchMedia("(max-width : 1279.9px)").matches);
            paginationContentTablet(petsArrayPets);
        } else {
            console.log("desktop");
            paginationContentDesktop(petsArrayPets);
        }
    })
    .catch((rejected) => {
        console.log(rejected);
    });
// Desktop

function paginationContentDesktop(array) {
    createFirstPageAfterLoading(array);
    buttonListener(6);
}

function createFirstPageAfterLoading(array) {
    allPetsInPages.push(createPaginationPageObjDesktop(array));
    allPetsInPages.push(createPaginationPageObjDesktop(array));
    allPetsInPages.push(createPaginationPageObjDesktop(array));
    allPetsInPages.push(createPaginationPageObjDesktop(array));
    allPetsInPages.push(createPaginationPageObjDesktop(array));
    allPetsInPages.push(createPaginationPageObjDesktop(array));

    createPage(0);
}

function createPaginationPageObjDesktop(array) {
    let cloneArr = Object.assign([], array);
    let res = shuffle(cloneArr);
    return res;
}

// Tablet
function paginationContentTablet(array) {
    createFirstTabletPage(array);
    buttonListener(8);
}

function createFirstTabletPage(array) {
    createArrForPages(array);
    createPage(0);
}

function createArrForPages(array) {
    let currentArray = [];
    currentArray.push(array);
    currentArray.push(array);
    currentArray.push(array);
    currentArray.push(array);
    currentArray.push(array);
    currentArray.push(array);
    petsArrayPets = currentArray.flat();
    allPetsInPages = createAllPetsInPages(petsArrayPets, 6);
}

// Mobile
function paginationContentMobile(array) {
    createFirstMobilePage(array);

    buttonListener(16);
}

function createFirstMobilePage(array) {
    createArrForMobilePages(array);
    createPage(0);
}

function createArrForMobilePages(array) {
    let currentArray = [];
    currentArray.push(array);
    currentArray.push(array);
    currentArray.push(array);
    currentArray.push(array);
    currentArray.push(array);
    currentArray.push(array);
    petsArrayPets = currentArray.flat();
    allPetsInPages = createAllPetsInPages(petsArrayPets, 3);
}

//func for all width
function addElementAtPage(el) {
    return `
    <div class="pets-content__card card">
    <img                                    
                                    src="../img/friends/${el.name}.png"
                                    alt=${el.name}
                                    class="pets-content__card-image card__image"
                                />
                                <h4
                                    class="pets-content__card-title card__title"
                                >
                                ${el.name}
                                </h4>
                                <button
                                    class="pets-content__card-btn button-primary_nonbg card__button"
                                >
                                    Learn more
                                </button>
  </div>
    `;
}

function shuffle(arr) {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function createPage(number) {
    let num = Number(number);
    cardListPets.innerHTML = "";
    let fragment = "";
    allPetsInPages[num].forEach((el) => {
        let card = addElementAtPage(el);
        fragment += card;
    });
    cardListPets.insertAdjacentHTML("afterbegin", fragment);
}

function createAllPetsInPages(arr, len) {
    let res = [];
    let currentArray = [];
    arr.forEach((el, i) => {
        if (currentArray.length == len) {
            res.push(currentArray);
            currentArray = [];
            currentArray.push(el);
        } else {
            currentArray.push(el);
            if (i == 47) {
                res.push(currentArray);
            }
        }
    });
    res.forEach((el) => {
        el = shuffle(el);
    });
    return res;
}

function buttonListener(number) {
    const count = document.querySelector(".button-arrow_active");
    const toLastPage = document.querySelector(".button__last-page");
    const toNextPage = document.querySelector(".button__next-page");
    const toFirstPage = document.querySelector(".button__first-page");
    const toPrevPage = document.querySelector(".button__prev-page");
    const maxCount = number;
    const minCount = 1;
    toLastPage.addEventListener("click", function (e) {
        if (count.innerHTML != maxCount) {
            count.innerHTML = maxCount;
            toLastPage.classList.toggle("button-arrow_inactive");
            toLastPage.classList.toggle("button-arrow");
            toNextPage.classList.toggle("button-arrow_inactive");
            toNextPage.classList.toggle("button-arrow");
            createPage(maxCount - 1);
            if (toFirstPage.classList.contains("button-arrow_inactive")) {
                toFirstPage.classList.toggle("button-arrow_inactive");
                toFirstPage.classList.toggle("button-arrow");
                toPrevPage.classList.toggle("button-arrow_inactive");
                toPrevPage.classList.toggle("button-arrow");
            }
        }
    });
    toNextPage.addEventListener("click", function (e) {
        if (count.innerHTML != maxCount) {
            createPage(count.innerHTML);
            count.innerHTML++;
            if (count.innerHTML == maxCount) {
                toLastPage.classList.toggle("button-arrow_inactive");
                toLastPage.classList.toggle("button-arrow");
                toNextPage.classList.toggle("button-arrow_inactive");
                toNextPage.classList.toggle("button-arrow");
            }
            if (
                count.innerHTML > minCount &&
                toFirstPage.classList.contains("button-arrow_inactive")
            ) {
                toFirstPage.classList.toggle("button-arrow_inactive");
                toFirstPage.classList.toggle("button-arrow");
                toPrevPage.classList.toggle("button-arrow_inactive");
                toPrevPage.classList.toggle("button-arrow");
            }
        }
    });
    toFirstPage.addEventListener("click", function (e) {
        if (count.innerHTML != minCount) {
            count.innerHTML = minCount;
            createPage(minCount - 1);
            toFirstPage.classList.toggle("button-arrow_inactive");
            toFirstPage.classList.toggle("button-arrow");
            toPrevPage.classList.toggle("button-arrow_inactive");
            toPrevPage.classList.toggle("button-arrow");
            if (toLastPage.classList.contains("button-arrow_inactive")) {
                toLastPage.classList.toggle("button-arrow_inactive");
                toLastPage.classList.toggle("button-arrow");
                toNextPage.classList.toggle("button-arrow_inactive");
                toNextPage.classList.toggle("button-arrow");
            }
        }
    });
    toPrevPage.addEventListener("click", function (e) {
        if (count.innerHTML != minCount) {
            createPage(count.innerHTML - 2);
            count.innerHTML--;
            if (count.innerHTML == minCount) {
                toFirstPage.classList.toggle("button-arrow_inactive");
                toFirstPage.classList.toggle("button-arrow");
                toPrevPage.classList.toggle("button-arrow_inactive");
                toPrevPage.classList.toggle("button-arrow");
            }
            if (
                count.innerHTML < maxCount &&
                toLastPage.classList.contains("button-arrow_inactive")
            ) {
                toLastPage.classList.toggle("button-arrow_inactive");
                toLastPage.classList.toggle("button-arrow");
                toNextPage.classList.toggle("button-arrow_inactive");
                toNextPage.classList.toggle("button-arrow");
            }
        }
    });
}

// работа з popup
const modalPets = document.querySelector(".modal-pets");
const modalPetsWrapper = document.querySelector(".modal-pets__wrapper");
console.log(modalPetsWrapper);
console.log(modalPets);

cardListPets.addEventListener("click", function (e) {
    if (e.target.closest(".pets-content__card")) {
        const count = document.querySelector(".button-arrow_active");
        let obj;
        let num = Number(count.innerHTML) - 1;
        allPetsInPages[num].forEach((el) => {
            if (
                el.name ==
                e.target.closest(".pets-content__card").children[1].innerText
            ) {
                obj = el;
            }
        });
        addContentToPopupPets(obj);
    }
});

modalPets.addEventListener("click", function (e) {
    if (
        e.target.closest(".modal-pets__close") ||
        e.target.classList == "modal-pets modal-pets_visible"
    ) {
        modalPets.classList.toggle("modal-pets_visible");
        bodyPets.classList.toggle("body-overflow_hidden");
    }
});

function addContentToPopupPets(obj) {
    console.log(obj);
    modalPetsWrapper.innerHTML = "";
    modalPets.classList.toggle("modal-pets_visible");
    bodyPets.classList.toggle("body-overflow_hidden");
    let fragment = "";
    let closeBtn = closeButtonPets();
    fragment += closeBtn;
    let card = createPopupPets(obj);
    fragment += card;
    modalPetsWrapper.insertAdjacentHTML("afterbegin", fragment);
    console.log(modalPetsWrapper);
    console.log(modalPets);
    addHoverEffectAtBtnClosePets();
}

function addHoverEffectAtBtnClosePets() {
    const modalPetsCard = document.querySelector(".modal-pets__card");
    modalPetsCard.addEventListener("mouseleave", function (e) {
        const closeBtn = document.querySelector(".modal-pets__close");
        closeBtn.classList.add("modal-pets__close-hover");
    });
    modalPetsCard.addEventListener("mouseenter", function (e) {
        const closeBtn = document.querySelector(".modal-pets__close");
        closeBtn.classList.remove("modal-pets__close-hover");
    });
}

function closeButtonPets() {
    return `
    <div class="modal-pets__close"></div>`;
}

function createPopupPets(element) {
    return `
    <div class="modal-pets__card">
    <div class="modal-pets__picture">
    <img src="../img/pets/${element.name}.png" alt="${element.name}" class="modal-pets__img"/>
    </div>
    <div class="modal-pets__content">
        <h3 class="modal-pets__title">${element.name}</h3>
        <p class="modal-pets__subtitle">${element.type} - ${element.breed}</p>
        <p class="modal-pets__desq">${element.description}</p>
        <ul class="modal-pets__characteristic-list">
            <li
                class="modal-pets__characteristic-item"
            ><b>Age</b> : ${element.age}</li>
            <li
                class="modal-pets__characteristic-item"
            ><b>Inoculations</b> : ${element.inoculations}</li>
            <li
                class="modal-pets__characteristic-item"
            ><b>Diseases</b>: ${element.diseases}</li>
            <li
                class="modal-pets__characteristic-item"
            ><b>Parasites</b>: ${element.parasites}</li>
        </ul>
    </div>`;
}
