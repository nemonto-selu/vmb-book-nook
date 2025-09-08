import HeroSection from "@/components/HeroSection";
import heroAbout from "@/assets/hero-about.jpg";

const About = () => {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection 
        image={heroAbout} 
        title="About Our Gallery"
        description="Discover the stories behind our carefully curated collection"
      />
      
      {/* Content Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            Welcome to our book gallery, a digital sanctuary where literature comes alive. 
            Our carefully curated collection represents some of the finest works in literary 
            history, each chosen for its enduring impact on readers and society.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            We believe that great books have the power to transform minds, inspire hearts, 
            and connect people across time and cultures. Our gallery serves as a bridge 
            between classic literature and modern readers, making these timeless works 
            accessible and engaging for new generations.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Whether you're a lifelong bibliophile or just beginning your literary journey, 
            we invite you to explore our collection and discover the stories that have 
            shaped our world. Each book in our gallery comes with detailed information 
            about its historical context, themes, and lasting influence.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;