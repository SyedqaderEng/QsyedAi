import { ComponentSchema, ComponentType } from '@/lib/types/component';

/**
 * PHASE 1.1: Component Registry
 *
 * This is the master registry that defines EVERY component the AI and users can use.
 * Each component has a strict schema defining its properties and default values.
 */

export const COMPONENT_REGISTRY: Record<ComponentType, ComponentSchema> = {
  Hero: {
    type: 'Hero',
    name: 'Hero Section',
    description: 'Main hero section with title, subtitle, and CTA buttons',
    category: 'hero',
    icon: '🚀',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Title',
        defaultValue: 'Build Stunning Websites',
        required: true,
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Subtitle',
        defaultValue: 'Create beautiful, modern websites with AI-powered tools',
        required: false,
      },
      {
        name: 'ctaText',
        type: 'string',
        label: 'CTA Button Text',
        defaultValue: 'Get Started',
        required: false,
      },
      {
        name: 'ctaUrl',
        type: 'url',
        label: 'CTA Button URL',
        defaultValue: '#',
        required: false,
      },
      {
        name: 'secondaryCtaText',
        type: 'string',
        label: 'Secondary CTA Text',
        defaultValue: 'Learn More',
        required: false,
      },
      {
        name: 'secondaryCtaUrl',
        type: 'url',
        label: 'Secondary CTA URL',
        defaultValue: '#',
        required: false,
      },
      {
        name: 'align',
        type: 'select',
        label: 'Alignment',
        defaultValue: 'center',
        options: ['left', 'center', 'right'],
      },
      {
        name: 'backgroundStyle',
        type: 'select',
        label: 'Background Style',
        defaultValue: 'gradient',
        options: ['gradient', 'glass', 'solid'],
      },
    ],
    defaultProps: {
      title: 'Build Stunning Websites',
      subtitle: 'Create beautiful, modern websites with AI-powered tools',
      ctaText: 'Get Started',
      ctaUrl: '#',
      secondaryCtaText: 'Learn More',
      secondaryCtaUrl: '#',
      align: 'center',
      backgroundStyle: 'gradient',
    },
  },

  Navbar: {
    type: 'Navbar',
    name: 'Navigation Bar',
    description: 'Top navigation bar with logo and menu items',
    category: 'navigation',
    icon: '📱',
    properties: [
      {
        name: 'logo',
        type: 'string',
        label: 'Logo Text',
        defaultValue: 'Brand',
        required: true,
      },
      {
        name: 'menuItems',
        type: 'string',
        label: 'Menu Items (comma-separated)',
        defaultValue: 'Home,Features,Pricing,Contact',
        required: true,
      },
      {
        name: 'ctaText',
        type: 'string',
        label: 'CTA Button Text',
        defaultValue: 'Sign Up',
        required: false,
      },
      {
        name: 'ctaUrl',
        type: 'url',
        label: 'CTA Button URL',
        defaultValue: '#',
        required: false,
      },
      {
        name: 'transparent',
        type: 'boolean',
        label: 'Transparent Background',
        defaultValue: false,
      },
    ],
    defaultProps: {
      logo: 'Brand',
      menuItems: 'Home,Features,Pricing,Contact',
      ctaText: 'Sign Up',
      ctaUrl: '#',
      transparent: false,
    },
  },

  Features: {
    type: 'Features',
    name: 'Features Grid',
    description: 'Grid of features with icons and descriptions',
    category: 'content',
    icon: '✨',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Section Title',
        defaultValue: 'Amazing Features',
        required: false,
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Section Subtitle',
        defaultValue: 'Everything you need to succeed',
        required: false,
      },
      {
        name: 'columns',
        type: 'select',
        label: 'Number of Columns',
        defaultValue: '3',
        options: ['2', '3', '4'],
      },
      {
        name: 'style',
        type: 'select',
        label: 'Card Style',
        defaultValue: 'glass',
        options: ['glass', 'solid', 'bordered'],
      },
    ],
    defaultProps: {
      title: 'Amazing Features',
      subtitle: 'Everything you need to succeed',
      columns: '3',
      style: 'glass',
      features: [
        {
          icon: '⚡',
          title: 'Lightning Fast',
          description: 'Optimized for speed and performance',
        },
        {
          icon: '🎨',
          title: 'Beautiful Design',
          description: 'Modern and elegant user interface',
        },
        {
          icon: '🔒',
          title: 'Secure',
          description: 'Enterprise-grade security built-in',
        },
      ],
    },
  },

  CTA: {
    type: 'CTA',
    name: 'Call to Action',
    description: 'Call-to-action section with button',
    category: 'marketing',
    icon: '📣',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Title',
        defaultValue: 'Ready to get started?',
        required: true,
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Subtitle',
        defaultValue: 'Join thousands of satisfied customers',
        required: false,
      },
      {
        name: 'buttonText',
        type: 'string',
        label: 'Button Text',
        defaultValue: 'Get Started Now',
        required: true,
      },
      {
        name: 'buttonUrl',
        type: 'url',
        label: 'Button URL',
        defaultValue: '#',
        required: false,
      },
      {
        name: 'style',
        type: 'select',
        label: 'Style',
        defaultValue: 'centered',
        options: ['centered', 'split', 'minimal'],
      },
    ],
    defaultProps: {
      title: 'Ready to get started?',
      subtitle: 'Join thousands of satisfied customers',
      buttonText: 'Get Started Now',
      buttonUrl: '#',
      style: 'centered',
    },
  },

  Footer: {
    type: 'Footer',
    name: 'Footer',
    description: 'Footer with links and social media',
    category: 'footer',
    icon: '📄',
    properties: [
      {
        name: 'companyName',
        type: 'string',
        label: 'Company Name',
        defaultValue: 'Your Company',
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        defaultValue: 'Building the future, one line at a time.',
        required: false,
      },
      {
        name: 'columns',
        type: 'string',
        label: 'Link Columns (JSON format)',
        defaultValue: JSON.stringify([
          { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers'] },
        ]),
        required: false,
      },
      {
        name: 'showSocial',
        type: 'boolean',
        label: 'Show Social Media Links',
        defaultValue: true,
      },
    ],
    defaultProps: {
      companyName: 'Your Company',
      description: 'Building the future, one line at a time.',
      columns: [
        { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
        { title: 'Company', links: ['About', 'Blog', 'Careers'] },
      ],
      showSocial: true,
    },
  },

  Pricing: {
    type: 'Pricing',
    name: 'Pricing Section',
    description: 'Pricing tiers with features',
    category: 'marketing',
    icon: '💰',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Section Title',
        defaultValue: 'Simple, Transparent Pricing',
        required: false,
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Section Subtitle',
        defaultValue: 'Choose the plan that works for you',
        required: false,
      },
      {
        name: 'billingPeriod',
        type: 'select',
        label: 'Billing Period',
        defaultValue: 'monthly',
        options: ['monthly', 'yearly', 'both'],
      },
    ],
    defaultProps: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that works for you',
      billingPeriod: 'monthly',
      plans: [
        {
          name: 'Starter',
          price: '$9',
          period: 'month',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          highlighted: false,
        },
        {
          name: 'Pro',
          price: '$29',
          period: 'month',
          features: ['All Starter features', 'Feature 4', 'Feature 5', 'Priority support'],
          highlighted: true,
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['All Pro features', 'Custom integration', 'Dedicated support', 'SLA'],
          highlighted: false,
        },
      ],
    },
  },

  Testimonials: {
    type: 'Testimonials',
    name: 'Testimonials',
    description: 'Customer testimonials section',
    category: 'marketing',
    icon: '💬',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Section Title',
        defaultValue: 'What Our Customers Say',
        required: false,
      },
      {
        name: 'layout',
        type: 'select',
        label: 'Layout',
        defaultValue: 'grid',
        options: ['grid', 'carousel', 'masonry'],
      },
    ],
    defaultProps: {
      title: 'What Our Customers Say',
      layout: 'grid',
      testimonials: [
        {
          quote: 'This product changed our workflow completely!',
          author: 'John Doe',
          role: 'CEO at TechCorp',
          avatar: '',
        },
      ],
    },
  },

  Form: {
    type: 'Form',
    name: 'Contact Form',
    description: 'Contact or signup form',
    category: 'form',
    icon: '📝',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Form Title',
        defaultValue: 'Get in Touch',
        required: false,
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Form Subtitle',
        defaultValue: 'We\'d love to hear from you',
        required: false,
      },
      {
        name: 'fields',
        type: 'string',
        label: 'Form Fields (comma-separated)',
        defaultValue: 'name,email,message',
        required: true,
      },
      {
        name: 'submitText',
        type: 'string',
        label: 'Submit Button Text',
        defaultValue: 'Send Message',
        required: true,
      },
      {
        name: 'style',
        type: 'select',
        label: 'Form Style',
        defaultValue: 'glass',
        options: ['glass', 'solid', 'minimal'],
      },
    ],
    defaultProps: {
      title: 'Get in Touch',
      subtitle: 'We\'d love to hear from you',
      fields: 'name,email,message',
      submitText: 'Send Message',
      style: 'glass',
    },
  },

  Gallery: {
    type: 'Gallery',
    name: 'Image Gallery',
    description: 'Image gallery with grid layout',
    category: 'content',
    icon: '🖼️',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Gallery Title',
        defaultValue: 'Our Work',
        required: false,
      },
      {
        name: 'columns',
        type: 'select',
        label: 'Columns',
        defaultValue: '3',
        options: ['2', '3', '4', '5'],
      },
      {
        name: 'aspectRatio',
        type: 'select',
        label: 'Aspect Ratio',
        defaultValue: 'square',
        options: ['square', 'landscape', 'portrait'],
      },
    ],
    defaultProps: {
      title: 'Our Work',
      columns: '3',
      aspectRatio: 'square',
      images: [],
    },
  },

  Stats: {
    type: 'Stats',
    name: 'Statistics',
    description: 'Display key statistics',
    category: 'content',
    icon: '📊',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Section Title',
        defaultValue: 'By The Numbers',
        required: false,
      },
      {
        name: 'layout',
        type: 'select',
        label: 'Layout',
        defaultValue: 'horizontal',
        options: ['horizontal', 'vertical', 'grid'],
      },
    ],
    defaultProps: {
      title: 'By The Numbers',
      layout: 'horizontal',
      stats: [
        { value: '10K+', label: 'Active Users' },
        { value: '50M+', label: 'API Calls' },
        { value: '99.9%', label: 'Uptime' },
        { value: '24/7', label: 'Support' },
      ],
    },
  },

  Team: {
    type: 'Team',
    name: 'Team Section',
    description: 'Team members display',
    category: 'content',
    icon: '👥',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Section Title',
        defaultValue: 'Meet Our Team',
        required: false,
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Section Subtitle',
        defaultValue: 'The people behind the magic',
        required: false,
      },
      {
        name: 'columns',
        type: 'select',
        label: 'Columns',
        defaultValue: '4',
        options: ['2', '3', '4', '5'],
      },
    ],
    defaultProps: {
      title: 'Meet Our Team',
      subtitle: 'The people behind the magic',
      columns: '4',
      members: [],
    },
  },

  FAQ: {
    type: 'FAQ',
    name: 'FAQ Section',
    description: 'Frequently asked questions',
    category: 'content',
    icon: '❓',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Section Title',
        defaultValue: 'Frequently Asked Questions',
        required: false,
      },
      {
        name: 'layout',
        type: 'select',
        label: 'Layout',
        defaultValue: 'accordion',
        options: ['accordion', 'grid', 'list'],
      },
    ],
    defaultProps: {
      title: 'Frequently Asked Questions',
      layout: 'accordion',
      faqs: [
        {
          question: 'How does it work?',
          answer: 'It works by combining AI with modern web technologies.',
        },
      ],
    },
  },

  LogoCloud: {
    type: 'LogoCloud',
    name: 'Logo Cloud',
    description: 'Display partner or client logos',
    category: 'marketing',
    icon: '🏢',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Section Title',
        defaultValue: 'Trusted by Industry Leaders',
        required: false,
      },
      {
        name: 'grayscale',
        type: 'boolean',
        label: 'Grayscale Logos',
        defaultValue: true,
      },
    ],
    defaultProps: {
      title: 'Trusted by Industry Leaders',
      grayscale: true,
      logos: [],
    },
  },

  Newsletter: {
    type: 'Newsletter',
    name: 'Newsletter Signup',
    description: 'Newsletter subscription form',
    category: 'form',
    icon: '📧',
    properties: [
      {
        name: 'title',
        type: 'string',
        label: 'Title',
        defaultValue: 'Subscribe to Our Newsletter',
        required: true,
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'Subtitle',
        defaultValue: 'Get the latest updates delivered to your inbox',
        required: false,
      },
      {
        name: 'placeholder',
        type: 'string',
        label: 'Email Placeholder',
        defaultValue: 'Enter your email',
        required: false,
      },
      {
        name: 'buttonText',
        type: 'string',
        label: 'Button Text',
        defaultValue: 'Subscribe',
        required: true,
      },
      {
        name: 'style',
        type: 'select',
        label: 'Style',
        defaultValue: 'inline',
        options: ['inline', 'stacked', 'minimal'],
      },
    ],
    defaultProps: {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Get the latest updates delivered to your inbox',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      style: 'inline',
    },
  },
};

/**
 * Helper function to get a component schema by type
 */
export function getComponentSchema(type: ComponentType): ComponentSchema | undefined {
  return COMPONENT_REGISTRY[type];
}

/**
 * Helper function to get all available components
 */
export function getAllComponents(): ComponentSchema[] {
  return Object.values(COMPONENT_REGISTRY);
}

/**
 * Helper function to get components by category
 */
export function getComponentsByCategory(category: ComponentSchema['category']): ComponentSchema[] {
  return getAllComponents().filter(comp => comp.category === category);
}
