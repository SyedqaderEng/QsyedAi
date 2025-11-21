import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Syed.AI Visual Builder
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build stunning websites with AI-powered visual editing. No code required.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/editor"
                className="glass-strong px-8 py-4 rounded-xl text-white font-semibold hover:shadow-neon-blue transition-all duration-300 hover:scale-105"
              >
                Launch Editor
              </Link>
              <Link
                href="/examples"
                className="glass px-8 py-4 rounded-xl text-white font-semibold hover:shadow-neon-purple transition-all duration-300 hover:scale-105"
              >
                View Examples
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="glass p-8 rounded-2xl hover:glass-strong transition-all duration-300 hover:scale-105 hover:shadow-neon-blue"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-neon-blue">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "🎨",
    title: "AI-Powered Design",
    description: "Generate beautiful layouts with natural language. Just describe what you want."
  },
  {
    icon: "✨",
    title: "Glassmorphism UI",
    description: "Modern design with stunning glass effects, neon accents, and dark mode."
  },
  {
    icon: "⚡",
    title: "Visual Editor",
    description: "Click to edit. Real-time preview. No code required. Export anytime."
  },
  {
    icon: "🔧",
    title: "Component Registry",
    description: "Reusable, production-ready components with full schema definitions."
  },
  {
    icon: "🚀",
    title: "One-Click Deploy",
    description: "Publish your site to Vercel with a single click. No configuration needed."
  },
  {
    icon: "🔒",
    title: "Secure & Scalable",
    description: "Built with Firebase, serverless functions, and enterprise-grade security."
  }
];
