export function renderContacts(list, onDelete) {
    const container = document.getElementById("contactList");
    container.innerHTML = "";

    list.forEach(contact => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${contact.id}</td>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
        <td><button data-id="${contact.id}">Delete</button></td>
        `;

        tr.querySelector("button").onclick = () => onDelete(contact.id);

        container.appendChild(tr);
    });
}

export function openContactModal() {
    clearContactForm();
    document.getElementById("contactModal").classList.remove("hidden");
    document.getElementById("name").focus();
}

export function closeContactModal() {
    document.getElementById("contactModal").classList.add("hidden");
    clearContactForm();
}

export function clearContactForm() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}

export function getContactFormValues() {
    return {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim()
    };
}

export function getSearchQuery() {
    return document.getElementById("search").value.trim();
}
