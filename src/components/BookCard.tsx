import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "@/data/books";

interface BookCardProps {
  book: Book;
  showButton?: boolean;
}

const BookCard = ({ book, showButton = true }: BookCardProps) => {
  return (
    <Card className="group h-full overflow-hidden bg-card shadow-elegant hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start space-y-2">
        <h3 className="font-serif font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-1">
          by {book.author}
        </p>
        {showButton && (
          <Link to={`/book/${book.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full mt-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;