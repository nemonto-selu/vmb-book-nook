import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getFeaturedBooks } from "@/data/books";
import heroHome from "@/assets/hero-home.jpg";

const Index = () => {
  const featuredBooks = getFeaturedBooks();

  return (
    <main>
      {/* Key Visual Block */}
      <HeroSection 
        image={heroHome} 
        title="Welcome to Our Literary Gallery"
        description="Discover timeless classics and literary masterpieces in our carefully curated collection. Each book tells a story that has shaped minds and hearts for generations."
      />
      
      {/* News Block - Weekly Book Recommendations */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Weekly Recommendations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our featured selections showcase the finest works in our collection. 
              These books are perfect starting points for your literary journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
