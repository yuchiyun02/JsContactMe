let contacts = [];
let contId = 1;

function load() {
    const data = localStorage.getItem("contacts");

    contacts = data 
    ? JSON.parse(data) 
    : [];

    contId = contacts.length > 0
    ? Math.max(...contacts.map(c => c.id)) + 1
    : 1;
}

function save() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

export function addContact(name, phone, email) {
    const contact = {
        id : contId++,
        name,
        phone,
        email
    }

    contacts.push(contact); //latest first
    save();
}

export function getContacts() {
    return contacts;
}

export function getContactById(id) {
    return contacts.find(contact => contact.id === id);
}

export function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    save();
}

export function updateContact(id, name, phone, email) {
    const contact = contacts.find(item => item.id === id);

    if (!contact) {
        return;
    }

    contact.name = name;
    contact.phone = phone;
    contact.email = email;
    save();
}

export function searchContacts(query) {
    if (!query) {
        return contacts;
    }

    const lowerQuery = query.toLowerCase();
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowerQuery)
    );
}

load();
