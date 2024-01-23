const APIKey = 'rCdgVvs7jB_gnj9ttq-c00b7TO2AYxstJre6QVTZ-sU';
const photos_list = document.querySelector('.liked_photos_list');
const likedPhotosArr = localStorage.getItem('liked') ? localStorage.getItem('liked').split(',') : [];
const getBackBtn = document.querySelector('.get_back_btn');

async function getPhoto(id) {
       let response = await fetch(`https://api.unsplash.com//photos/${id}?client_id=${APIKey}`);
       let json = await response.json();

       let renderStr = `<div>
       <div class="img_div">
       <img src="${json.urls.regular}" alt="random photo" class="random_photo">
       </div>
       <h2 class="author_name">${json.user.name}</h2>
       <div class="likes_div">
       <button class="like_btn"><svg class="like_svg" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path class="like_svg_path active" d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" fill="red"></path></g></svg></button>
       <p class="likes_count">${json.likes + 1}</p>
       </div>
       </div>`;
       return renderStr;
};

likedPhotosArr.forEach(element => {
    getPhoto(element).then((result) => photos_list.insertAdjacentHTML('beforeend', result));
});

getBackBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});


