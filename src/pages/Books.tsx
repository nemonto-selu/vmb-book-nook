import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { books } from "@/data/books";
import heroBooks from "@/assets/hero-books.jpg";

const Books = () => {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection 
        image={heroBooks} 
        title="Our Collection"
        description="Explore our carefully curated selection of literary masterpieces"
      />
      
      {/* Books Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Books;