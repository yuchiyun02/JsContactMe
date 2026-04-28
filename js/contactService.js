let contacts = [];
let contId = 1;
const CONTACTS_STORAGE_KEY = "contacts";
const PERSISTENCE_STORAGE_KEY = "persistence-enabled";
const phoneRegex = /^(\+?6?01)[0|1|2|3|4|5|6|7|8|9]\-*[0-9]{7,8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeName(name) {
  return name.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

function normalizePhone(phone) {
    const digits = phone.replace(/\D/g, "");
    const local = digits.startsWith("6") ? digits.slice(1) : digits;
    return local.slice(0, 3) + "-" + local.slice(3);
}

function normalizeEmail(email) {
    return email.toLowerCase().trim();
}

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
        name: normalizeName(name),
        phone: normalizePhone(phone),
        email: normalizeEmail(email),
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

    contact.name = normalizeName(name);
    contact.phone = normalizePhone(phone);
    contact.email = normalizeEmail(email);
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

export function validateContact(name, phone, email, excludeId = null) {
    const errors = {};

    if (!name) {
        errors.name = "Name is required.";
    }

    if (!phone) {
        errors.phone = "Phone Number is required.";
    }
    else if (!phoneRegex.test(phone)) {
        errors.phone = "Invalid phone number. Use Malaysian format, e.g. 01X-XXXXXXX";
    } 
    else if (contacts.some(c => c.phone === normalizePhone(phone) && c.id !== excludeId)) {
        errors.phone = "This phone number is already in your contacts.";
    }

    if (!email) {
        errors.email = "Email is required.";
    }
    else if (!emailRegex.test(email)) {
        errors.email = "Invalid email address. Use format user@domain.com";
    } 
    else if (contacts.some(c => c.email === normalizeEmail(email) && c.id !== excludeId)) {
        errors.email = "This email address is already in your contacts.";
    }

    return errors;
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
