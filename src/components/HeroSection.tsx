import { cn } from "@/lib/utils";

interface HeroSectionProps {
  image: string;
  title?: string;
  description?: string;
  className?: string;
  overlay?: boolean;
}

const HeroSection = ({ 
  image, 
  title, 
  description, 
  className,
  overlay = true 
}: HeroSectionProps) => {
  return (
    <section className={cn("relative w-full h-[60vh] min-h-[400px] overflow-hidden", className)}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent" />
      )}
      
      {/* Content */}
      {(title || description) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            {title && (
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;