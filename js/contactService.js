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
    contacts = contacts.filter(contact => contact.id !== id);
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
