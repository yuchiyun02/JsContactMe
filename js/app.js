import { addContact, getContacts, deleteContact, searchContacts } from "./contactService.js";
import { renderContacts } from "./ui.js";

function init() {
  document.getElementById("addBtn").onclick = handleAdd;
  document.getElementById("search").oninput = handleSearch;

  updateUI();
}

function handleAdd() {
    const name = getElementById("name").value.trim();
    const phone = getElementById("phone").value.trim();
    const email = getElementById("email").value.trim();

    if (!name || !phone || !email) {
        alert("Please enter all fields")
        return;
    }

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";

    addContact(name, phone, email);
    updateUI();
}

function handleSearch() {
    
}

function handleDelete(id){
    deleteContact(id);
    updateUI();
}

function updateUI() {
    renderContacts(getContacts(), handleDelete);
}