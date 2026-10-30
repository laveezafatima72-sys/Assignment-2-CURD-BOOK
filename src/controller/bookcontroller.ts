
import { Request, Response } from "express";

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
}

let books: Book[] = [
    { id: 1, title: "Physics", author: "David Halliday", price: 600 },
    { id: 2, title: "Atomic Habits", author: "James Clear", price: 800 }
];

export const getBooks = (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Books retrieved successfully",
        books: books
    });
};

export const getBookById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    return res.status(200).json({
        message: "Book found successfully",
        book: book
    });
};

export const addBook = (req: Request, res: Response) => {
    const { title, author, price } = req.body;

    if (!title || !author || price === undefined) {
        return res.status(400).json({
            message: "Please provide title, author and price"
        });
    }
    let nextId = 1;

books.forEach((book) => {
    if (book.id >= nextId) {
        nextId = book.id + 1;
    }
});


    const newBook: Book = {
        id: nextId,
        title: title,
        author: author,
        price: Number(price)
    };

    books.push(newBook);

    return res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
};

export const updateBook = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, price } = req.body;

    if (title !== undefined) {
        book.title = title;
    }

    if (author !== undefined) {
        book.author = author;
    }

    if (price !== undefined) {
        book.price = Number(price);
    }

    return res.status(200).json({
        message: "Book updated successfully",
        book: book
    });
};

export const deleteBook = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    return res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
};
