import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Books", path: "/books" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* VMB Logo */}
        <div className="flex items-center">
          <a
            href="https://baptistvmb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-serif font-bold bg-text-gradient bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            VMB
          </a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-foreground/80 hover:text-foreground transition-colors capitalize font-medium",
                location.pathname === item.path && "text-primary font-semibold"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm text-foreground/80 hover:text-foreground transition-colors capitalize",
                location.pathname === item.path && "text-primary font-semibold"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;