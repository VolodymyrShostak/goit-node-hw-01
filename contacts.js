const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(contacts);
        console.table(contactsList);
    } catch (error) {
        console.log(error.message);
    }
};

async function addContact(name, email, phone) {
    try {
        const contacts = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(contacts);
        const newContact = { id: shortid.generate(), name, email, phone };
        const newContactsList = [...contactsList, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
        console.table(newContactsList);
    } catch (error) {
        console.log(error.message);
    }
};

async function getContactById(contactId) {
    try {
         const stringId = contactId.toString();
        const contacts = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(contacts);
        const contact = contactsList.find((contact) => contact.id === stringId);
        console.table(contact);
    } catch (error) {
        console.log(error.message);
    }
};

async function removeContact(contactId) {
    try {
        const stringId = contactId.toString();
        const contacts = await fs.readFile
            (contactsPath);
        const contactsList = JSON.parse(contacts);
        const newContactsList = contactsList.filter((contact) => contact.id !== stringId);
        await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
        console.table(newContactsList);
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
