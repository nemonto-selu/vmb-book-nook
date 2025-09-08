import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getBookById } from "@/data/books";

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = bookId ? getBookById(bookId) : null;

  if (!book) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The book you're looking for doesn't exist.
          </p>
          <Link to="/books">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link to="/books" className="inline-flex items-center mb-8">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Button>
        </Link>

        {/* Book Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Book Cover */}
          <div className="lg:sticky lg:top-8">
            <div className="aspect-[3/4] max-w-md mx-auto overflow-hidden rounded-lg shadow-elegant">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-primary mb-4">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                by {book.author}
              </p>
              {book.year && (
                <p className="text-muted-foreground">
                  Published: {book.year}
                </p>
              )}
            </div>

            {book.volume && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Volume</h3>
                <p className="text-muted-foreground">{book.volume}</p>
              </div>
            )}

            {book.genre && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Genre</h3>
                <p className="text-muted-foreground">{book.genre}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {book.featured && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-accent-foreground font-medium">
                  ⭐ Featured in our weekly recommendations
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetails;