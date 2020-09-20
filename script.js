let add = document.querySelector('.add');
let del= document.querySelector('.del');
add.onclick = function (){
    let note = document.createElement('p');
    note.textContent = 'nameNote'
    note.classList.add('note');
    document.querySelector('.note-navigation').appendChild(note );
}

