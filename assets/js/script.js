let myLibrary = [
	{
		cover: 'hobbit.jpg',
		title: 'The Hobbit',
		author: 'J.R.R. Tolkien',
		pageCount: 310,
		readStatus: false
	},
	{
		cover: 'studyinscarlet.jpg',
		title: 'A Study in Scarlet',
		author: 'Arthur Conan Doyle',
		pageCount: 160,
		readStatus: true
	},
	{
		cover: 'aliceinwonderland.jpg',
		title: 'Alice in Wonderland',
		author: 'Lewis Carroll',
		pageCount: 240,
		readStatus: true
	},
	{
		cover: 'wayofkings.png',
		title: 'The Way of Kings',
		author: 'Brandon Sanderson',
		pageCount: 1007,
		readStatus: true
	},
	{
		cover: 'wordsofradiance.jpg',
		title: 'Words of Radiance',
		author: 'Brandon Sanderson',
		pageCount: 1087,
		readStatus: true
	},
	{
		cover: 'oathbringer.jpg',
		title: 'Oathbringer',
		author: 'Brandon Sanderson',
		pageCount: 1248,
		readStatus: false
	},
	{
		cover: 'rhythmofwar.jpg',
		title: 'Rhythm of War',
		author: 'Brandon Sanderson',
		pageCount: 1232,
		readStatus: false
	}
];

const library =  document.getElementById('library');

function Book(cover, title, author, pageCount, status=false) {
	this.cover = cover
	this.title = title
	this.author = author
	this.pageCount = pageCount
	this.readStatus = status

	this.info = () => {
		infoString = `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.readStatus ? 'not read yet' : 'finished reading' }`;

		return infoString;
	}
}

// Book.prototype.info = () => {
// 	return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.readStatus ? 'not read yet' : 'finished reading' }`;
// }

function addBookToLibrary(cover, title, author, pageCount, status) {
	let newBook = new Book(cover, title, author, pageCount, status);
	myLibrary.push(newBook);
	displayBooks();
}


function displayBooks() {
	library.innerHTML = '';

	myLibrary.forEach(book => {
		const card = document.createElement('div');
		card.className = ('book');

		const cover = document.createElement('img');
		cover.className = ('book__cover');
		cover.setAttribute('src', `assets/img/${book.cover}`)

		const title = document.createElement('h2');
		title.className = ('book__title');
		title.innerText = book.title;

		// Create the body of the card

		const body = document.createElement('div');
		body.className = ('book__body');

		const author = document.createElement('p');
		author.className = ('book__author');
		author.innerText = book.author;

		const pageCount = document.createElement('p');
		pageCount.className = ('book__pages');
		pageCount.innerText = `Pages: ${book.pageCount}`;

		// The status

		const status = document.createElement('p');
		status.className = ('book__status');
		status.innerText = 'Read: ';

		const statusIcon = document.createElement('span');
		statusIcon.className = ('iconify');
		statusIcon.dataset.icon = book.readStatus ? 'mdi:check-circle' : 'mdi:checkbox-blank-circle';
		statusIcon.dataset.status = book.readStatus ? 'true' : 'false';

		status.appendChild(statusIcon);

		// add the elements to the body
		body.append(author, pageCount, status);

		// Create the actions
		const actions = document.createElement('div');
		actions.className = ('book__actions')

		const deleteBtn = document.createElement('button');
		deleteBtn.setAttribute('type', 'button');
		const deleteIcon = document.createElement('span');
		deleteIcon.className = ('iconify book__icon');
		deleteIcon.dataset.icon = 'mdi:delete';
		deleteBtn.append(deleteIcon);	

		const shareBtn = document.createElement('button');
		shareBtn.setAttribute('type', 'button');
		const shareIcon = document.createElement('span');
		shareIcon.className = ('iconify book__icon');
		shareIcon.dataset.icon = 'mdi:share-variant';
		shareBtn.append(shareIcon);

		actions.append(deleteBtn, shareBtn);

		card.append(cover, title, body, actions);

		card.dataset.read = book.readStatus ? 'true' : 'false';

		library.appendChild(card)
	})
}

// addBookToLibrary('eragon.png', 'Eragon', 'Christopher Paolini', '300', false);

// console.log(myLibrary[7].info());

displayBooks();


// Handle the form
const newBookForm = document.getElementById('newBookForm');

newBookForm.onsubmit = handleSubmit;

function handleSubmit(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const formProps = Object.fromEntries(formData);
	// console.log(formProps);

	addBookToLibrary(
		formProps.cover,
		formProps.title,
		formProps.author,
		formProps.pageCount,
		formProps.readStatus ? true : false
	)
	hideModal();
	newBookForm.reset()
}


// modal codes

const modal = document.getElementById('newBookModal');
const btn = document.getElementById('newBtn');
const closeBtn = document.getElementById('close-modal');

btn.onclick = () => {
	showModal();
}

closeBtn.onclick = () => {
	hideModal();
}


window.onclick = event => {
	if (event.target == modal) {
		hideModal();
	}
}

function showModal() {
	modal.style.display = 'block';
}

function hideModal() {
	modal.style.display = 'none';
}