import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import heroImage1 from "../assets/hero1.jpg";
import heroImage2 from "../assets/hero2.webp";
import heroImage3 from "../assets/hero3.webp";
import heroImage4 from "../assets/hero4.avif";
import heroImage5 from "../assets/hero5.avif";
export default function HeroSection() {
  const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];

  return (
    <section className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        interval={4000}
        swipeable
      >
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="relative h-[70vh] min-h-[500px] bg-center bg-cover"
            style={{ backgroundImage: `url(${image})` }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content (same for all slides) */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-center">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                  Discover Amazing Products
                </h1>
                <p className="text-lg lg:text-xl mb-6">
                  Explore high-quality gadgets and accessories at the best prices.
                </p>

                <div className="flex gap-4">
                  <button className="bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                    Shop Now
                  </button>
                  <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                    40% Discount
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
