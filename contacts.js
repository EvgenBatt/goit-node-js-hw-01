const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, ".", "db", "contacts.json");

/**
 * The function `listContacts` reads data from a file and returns it as a parsed JSON object.
 * @returns the parsed JSON data from the file.
 */

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

/**
 * The function `getContactById` retrieves a contact object from a list of contacts based on the
 * provided contactId.
 * @returns The function `getContactById` returns the contact object with the specified `contactId` if
 * it exists in the list of contacts. If the contact is not found, it returns `null`.
 */

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

/**
 * The function `addContact` adds a new contact to a list of contacts and saves it to a file.
 * @returns the newly created contact object.
 */

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

/**
 * The `removeContact` function removes a contact from a list of contacts and updates the contacts
 * file.
 * @returns the deleted contact.
 */

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const [deletedTask] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedTask;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
