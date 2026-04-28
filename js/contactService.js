let contacts = [];
let contId = 1;
const CONTACTS_STORAGE_KEY = "contacts";
const PERSISTENCE_STORAGE_KEY = "persistence-enabled";

function readPersistencePreference() {
    return localStorage.getItem(PERSISTENCE_STORAGE_KEY) === "true";
}

function writePersistencePreference(enabled) {
    localStorage.setItem(PERSISTENCE_STORAGE_KEY, String(enabled));
}

let persistenceEnabled = readPersistencePreference();

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
        return;
    }

    contacts = [];
    contId = 1;
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

export function checkDuplicates(input, attr) {
    if (!input) {
        return false;
    }

    return contacts.some(contact => contact[attr] === input);
}

export function isPersistenceEnabled() {
    persistenceEnabled = readPersistencePreference();
    return persistenceEnabled;
}

export function setPersistenceEnabled(enabled) {
    persistenceEnabled = enabled;
    writePersistencePreference(enabled);

    if (persistenceEnabled) {
        save();
        return;
    }

    localStorage.removeItem(CONTACTS_STORAGE_KEY);
}

load();
