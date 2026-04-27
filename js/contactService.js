let contacts = [];
let contId = 1;

export function AddContact(name, phone, email) {
    const contact = {
        id : contId++,
        name,
        phone,
        email
    }

    contacts.push(contact); //latest first
}

export function GetContact() {
    return contacts;
}

export function DeleteContact(id) {

}

export function SearchContact(query) {

}