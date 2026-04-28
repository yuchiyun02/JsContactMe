import {
    addContact,
    getContactById,
    getContacts,
    deleteContact,
    isPersistenceEnabled,
    setPersistenceEnabled,
    updateContact,
    searchContacts,
    checkDuplicates
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
let phoneRegex = /^(\+?6?01)[0|1|2|3|4|6|7|8|9]\-*[0-9]{7,8}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const errorPhone = document.getElementById("errorPhone");
    const errorEmail = document.getElementById("errorEmail");
    errorPhone.removeAttribute("data-visible");
    errorEmail.removeAttribute("data-visible");

    let hasError = false;

    if (!phoneRegex.test(phone)) {
        errorPhone.textContent = "Invalid phone number. Use Malaysian format, e.g. 01X-XXXXXXX";
        errorPhone.setAttribute("data-visible", "true");
        hasError = true;
    } else if (checkDuplicates(phone, "phone")) {
        errorPhone.textContent = "This phone number is already in your contacts.";
        errorPhone.setAttribute("data-visible", "true");
        hasError = true;
    }

    if (!emailRegex.test(email)) {
        errorEmail.textContent = "Invalid email address. Use format user@domain.com";
        errorEmail.setAttribute("data-visible", "true");
        hasError = true;
    } else if (checkDuplicates(email, "email")) {
        errorEmail.textContent = "This email address is already in your contacts.";
        errorEmail.setAttribute("data-visible", "true");
        hasError = true;
    }

    if (!name || hasError) {
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
