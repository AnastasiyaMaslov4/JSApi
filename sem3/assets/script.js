const APIKey = 'rCdgVvs7jB_gnj9ttq-c00b7TO2AYxstJre6QVTZ-sU';
const imageEl = document.querySelector('.random_photo');
const authorNameEl = document.querySelector('.author_name');
const likesCountEl = document.querySelector('.likes_count');
const likeBtnEl = document.querySelector('.like_btn');
const like = document.querySelector('.like_svg_path');
const previousBtnEl = document.querySelector('.previous_btn');
const nextBtnEl = document.querySelector('.next_btn');
const allLikedBtnEl = document.querySelector('.show_liked_photos_btn');
let likes;
let currentPhotoIndex = 0;
let historyArr = localStorage.getItem('history') ? localStorage.getItem('history').split(',') : [];
let likedPhotosArr = localStorage.getItem('liked') ? localStorage.getItem('liked').split(',') : [];


async function getPhoto(variant, id) {
    let url;
    if(variant === 'random') {
        url = `https://api.unsplash.com//photos/random?client_id=${APIKey}`;
    } else if(variant === 'definite') {
        url = `https://api.unsplash.com//photos/${id}?client_id=${APIKey}`;
    }
    try {
        let response = await fetch(url);
        return response.json();
    } catch (error) {
        alert(error);
    } 
}

function showPhoto(variant, id) {
    getPhoto(variant, id).then((response) => {
        imageEl.src = response.urls.regular;
        authorNameEl.innerHTML = `Фотограф: ${response.user.name}`;
        likesCountEl.innerHTML = `${response.likes}`;
        likes = response.likes;
        historyArr.push(response.id);
        currentPhotoIndex = historyArr.indexOf(response.id);
        console.log(currentPhotoIndex);
        localStorage.setItem('history', historyArr.toString());
        like.classList.remove('active_like');
    });
}

likeBtnEl.addEventListener('click', () => {
    likesCountEl.innerHTML = `${likes + 1}`;
    like.classList.add('active_like');
    let likedId = historyArr[historyArr.length - 1];
    likedPhotosArr.push(likedId);
    localStorage.setItem('liked', likedPhotosArr.toString());
});

previousBtnEl.addEventListener('click', () => {
    let id = historyArr[currentPhotoIndex - 1];
    showPhoto('definite', id);
});

nextBtnEl.addEventListener('click', () => {
    showPhoto('random');
});

allLikedBtnEl.addEventListener('click', () => {
    window.location.href = 'liked.html';
});


showPhoto('random');