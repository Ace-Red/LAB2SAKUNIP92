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
        time: new Date(),
        isSelected: false
    };
    //создаю иконку слева(для выбора заметки)
    let noteIcon = document.createElement('p');
    noteIcon.id = note.id;
    noteIcon.textContent = note.noteName;
    noteIcon.classList.add('note');
    arrNote.push(note);
    document.querySelector('.note-navigation').appendChild(noteIcon);
}
//перемещение между заметками(выбор)
document.querySelector('.note-navigation').onclick = function(event) {
    let idNote = event.target.id;
    let selectedNote;
    unselectedCN();
    for (let i = 0; i <arrNote.length ; i++) {
        if(idNote===arrNote[i].id){
            selectedNote = arrNote[i];
            break;
        }
    }
    selectedNote.isSelected = true;
    document.getElementById(idNote).classList.add('note-selected');
    displayTextArea(selectedNote.id,selectedNote.noteText)
}
//изменения
//Пересмена заметки(удаление выделения)
function unselectedCN(){
    let choseNote = document.querySelector('.note-selected');
    if (choseNote != null) {
        choseNote.classList.remove('note-selected');
    }
    for (let i = 0; i < arrNote.length; i++) {
        if (arrNote[i].selected) {
            arrNote[i].selected = false;
            break;
        }
    }
}
//генерация ID
function getRandomID(min, max) {
    let int = Math.floor(Math.random() * (max - min + 1)) + min;
    return int.toString();
}
//показ экрата с информацией заметки(текстом названием)
function displayTextArea(name,text) {
    let section = document.getElementById('text');
    section.textContent = '';
    let input = document.createElement('input');
    input.value = name;
    let tab = document.createElement('p');
    let textArea = document.createElement('textarea');
    textArea.value = text;
    section.appendChild(input);
    section.appendChild(tab);
    textArea.setAttribute('class', 'text-note');
    textArea.classList.add("textArea");
    section.appendChild(textArea);
}


