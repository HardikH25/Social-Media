import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-background texture-noise flex flex-col justify-center px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="border-t-[8px] border-foreground pt-12">
          <div className="w-8 h-8 bg-foreground mb-12"></div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair text-foreground leading-[0.9] tracking-tighter mb-8">
            Social<br />Network
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24 border-t-2 border-foreground pt-12">
            <div>
              <p className="text-xl md:text-2xl font-source text-mutedForeground max-w-lg leading-relaxed">
                Connect seamlessly. Share effortlessly. Experience the absolute minimum in digital communication.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 md:justify-end items-start">
              <Link
                to="/signup"
                className="px-8 py-4 bg-foreground text-background font-mono uppercase tracking-widest text-sm border-2 border-foreground hover:bg-background hover:text-foreground transition-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-3"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-background text-foreground font-mono uppercase tracking-widest text-sm border-2 border-foreground hover:bg-foreground hover:text-background transition-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;
