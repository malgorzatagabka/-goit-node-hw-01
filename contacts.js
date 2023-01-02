const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, {encoding:"utf-8"});
		return JSON.parse(contacts);
	} catch (error) {
		console.log(error.message);
	}
};

const getContactById = async (contactId) => {
	try {
		const contacts = await listContacts();
		const contact = contacts.find(({ id }) => id === contactId);
		return contact;
	} catch (error) {
		console.log(error.message);
	}
};

const addContact = async (name, email, phone) => {
	try {
		const contacts = await listContacts();
		const newContact = { id: v4(), name, email, phone };
		const newContacts = [...contacts, newContact];
		await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2),{encoding:"utf-8"});
		return newContact;
	} catch (error) {
		console.log(error.message);
	}
};

const removeContact = async (contactId) => {
	try {
		const contact = await getContactById(contactId);
		const contacts = await listContacts();
		const newContacts = contacts.filter(({ id }) => id !== contactId);
		await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2),{encoding:"utf-8"});
		return contact;
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