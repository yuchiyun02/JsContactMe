import { 
    addContact, 
    getContactById,
    getContacts, 
    deleteContact, 
    isPersistenceEnabled,
    setPersistenceEnabled,
    updateContact,
    searchContacts 
} from "./contactService.js";
import {
    renderContacts,
    openContactModal,
    openEditContactModal,
    closeContactModal,
    getContactFormValues,
    getSearchQuery,
    setPersistenceToggleState
} from "./ui.js";

let editingContactId = null;

function init() {
    document.getElementById("openModalBtn").onclick = handleOpenAddModal;
    document.getElementById("closeModalBtn").onclick = handleCloseModal;
    document.getElementById("modalBackdrop").onclick = handleCloseModal;
    document.getElementById("addBtn").onclick = handleAdd;
    document.getElementById("search").oninput = handleSearch;
    document.getElementById("persistenceToggle").onchange = handlePersistenceToggle;

    setPersistenceToggleState(isPersistenceEnabled());
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

function handlePersistenceToggle(event) {
    const enabled = event.target.checked;
    const wasEnabled = isPersistenceEnabled();

    if (wasEnabled && !enabled) {
        const confirmed = window.confirm(
            "Turning persistence off will clear all saved contacts from local storage. Do you want to continue?"
        );

        if (!confirmed) {
            setPersistenceToggleState(true);
            return;
        }
    }

    setPersistenceEnabled(enabled);
    setPersistenceToggleState(enabled);
    updateUI();
}

function updateUI() {
    renderContacts(getContacts(), handleEdit, handleDelete);
}

init();
