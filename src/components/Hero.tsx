import heroImg from "@/assets/hero-food.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Delicious gourmet food"
          width={1536}
          height={1024}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      <div className="container relative mx-auto px-4 py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Fresh • Fast • Flavorful
          </span>
          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Crave it.
            <br />
            <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
              Order it.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">
            Discover handcrafted burgers, wood-fired pizzas, and sweet treats — all delivered hot
            to your door from FoodieHub.
          </p>
          <a
            href="#menu"
            className="mt-8 inline-flex items-center rounded-full bg-gradient-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-105"
          >
            Explore Menu
          </a>
        </div>
      </div>
    </section>
  );
}
