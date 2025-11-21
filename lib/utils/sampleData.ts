import { PageState } from '@/lib/types/component';

/**
 * Sample page data for demonstration and testing
 */

export const samplePage: PageState = {
  id: 'sample-page-1',
  name: 'Landing Page',
  slug: 'landing',
  components: [
    {
      id: 'navbar-1',
      type: 'Navbar',
      order: 0,
      props: {
        logo: 'Syed.AI',
        menuItems: 'Features,Pricing,About,Contact',
        ctaText: 'Get Started',
        ctaUrl: '#hero',
        transparent: true,
      },
    },
    {
      id: 'hero-1',
      type: 'Hero',
      order: 1,
      props: {
        title: 'Build Stunning Websites with AI',
        subtitle: 'Create beautiful, modern websites in minutes using our AI-powered visual builder with glassmorphism design',
        ctaText: 'Start Building',
        ctaUrl: '/editor',
        secondaryCtaText: 'Watch Demo',
        secondaryCtaUrl: '#demo',
        align: 'center',
        backgroundStyle: 'gradient',
      },
    },
    {
      id: 'features-1',
      type: 'Features',
      order: 2,
      props: {
        title: 'Powerful Features',
        subtitle: 'Everything you need to build professional websites',
        columns: '3',
        style: 'glass',
        features: [
          {
            icon: '🎨',
            title: 'AI-Powered Design',
            description: 'Generate beautiful layouts with natural language. Just describe what you want.',
          },
          {
            icon: '✨',
            title: 'Glassmorphism UI',
            description: 'Modern design with stunning glass effects, neon accents, and dark mode.',
          },
          {
            icon: '⚡',
            title: 'Real-Time Editor',
            description: 'Click to edit. See changes instantly. No code required.',
          },
          {
            icon: '🔧',
            title: 'Component Library',
            description: 'Production-ready components with full schema definitions.',
          },
          {
            icon: '🚀',
            title: 'One-Click Deploy',
            description: 'Publish your site to Vercel with a single click.',
          },
          {
            icon: '🔒',
            title: 'Secure & Scalable',
            description: 'Built with Firebase and enterprise-grade security.',
          },
        ],
      },
    },
    {
      id: 'pricing-1',
      type: 'Pricing',
      order: 3,
      props: {
        title: 'Simple, Transparent Pricing',
        subtitle: 'Choose the plan that works for you',
        billingPeriod: 'monthly',
        plans: [
          {
            name: 'Starter',
            price: '$9',
            period: 'month',
            features: ['5 Projects', '100 Components', 'Basic Templates', 'Community Support'],
            highlighted: false,
          },
          {
            name: 'Pro',
            price: '$29',
            period: 'month',
            features: ['Unlimited Projects', 'All Components', 'Premium Templates', 'AI Generation', 'Priority Support'],
            highlighted: true,
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            features: ['Everything in Pro', 'Custom Components', 'Dedicated Support', 'SLA Guarantee', 'White Label'],
            highlighted: false,
          },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'CTA',
      order: 4,
      props: {
        title: 'Ready to Build Something Amazing?',
        subtitle: 'Join thousands of creators building the web of tomorrow',
        buttonText: 'Start Free Trial',
        buttonUrl: '/signup',
        style: 'centered',
      },
    },
    {
      id: 'footer-1',
      type: 'Footer',
      order: 5,
      props: {
        companyName: 'Syed.AI',
        description: 'Building the future of web design, one component at a time.',
        columns: [
          {
            title: 'Product',
            links: ['Features', 'Pricing', 'Templates', 'API'],
          },
          {
            title: 'Company',
            links: ['About', 'Blog', 'Careers', 'Press'],
          },
          {
            title: 'Resources',
            links: ['Documentation', 'Guides', 'Support', 'Community'],
          },
        ],
        showSocial: true,
      },
    },
  ],
  metadata: {
    title: 'Syed.AI Visual Builder - AI-Powered Website Builder',
    description: 'Build stunning websites with AI-powered visual editor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};
