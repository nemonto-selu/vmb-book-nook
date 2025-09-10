import gatsbyImg from "@/assets/book-gatsby.jpg";
import mockingbirdImg from "@/assets/book-mockingbird.jpg";
import orwellImg from "@/assets/book-1984.jpg";
import prideImg from "@/assets/book-pride.jpg";
import catcherImg from "@/assets/book-catcher.jpg";
import fliesImg from "@/assets/book-flies.jpg";
import nobtsImg from "@/assets/book-nobts.jpg"

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  volume?: string;
  year?: number;
  genre?: string;
  featured?: boolean;
}

export const books: Book[] = [
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: gatsbyImg,
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway and his mysterious neighbor Jay Gatsby.",
    volume: "First Edition",
    year: 1925,
    genre: "Literary Fiction",
    featured: true,
  },
  {
    id: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: mockingbirdImg,
    description: "A powerful story of racial injustice and childhood innocence in the American South, told through the perspective of Scout Finch as her father defends a black man accused of rape.",
    volume: "Commemorative Edition",
    year: 1960,
    genre: "Literary Fiction",
    featured: true,
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    cover: orwellImg,
    description: "A dystopian novel about totalitarian control, surveillance, and the struggle for truth and freedom in a society where Big Brother watches everything.",
    volume: "Deluxe Edition",
    year: 1949,
    genre: "Dystopian Fiction",
    featured: true,
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: prideImg,
    description: "A romantic novel that critiques the British landed gentry at the end of the 18th century, following Elizabeth Bennet as she deals with issues of marriage, money, and prejudice.",
    volume: "Annotated Edition",
    year: 1813,
    genre: "Romance",
    featured: false,
  },
  {
    id: "the-catcher-in-the-rye",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: catcherImg,
    description: "A coming-of-age story following Holden Caulfield, a teenager who has been expelled from prep school and spends several days wandering New York City.",
    volume: "First Edition Reprint",
    year: 1951,
    genre: "Literary Fiction",
    featured: false,
  },
  {
    id: "lord-of-the-flies",
    title: "Lord of the Flies",
    author: "William Golding",
    cover: fliesImg,
    description: "A novel about a group of British boys stranded on an uninhabited island and their attempt to govern themselves, exploring themes of civilization and human nature.",
    volume: "Educational Edition",
    year: 1954,
    genre: "Literary Fiction",
    featured: false,
  },
    {
    id: "nobts-style-guide",
    title: "NOBTS Style Guide",
    author: "Eddie Campbell",
    cover: fliesImg,
    description: "NOBTS/ LEAVELL COLLEGE MANUAL OF FORM & S TYLE",
    volume: "Educational Edition",
    year: 2019,
    genre: "Writing",
    featured: false,
  },
];

export const getFeaturedBooks = () => books.filter(book => book.featured);
export const getBookById = (id: string) => books.find(book => book.id === id);
export const getBookByTitle = (title: string) => books.find(book => 
  book.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
);