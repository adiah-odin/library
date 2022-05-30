let myLibrary = [
	{
		title: 'Hobbit',
		author: 'Tokien',
		pageCount: 200,
		readStatus: false
	},
	{
		title: 'Eragon',
		author: 'Paolini',
		pageCount: 200,
		readStatus: true
	}
];

const library =  document.getElementById('library');

function Book(title, author, pages, status) {
	this.title = title
	this.author = author
	this.pageCount = pages
	this.readStatus = status

	this.info = () => {
		infoString = `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.readStatus ? 'not read yet' : 'finished reading' }`;

		return infoString;
	}
}

function addBookToLibrary(title, author, pages, status) {
	let newBook = new Book(title, author, pages, status);
	myLibrary.push(newBook);
}


function displayBooks() {
	library.innerHTML = '';

	myLibrary.forEach(book => {
		const card = document.createElement('div');
		card.className = ('book')

		const title = document.createElement('h2');
		title.innerText = book.title;

		const author = document.createElement('p');
		author.className = ('book__author');
		author.innerText = book.author;

		const pageCount = document.createElement('p');
		pageCount.innerText = book.pageCount;

		const status = document.createElement('span');
		status.className = ('iconify');
		status.dataset.icon = book.readStatus ? 'mdi:check-circle' : 'mdi:checkbox-blank-circle';

		card.append(title, author, pageCount, status);

		library.appendChild(card)
	})
}

// displayBooks();