const newBookForm = document.getElementById('newBookForm');
const library =  document.getElementById('library');

const closeModalBtns = document.querySelectorAll('.closeModal');

const newBookModal = document.getElementById('newBookModal');
const openNewBookModalBtn = document.getElementById('newBtn');
// const closeNewBookModalBtn = document.getElementById('close-modal');

const deleteBookModal = document.getElementById('deleteBookModal');
// const closeDeleteModalBtn = document.getElementById('closeDeleteModal')

let myLibrary = [];

let books = [
	{
		cover: 'https://i.imgur.com/ABEnv78.jpg',
		title: 'The Hobbit',
		author: 'J.R.R. Tolkien',
		pageCount: 310,
		readStatus: false
	},
	{
		cover: 'https://i.imgur.com/RrWSYoo.jpg',
		title: 'A Study in Scarlet',
		author: 'Arthur Conan Doyle',
		pageCount: 160,
		readStatus: true
	},
	{
		cover: 'https://i.imgur.com/KO4moaJ.jpg',
		title: 'Alice in Wonderland',
		author: 'Lewis Carroll',
		pageCount: 240,
		readStatus: true
	},
	{
		cover: 'https://i.imgur.com/xcf8Qop.png',
		title: 'The Way of Kings',
		author: 'Brandon Sanderson',
		pageCount: 1007,
		readStatus: true
	},
	{
		cover: 'https://i.imgur.com/E2ax5e5.jpg',
		title: 'Words of Radiance',
		author: 'Brandon Sanderson',
		pageCount: 1087,
		readStatus: true
	},
	{
		cover: 'https://i.imgur.com/xX4FtQJ.jpg',
		title: 'Oathbringer',
		author: 'Brandon Sanderson',
		pageCount: 1248,
		readStatus: false
	},
	{
		cover: 'https://i.imgur.com/epi4een.jpg',
		title: 'Rhythm of War',
		author: 'Brandon Sanderson',
		pageCount: 1232,
		readStatus: false
	}
];

// Test books for the library
books.forEach( book => {
	addBookToLibrary(
		book.cover,
		book.title,
		book.author,
		book.pageCount,
		book.readStatus
	)
})


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

	this.changeReadStatus = () => {
		this.readStatus = !this.readStatus;
		// displayBooks();
	}
}


function addBookToLibrary(cover, title, author, pageCount, status) {
	let newBook = new Book(cover, title, author, pageCount, status);
	myLibrary.push(newBook);
	displayBooks();
}

function deleteBook(index) {
	console.log(`delete book: ${myLibrary[index].title}`)
	// Bad practice
	myLibrary.splice(index, 1);
	displayBooks();

	hideModal(deleteBookModal);
}

function displayBooks() {
	library.innerHTML = '';

	myLibrary.forEach( (book, index) => {
		const card = document.createElement('div');
		card.className = ('book');
		card.dataset.index = index;

		const cover = document.createElement('img');
		cover.className = ('book__cover');
		// cover.setAttribute('src', `assets/img/${book.cover}`)
		cover.setAttribute('src', book.cover);

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

		// const status = document.createElement('p');
		// status.className = ('book__status');
		// status.innerText = 'Read: ';

		// const statusIcon = document.createElement('span');
		// statusIcon.className = ('iconify');
		// statusIcon.dataset.icon = book.readStatus ? 'mdi:check-circle' : 'mdi:checkbox-blank-circle';
		// statusIcon.dataset.status = book.readStatus ? 'true' : 'false';

		// status.appendChild(statusIcon);

		// add the elements to the body
		body.append(author, pageCount);

		// Create the actions
		const actions = document.createElement('div');
		actions.className = ('book__actions')

		// mark as read

		const readToggle = document.createElement('div');
		readToggle.className = ('toggle');

		const label = document.createElement('p');
		label.innerText = 'Read?';

		const toggleSwitch = document.createElement('label');
		toggleSwitch.className = ('switch');

		const toggleCheck = document.createElement('input');
		toggleCheck.setAttribute('type', 'checkbox');
		toggleCheck.setAttribute('name', 'readStatus');
		if (book.readStatus) {
			toggleCheck.setAttribute('checked', '');
		}

		toggleCheck.onchange = () => {
			book.changeReadStatus();
			card.dataset.read = book.readStatus ? 'true' : 'false';
		}


		const slider = document.createElement('span');
		slider.className = ('slider');

		toggleSwitch.append(toggleCheck, slider);

		readToggle.append(label, toggleSwitch);


		// delete
		const deleteBtn = document.createElement('button');
		deleteBtn.setAttribute('type', 'button');
		const deleteIcon = document.createElement('span');
		deleteIcon.className = ('iconify book__icon book__icon--delete');
		deleteIcon.dataset.icon = 'mdi:delete';
		deleteBtn.append(deleteIcon);	
		deleteBtn.dataset.index = index;
		
		// Open a confirm delete modal and associate the confirm 
		// button with the correct book.
		deleteBtn.onclick = () => {
			const confirmDelete = document.getElementById('modalDeleteBtn');

			confirmDelete.onclick = () => {
				deleteBook(index);
				// hideModal(deleteBookModal);
			}

			showModal(deleteBookModal);
		};

		const shareBtn = document.createElement('button');
		shareBtn.setAttribute('type', 'button');
		const shareIcon = document.createElement('span');
		shareIcon.className = ('iconify book__icon book__icon--share');
		shareIcon.dataset.icon = 'mdi:share-variant';
		shareBtn.append(shareIcon);

		actions.append(readToggle, deleteBtn, shareBtn);

		card.append(cover, title, body, actions);

		card.dataset.read = book.readStatus ? 'true' : 'false';

		library.appendChild(card)
	})
}

displayBooks();


// Add new books with modal form
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
	hideModal(newBookModal);
	newBookForm.reset()
}

// Modal
openNewBookModalBtn.onclick = () => {
	showModal(newBookModal);
}


closeModalBtns.forEach(btn => {
	btn.onclick = () => {
		hideModal(window[btn.dataset.modal])
		// Instead of using the variable name try creating
		// an object with all the modals and referencing that one
	}
})


// window.onclick = event => {
// 	if (event.target == modal) {
// 		hideModal(newBookModal);
// 	}
// }

function showModal(modal) {
	modal.style.display = 'block';
}

function hideModal(modal) {
	// const modalContent = document.querySelector('.modal__content');
	const modalContent = modal.getElementsByClassName('modal__content')[0];

	modalContent.setAttribute('closing', '');

	modalContent.addEventListener('animationend', () => {
		modal.style.display = 'none';
		modalContent.removeAttribute('closing');
	}, {once: true});

}