import { NextResponse } from 'next/server';

// Define the Book type
interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

let books: Book[] = [
  { id: 1, title: 'Jannat k Patty', author: 'Nimra Ahmed', available: true },
  { id: 2, title: 'Peer-e-Kamil', author: 'Umera Ahmed', available: true },
  { id: 3, title: 'Ishq e Aatish', author: 'Sadia Rajpoot', available: true },
  { id: 4, title: 'Aag Ka Darya', author: 'Qurratulain Hyder', available: true },
  { id: 5, title: 'La Hasil', author: 'Umera Ahmed', available: true },
  { id: 6, title: 'Aab-e-Hayat', author: 'Umera Ahmed', available: true },
];

// GET request to retrieve all books
export async function GET() {
  return NextResponse.json(books);
}

// POST request to create a new book
export async function POST(req: Request) {
  try {
    const { title, author }: { title: string; author: string } = await req.json();
    if (!title || !author) {
      return NextResponse.json({ message: 'Title and author are required' }, { status: 400 });
    }

    const newBook: Book = {
      id: books.length ? books[books.length - 1].id + 1 : 1, 
      title,
      author,
      available: true, 
    };
    books = [...books, newBook]; 
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating book' }, { status: 500 });
  }
}

// PUT request to update a book by ID
export async function PUT(req: Request) {
  try {
    const { id, updatedTitle, updatedAuthor }: { id: number; updatedTitle: string; updatedAuthor: string } = await req.json();
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    books[bookIndex] = { id, title: updatedTitle, author: updatedAuthor, available: true }; 
    return NextResponse.json(books[bookIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating book' }, { status: 500 });
  }
}

// DELETE request to delete a book by ID
export async function DELETE(req: Request) {
  try {
    const { bookId }: { bookId: number } = await req.json();
    const bookToDeleteIndex = books.findIndex(book => book.id === bookId);
    if (bookToDeleteIndex === -1) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    books = books.filter(book => book.id !== bookId); 
    return NextResponse.json({ message: 'Book deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting book' }, { status: 500 });
  }
}
