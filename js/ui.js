export function renderContacts(list, onEdit, onDelete) {
    const container = document.getElementById("contactList");
    container.innerHTML = "";

    list.forEach(contact => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${contact.id}</td>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
        <td class="action-cell">
            <button class="edit-btn icon-btn" data-id="${contact.id}" aria-label="Edit contact" title="Edit contact">&#x270E;</button>
            <button class="cancel-btn icon-btn" data-id="${contact.id}" aria-label="Delete contact" title="Delete contact">&#x1F5D1;</button>
        </td>
        `;

        tr.querySelector(".edit-btn").onclick = () => onEdit(contact.id);
        tr.querySelector(".cancel-btn").onclick = () => onDelete(contact.id);

        container.appendChild(tr);
    });
}

export function openContactModal() {
    setModalMode("add");
    clearContactForm();
    document.getElementById("contactModal").classList.remove("hidden");
    document.getElementById("name").focus();
}

export function openEditContactModal(contact) {
    setModalMode("edit");
    fillContactForm(contact);
    document.getElementById("contactModal").classList.remove("hidden");
    document.getElementById("name").focus();
}

export function closeContactModal() {
    document.getElementById("contactModal").classList.add("hidden");
    clearContactForm();
    setModalMode("add");
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

export function fillContactForm(contact) {
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;
}

export function setModalMode(mode) {
    const modalTitle = document.getElementById("modalTitle");
    const submitButton = document.getElementById("addBtn");

    if (mode === "edit") {
        modalTitle.textContent = "Edit Contact";
        submitButton.textContent = "Update Contact";
        return;
    }

    modalTitle.textContent = "Add Contact";
    submitButton.textContent = "Save Contact";
}

export function setPersistenceToggleState(enabled) {
    document.getElementById("persistenceToggle").checked = enabled;
    document.getElementById("persistenceLabel").textContent = enabled
        ? "Persistence On"
        : "Memory Only";
    document.getElementById("persistenceDescription").textContent = enabled
        ? "Contacts are currently saved in local storage."
        : "Contacts stay in memory only and reset on refresh.";
}
