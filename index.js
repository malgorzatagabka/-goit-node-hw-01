const contactsActions = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
require("colors");

program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const contacts = await contactsActions.listContacts();
			console.log("Your contacts list:".green);
			console.table(contacts);
			break;

		case "get":
			const contact = await contactsActions.getContactById(id);
			console.log(`Contact with ID ${id}:`.green);
			console.table(contact);
			break;

		case "add":
			const newContact = await contactsActions.addContact(name, email, phone);
			console.log("New contact has been added:".green);
			console.table(newContact);
			break;

		case "remove":
			const removeContact = await contactsActions.removeContact(id);
			console.log(`Contact with ID ${id} has been deleted:`.red);
			console.table(removeContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
};

invokeAction(argv);