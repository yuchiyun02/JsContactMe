let contacts = [];
let contId = 1;
let persistenceEnabled = false;
const CONTACTS_STORAGE_KEY = "contacts";

function getNextId(list) {
    return list.length > 0
        ? Math.max(...list.map(contact => contact.id)) + 1
        : 1;
}

function load() {
    if (persistenceEnabled) {
        const data = localStorage.getItem(CONTACTS_STORAGE_KEY);
        contacts = data
            ? JSON.parse(data)
            : [];
        contId = getNextId(contacts);
    }
}

function save() {
    if (!persistenceEnabled) {
        return;
    }

    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
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

export function isPersistenceEnabled() {
    return persistenceEnabled;
}

export function setPersistenceEnabled(enabled) {
    persistenceEnabled = enabled;

    if (persistenceEnabled) {
        if (contacts.length === 0) {
            load();
        }

        save();
        return;
    }

    contacts = [];
    contId = 1;
    localStorage.removeItem(CONTACTS_STORAGE_KEY);
}

load();
