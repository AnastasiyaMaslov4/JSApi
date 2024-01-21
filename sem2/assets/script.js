const containerEl = document.querySelector(".slider__main__container");
const previousBtnEl = document.querySelector('.previousBtn');
const nextBtnEl = document.querySelector('.nextBtn');
const navigationBtnsEl = document.querySelectorAll('.slider__navigation__btn');
let currentPicId = 1;
const maxPicId = 4;

function changePicture(pictureId) {
    containerEl.innerHTML = `<img src='assets/img/product-image-${pictureId}.png'>`;
    currentPicId = pictureId;
    for (const navBtn of navigationBtnsEl) {
        if(navBtn.value == pictureId) {
            navBtn.classList.add('active');
        } else if(navBtn.classList.contains('active')) {
            navBtn.classList.remove('active');
        }
    }
}

previousBtnEl.addEventListener('click', () => {
    if(currentPicId == 1) {
        changePicture(maxPicId);
    } else {
        changePicture(currentPicId - 1);
    }
})

nextBtnEl.addEventListener('click', () => {
    if(currentPicId < maxPicId) {
        changePicture(currentPicId + 1);
    } else {
        changePicture(1);
    }
})

for (const navBtn of navigationBtnsEl) {
    if(navBtn.value == currentPicId) {
        navBtn.classList.add('active');
    }
    navBtn.addEventListener('click', () => {
        changePicture(navBtn.value);
    })
}

changePicture(1);