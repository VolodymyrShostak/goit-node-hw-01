const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
}

const addContact=(name, email, phone)=> {
  fs.readFile(contactsPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err.message);
    }
    const contacts = JSON.parse(data);
    const contactNew = { id: shortid.generate(), name, email, phone };
    const contactsList = JSON.stringify([contactNew, ...contacts], null, "\t");

    fs.writeFile(contactsPath, contactsList, (err) => {
      if (err) console.error(err);
    });
  });
}
try {
  addContact();
} catch (error) {
  next(error);
}

const getContactById = (contactId) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const strContactId = String(contactId);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === strContactId);
    console.table(contact);
  });
};

const removeContact = (contactId) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;
    const strContactId = String(contactId);
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter(
      (contact) => contact.id !== strContactId
    );
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err;
      console.table(JSON.parse(data));
    });
  });
};
// export { listContacts, getContactById, removeContact, addContact };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
