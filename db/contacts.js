import fs from "fs";
import path from "path";

const contactsPath = path.join(__dirname, "contacts.json");

function listContacts() {  
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) throw err;
        console.table(JSON.parse(data));
    })
};
function addContact(name, email, phone) {
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    })
};
function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) throw err;
        const contacts = JSON.parse(data);
        const contact = contacts.find(contact => contact.id === contactId);
        console.table(contact);
    })
};
function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) throw err;
        const contacts = JSON.parse(data);
        const newContacts = contacts.filter(contact => contact.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        })
    })
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
