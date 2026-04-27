import { 
    addContact, 
    getContacts, 
    deleteContact, 
    searchContacts 
} from "./contactService.js";
import {
    renderContacts,
    openContactModal,
    closeContactModal,
    getContactFormValues,
    getSearchQuery
} from "./ui.js";

function init() {
    document.getElementById("openModalBtn").onclick = openContactModal;
    document.getElementById("closeModalBtn").onclick = closeContactModal;
    document.getElementById("modalBackdrop").onclick = closeContactModal;
    document.getElementById("addBtn").onclick = handleAdd;
    document.getElementById("search").oninput = handleSearch;

    updateUI();
}

function handleAdd() {
    const { name, phone, email } = getContactFormValues();

    if (!name || !phone || !email) {
        alert("Please enter all fields")
        return;
    }

    addContact(name, phone, email);
    closeContactModal();
    updateUI();
}

function handleSearch() {
    const query = getSearchQuery();
    renderContacts(searchContacts(query), handleDelete);
}

function handleDelete(id){
    deleteContact(id);
    updateUI();
}

function updateUI() {
    renderContacts(getContacts(), handleDelete);
}

init();
