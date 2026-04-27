import { addContact, getContacts, deleteContact, searchContacts } from "./contactService.js";
import { renderContacts } from "./ui.js";

function init() {
  document.getElementById("addBtn").onclick = handleAdd;
  document.getElementById("search").oninput = handleSearch;

  updateUI();
}

function handleAdd() {

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