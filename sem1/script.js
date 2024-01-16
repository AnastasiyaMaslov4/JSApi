const tableEl = document.querySelector('.lessons');

let newData = [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 7
    }
];

let myLessons;
if(!localStorage.getItem('my lessons')) {
    myLessons = [];
} else {
    myLessons = localStorage.getItem('my lessons').split(',');
}

function setData() {
    localStorage.setItem('lessons', JSON.stringify(newData));
    localStorage.setItem('my lessons', myLessons.toString());
}

function getRow(lesson) {
    return `<tr>
    <td>${lesson.name}</td>
    <td>${lesson.time}</td>
    <td>${lesson.maxParticipants}</td>
    <td><button value=${lesson.id} class='joinBtn'>Записаться</button></td>
    <td><button value=${lesson.id} class='leaveBtn' disabled='true'>Отменить запись</button></td>
    </tr>`
}

function renderTable() {
    let data = JSON.parse(localStorage.getItem('lessons'));
    let rows = data.map((item) => getRow(item)).join('');
    tableEl.insertAdjacentHTML('beforeend', rows);
    const joinButtonsEl = document.querySelectorAll('.joinBtn');
    for (const btn of joinButtonsEl) {
        btn.addEventListener('click', () => {
            joinLesson(btn.value);
        });
    }
    const leaveButtonsEl = document.querySelectorAll('.leaveBtn');
    for (const btn of leaveButtonsEl) {
        btn.addEventListener('click', () => {
            leaveLesson(btn.value);
        })
    }
    checkButtons();
}

function joinLesson(lessonId) {
    let currentLesson = newData.find(item => item.id == lessonId);
    currentLesson.currentParticipants += 1;
    myLessons.push(lessonId);
    setData();
    checkButtons();
}

function leaveLesson(lessonId) {
    let currentLesson = newData.find(item => item.id == lessonId);
    currentLesson.currentParticipants -= 1;
    myLessons = myLessons.filter(item => item !== lessonId);
    setData();
    checkButtons();
}

function checkButtons() {
    let joinButtonsElArr = [...document.querySelectorAll('.joinBtn')];
    let leaveButtonsElArr = [...document.querySelectorAll('.leaveBtn')];
    for (const lesson of newData) {
        joinButtonsElArr.find(btn => btn.value == lesson.id).disabled = false;
        leaveButtonsElArr.find(btn => btn.value == lesson.id).disabled = true;
        if(lesson.currentParticipants == lesson.maxParticipants) {
            joinButtonsElArr.find(btn => btn.value == lesson.id).disabled = true;
        }
        if(myLessons.includes(lesson.id.toString())) {
            joinButtonsElArr.find(btn => btn.value == lesson.id).disabled = true;
            leaveButtonsElArr.find(btn => btn.value == lesson.id).disabled = false;
        }
    }
}

if(!localStorage.getItem('lessons')) {
    setData(newData);
}

renderTable();

