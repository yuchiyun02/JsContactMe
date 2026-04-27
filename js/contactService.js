let contacts = [];
let contId = 1;

export function addContact(name, phone, email) {
    const contact = {
        id : contId++,
        name,
        phone,
        email
    }

    contacts.push(contact); //latest first
}

export function getContacts() {
    return contacts;
}

export function deleteContact(id) {

}

export function searchContact(query) {

}