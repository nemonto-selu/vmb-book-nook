import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-serif font-bold text-primary">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
