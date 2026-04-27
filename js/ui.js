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