# Aikido Visual Builder

A stunning, AI-powered visual website builder with glassmorphism design, inspired by modern no-code platforms like Webflow, Bubble, and Aikido.dev.

## Features

### Phase 1: Core Architecture (Completed ✅)
- **Component Registry System**: Strict schema-based component definitions
- **Glassmorphism UI Components**: 14 production-ready components (Hero, Navbar, Features, CTA, Footer, Pricing, Form, etc.)
- **State Schema**: JSON-based page structure for efficient storage and manipulation
- **Renderer Engine**: Dynamic component rendering from JSON state

### Phase 2: AI & Visual Editor (Completed ✅)
- **AI-Powered Generation**: Natural language to page layouts using Google Gemini
- **Visual Editor**: Click-to-edit interface with real-time preview
- **Dynamic Properties Panel**: Auto-generated form inputs based on component schemas
- **Component Toolbar**: Add, remove, and manage components

### Phase 3: Security & Deployment (Pending)
- [ ] Serverless functions for secure API calls
- [ ] Firebase integration with security rules
- [ ] Export to HTML/JSX functionality
- [ ] One-click deploy to Vercel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animation**: Framer Motion
- **State Management**: Zustand
- **AI**: Google Gemini Pro
- **Database**: Firebase (planned)

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your Gemini API key (get one from: https://makersuite.google.com/app/apikey):

\`\`\`env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

Navigate to [http://localhost:3000/editor](http://localhost:3000/editor) to use the visual editor.

## Architecture

### Component Registry System

Every component is defined in `lib/registry/component-registry.ts` with:
- Type definition
- Properties schema
- Default props
- Category and metadata

### State Management

Pages are stored as JSON arrays of components:

\`\`\`typescript
{
  id: "page-1",
  components: [
    {
      id: "hero-1",
      type: "Hero",
      order: 0,
      props: {
        title: "Hello World",
        subtitle: "...",
        // ...
      }
    }
  ]
}
\`\`\`

### Renderer Engine

The `PageRenderer` component (`lib/renderer/PageRenderer.tsx`) loops through the JSON state and dynamically renders components.

## Available Components

1. **Hero** - Main hero section with CTA buttons
2. **Navbar** - Navigation bar with menu items
3. **Features** - Grid of features with icons
4. **CTA** - Call-to-action section
5. **Footer** - Footer with links and social media
6. **Pricing** - Pricing tiers with features
7. **Form** - Contact or signup form
8. **Testimonials** (Coming Soon)
9. **Gallery** (Coming Soon)
10. **Stats** (Coming Soon)
11. **Team** (Coming Soon)
12. **FAQ** (Coming Soon)
13. **LogoCloud** (Coming Soon)
14. **Newsletter** (Coming Soon)

## Glassmorphism Design

The project features a modern glassmorphism design with:
- Dark mode with neon accents (blue, purple, pink, green, yellow)
- Backdrop blur effects
- Glass-like transparency
- Animated gradient backgrounds
- Smooth transitions and hover effects

### Custom Tailwind Classes

- `.glass` - Light glassmorphism effect
- `.glass-strong` - Stronger glassmorphism effect
- `.neon-border` - Gradient neon border

## AI Generation

The platform uses Google Gemini to generate page layouts from natural language descriptions.

Example prompts:
- "A landing page for a SaaS product with hero, features, pricing, and footer"
- "Create a portfolio site with hero, gallery, about section, and contact form"
- "Build a startup landing page with dark mode and modern design"

## Project Structure

\`\`\`
.
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── editor/page.tsx    # Visual editor
│   └── layout.tsx         # Root layout
├── components/
│   ├── builder/           # Reusable UI components
│   └── editor/            # Editor-specific components
├── lib/
│   ├── types/             # TypeScript type definitions
│   ├── registry/          # Component registry
│   ├── renderer/          # Renderer engine
│   ├── store/             # Zustand state management
│   ├── ai/                # AI integration
│   └── utils/             # Utility functions
├── public/                # Static assets
└── tailwind.config.ts     # Tailwind configuration
\`\`\`

## Development Roadmap

### Phase 1: Core Architecture ✅
- [x] Component Registry
- [x] State Schema
- [x] Renderer Engine
- [x] Glassmorphism UI

### Phase 2: AI & Editor ✅
- [x] AI Integration (Gemini)
- [x] Visual Editor
- [x] Properties Panel
- [x] Component Toolbar

### Phase 3: Security & Deployment
- [ ] Serverless functions
- [ ] Firebase integration
- [ ] Export functionality
- [ ] One-click deploy

### Future Enhancements
- [ ] Logic/Action Engine (workflows)
- [ ] Multi-page support
- [ ] Template marketplace
- [ ] Collaboration features
- [ ] Custom component builder
- [ ] Responsive breakpoint editor

## Contributing

This project is built as a comprehensive visual builder platform. Contributions are welcome!

## License

MIT

## Credits

Built with inspiration from:
- Aikido.dev
- Webflow
- Bubble
- Framer

---

**Built with ❤️ using Next.js, TypeScript, and AI**
