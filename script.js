let add = document.querySelector('.add');
let del = document.querySelector('.del');
//массив обьектов (заметок)
let arrNote = [];
//добавление заметки
add.onclick = function () {
    //создаю новый обьект
    let note = {
        id: getRandomID(0, 167961500),
        noteName: 'nameNote',
        noteText: '',
        time: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
        isSelected: false,
        timeView: null
    };
    const noteName = document.createElement('span');
    noteName.id = note.id + 'n';
    let noteIcon = document.createElement('p');
    noteIcon.id = note.id;
    let date = document.createElement('p');
    date.textContent = note.time;
    note.timeView = date;
    noteName.textContent = note.noteName;
    noteIcon.classList.add('note');
    noteIcon.appendChild(noteName);
    noteIcon.appendChild(date);
    arrNote.unshift(note);
    document.querySelector('.note-navigation').insertBefore(noteIcon, document.querySelector('.note-navigation').firstChild);
    localStorage.setItem('storedNotes', JSON.stringify(arrNote));
}

function changeID (idNote) {
    let selectedNote;
    unselectedCN();
    for (let i = 0; i < arrNote.length; i++) {
        if (idNote === arrNote[i].id || idNote === arrNote[i].id + 'n') {
            selectedNote = arrNote[i];
            break;
        }
    }
    selectedNote.isSelected = true;
    console.log(selectedNote)
    document.getElementById(idNote).classList.add('note-selected');

    let section = document.getElementById('text');
    section.textContent = '';
    let input = document.createElement('input');
    input.value = selectedNote.noteName;
    input.id = 'nameN';
    let tab = document.createElement('p');
    let textArea = document.createElement('textarea');
    //изменения хеша
    location.hash = selectedNote.id;
    textArea.value = selectedNote.noteText;
    textArea.id = 'textN';
    section.appendChild(input);
    section.appendChild(tab);
    textArea.setAttribute('class', 'text-note');
    textArea.classList.add("textArea");
    section.appendChild(textArea);
    location.hash = selectedNote.id;
    //изменения названия заметки
    input.oninput = function () {
        document.querySelector('.note-selected span').textContent = input.value;
        selectedNote.noteName = input.value;
        selectedNote.noteText = textArea.value;
        selectedNote.time = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
        selectedNote.timeView.innerText = selectedNote.time;
        if (arrNote[0].isSelected === false) {
            sortNoteMenu();
        }
    }
    input.onchange = function () {
        for (let i = 0; i < arrNote.length; i++) {
            if (arrNote[i].isSelected === true) {
                break;
            }
        }
        localStorage.setItem('storedNotes', JSON.stringify(arrNote));
    }
    textArea.oninput = function () {
        selectedNote.noteText = textArea.value;
        selectedNote.time = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
        selectedNote.timeView.innerText = selectedNote.time;
        if (arrNote[0].isSelected === false) {
            sortNoteMenu();
        }
    }
    textArea.onchange = function () {
        for (let i = 0; i < arrNote.length; i++) {
            if (arrNote[i].isSelected === true) {
                arrNote[i].noteText = document.getElementById('textN').value;
                break;
            }
        }
        localStorage.setItem('storedNotes', JSON.stringify(arrNote));
    }
}

//перемещение между заметками(выбор)
document.querySelector('.note-navigation').onclick = function (event) {
    let idNote = event.target.id;
    changeID(idNote);

}
//обновление окна
window.onbeforeunload = function () {
    for (let i = 0; i < arrNote.length; i++) {
        if (arrNote[i].isSelected === true) {
            arrNote[i].noteName = document.getElementById('nameN').value;
            arrNote[i].noteText = document.getElementById('textN').value;
            break;

        }
    }
    unselectedCN();
    localStorage.setItem('storedNotes', JSON.stringify(arrNote));
}
//LocalStorage обраный залив
window.onload = function () {
    if (JSON.parse(localStorage.getItem('storedNotes')) === null) {
        return;
    }
    arrNote = JSON.parse(localStorage.getItem('storedNotes'));
    for (let i = 0; i < arrNote.length; i++) {
        let noteIcon = document.createElement('p');
        const noteName = document.createElement('span');
        noteName.id = arrNote[i].id + 'n';
        noteIcon.id = arrNote[i].id;
        noteName.textContent = arrNote[i].noteName;
        let date = document.createElement('p');
        date.textContent = arrNote[i].time;
        arrNote[i].timeView = date;
        noteIcon.appendChild(noteName);
        noteIcon.appendChild(date);
        noteIcon.classList.add('note');
        document.querySelector('.note-navigation').appendChild(noteIcon);
    }
    let IdNote = location.hash.substr(1);
    changeID(IdNote);
}

//Пересмена заметки(удаление выделения)
function unselectedCN() {
    let choseNote = document.querySelector('.note-selected');
    if (choseNote != null) {
        choseNote.classList.remove('note-selected');
    }
    for (let i = 0; i < arrNote.length; i++) {
        if (arrNote[i].isSelected) {
            arrNote[i].isSelected = false;
            break;
        }
    }
}

//смена урл пользователем(для перехода между заметками через ссылочку)
window.addEventListener('hashchange', function () {
    for (let i = 0; i < arrNote.length; i++) {
        if (location.hash === '#' + arrNote[i].id) {
            let note = document.getElementById(arrNote[i].id);
            unselectedCN();
            note.classList.add('note-selected');
            arrNote[i].isSelected = true;
            document.getElementById('nameN').value = arrNote[i].noteName;
            document.getElementById('textN').value = arrNote[i].noteText;
            return;
        }
    }
    location.hash = '';
    document.getElementById('nameN').value = '';
    document.getElementById('textN').value = '';
    unselectedCN();
})


// Удаление заметки
del.onclick = function () {
    if (confirm('Вы действительно хотите удалить выбраную заметку?')) {
        let selectedNote = document.querySelector('.note-selected');
        for (let i = 0; i < arrNote.length; i++) {
            if (selectedNote.id === arrNote[i].id) {
                arrNote.splice(i, 1);
                document.querySelector('.note-navigation').removeChild(document.querySelector('.note-navigation').children[i]);
                break;
            }
        }
        document.getElementById('nameN').value = '';
        document.getElementById('textN').value = '';
        location.hash = '';
    }
    localStorage.setItem('storedNotes', JSON.stringify(arrNote));
}

//генерация ID
function getRandomID(min, max) {
    let int = Math.floor(Math.random() * (max - min + 1)) + min;
    return int.toString();
}

function sortNoteMenu() {
    for (let i = 0; i < arrNote.length; i++) {
        if (arrNote[i].isSelected === true) {
            let temp = arrNote[i];
            arrNote.splice(i, 1);
            arrNote.unshift(temp);
            let tempNote = document.querySelector('.note-selected');
            document.querySelector('.note-navigation').removeChild(document.querySelector('.note-navigation').children[i]);
            document.querySelector('.note-navigation').insertBefore(tempNote, document.querySelector('.note-navigation').firstChild);
            break;
        }
    }
}
