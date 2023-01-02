import fs from 'fs';
import path from 'path';

const contactsPath = path.join(__dirname, 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
}

f