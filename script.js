/*************************************************************************
 * Lógica de Criar Notas
 **************************************************************************/

function popup() {

    const popupContainer = document.createElement("div");

    popupContainer.innerHTML = `
    <div id="popupContainer">
        <h1>Nova Nota</h1>
        <textarea id="note-text" placeholder="Escreva Aqui..."></textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="createNote()">Criar Nota</button>
            <button id="closeBtn" onclick="closePopup()">Fechar</button>
        </div>
    </div>
    `;
    document.body.appendChild(popupContainer);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if(popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {

    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;
    if (noteText.trim() !== '') {
        const note = {
        id: new Date().getTime(),
        text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-text').value = '';

        popupContainer.remove();
        displayNotes();
    }
}


/*************************************************************************
 * Mostrar Notas
 **************************************************************************/

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${note.text}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        notesList.appendChild(listItem);
    });
}


/*************************************************************************
 * Lógica de Editar Nota
 **************************************************************************/

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");
    
    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
        <h1>Editar Nota</h1>
        <textarea id="note-text">${noteText}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote()">Pronto</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancelar</button>
        </div>
    </div>
    `;

    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");

    if(editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if (noteText !== '') {
        const noteId = editingPopup.getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        // Procura a nota a ser atualizada
        const updatedNotes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, text: noteText };
            }
            return note;
        });

        // Atualiza a nota no LocalStorage do Browser
        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        // Fechar a edição do popup
        editingPopup.remove();

        
        displayNotes();
    }
}

/*************************************************************************
 * Lógica de Deletar Notas
 **************************************************************************/

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();