import { 
    addContact, 
    getContactById,
    getContacts, 
    deleteContact, 
    updateContact,
    searchContacts 
} from "./contactService.js";
import {
    renderContacts,
    openContactModal,
    openEditContactModal,
    closeContactModal,
    getContactFormValues,
    getSearchQuery
} from "./ui.js";

let editingContactId = null;

function init() {
    document.getElementById("openModalBtn").onclick = handleOpenAddModal;
    document.getElementById("closeModalBtn").onclick = handleCloseModal;
    document.getElementById("modalBackdrop").onclick = handleCloseModal;
    document.getElementById("addBtn").onclick = handleAdd;
    document.getElementById("search").oninput = handleSearch;

    updateUI();
}

function handleOpenAddModal() {
    editingContactId = null;
    openContactModal();
}

function handleCloseModal() {
    editingContactId = null;
    closeContactModal();
}

function handleAdd() {
    const { name, phone, email } = getContactFormValues();

    if (!name || !phone || !email) {
        alert("Please enter all fields")
        return;
    }

    if (editingContactId !== null) {
        updateContact(editingContactId, name, phone, email);
    } else {
        addContact(name, phone, email);
    }

    handleCloseModal();
    updateUI();
}

function handleSearch() {
    const query = getSearchQuery();
    renderContacts(searchContacts(query), handleEdit, handleDelete);
}

function handleEdit(id) {
    const contact = getContactById(id);

    if (!contact) {
        return;
    }

    editingContactId = id;
    openEditContactModal(contact);
}

function handleDelete(id){
    deleteContact(id);
    updateUI();
}

function updateUI() {
    renderContacts(getContacts(), handleEdit, handleDelete);
}

init();
