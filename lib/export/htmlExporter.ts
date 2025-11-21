import { PageState, PageComponent } from '@/lib/types/component';
import { getComponentSchema } from '@/lib/registry/component-registry';

/**
 * PHASE 3.3: Export Functionality
 *
 * Converts the JSON page state into standalone HTML/JSX files
 */

/**
 * Generate standalone HTML from page state
 */
export function exportToHTML(page: PageState): string {
  const componentsHTML = page.components
    .sort((a, b) => a.order - b.order)
    .map(component => generateComponentHTML(component))
    .join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.metadata.title}</title>
  <meta name="description" content="${page.metadata.description}">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --background: #0a0a0f;
      --foreground: #ffffff;
    }

    body {
      color: var(--foreground);
      background: var(--background);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }

    .glass {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .glass-strong {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  </style>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            'neon-blue': '#00D9FF',
            'neon-purple': '#B435F5',
            'neon-pink': '#FF006B',
            'neon-green': '#00FF94',
            'neon-yellow': '#FFE600',
          }
        }
      }
    }
  </script>
</head>
<body class="dark">
  ${componentsHTML}
</body>
</html>`;
}

/**
 * Generate HTML for a single component
 */
function generateComponentHTML(component: PageComponent): string {
  const { type, props } = component;

  switch (type) {
    case 'Hero':
      return generateHeroHTML(props);
    case 'Navbar':
      return generateNavbarHTML(props);
    case 'Features':
      return generateFeaturesHTML(props);
    case 'CTA':
      return generateCTAHTML(props);
    case 'Footer':
      return generateFooterHTML(props);
    case 'Pricing':
      return generatePricingHTML(props);
    case 'Form':
      return generateFormHTML(props);
    case 'Testimonials':
      return generateTestimonialsHTML(props);
    case 'Stats':
      return generateStatsHTML(props);
    case 'Newsletter':
      return generateNewsletterHTML(props);
    case 'FAQ':
      return generateFAQHTML(props);
    case 'Gallery':
      return generateGalleryHTML(props);
    case 'Team':
      return generateTeamHTML(props);
    case 'LogoCloud':
      return generateLogoCloudHTML(props);
    default:
      return `<!-- ${type} component not yet supported in export -->`;
  }
}

function generateHeroHTML(props: any): string {
  const alignClasses: Record<string, string> = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };
  const alignClass = alignClasses[props.align || 'center'];

  return `
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
  <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl animate-float"></div>
  <div class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>

  <div class="relative z-10 container mx-auto px-6 py-20">
    <div class="flex flex-col ${alignClass} max-w-5xl mx-auto">
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        ${props.title}
      </h1>
      ${props.subtitle ? `<p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">${props.subtitle}</p>` : ''}
      ${props.ctaText ? `
      <div class="flex flex-wrap gap-4 mt-4">
        <a href="${props.ctaUrl || '#'}" class="glass-strong px-8 py-4 rounded-xl text-white font-semibold hover:scale-105 transition-all">
          ${props.ctaText}
        </a>
        ${props.secondaryCtaText ? `
        <a href="${props.secondaryCtaUrl || '#'}" class="glass px-8 py-4 rounded-xl text-white font-semibold hover:scale-105 transition-all">
          ${props.secondaryCtaText}
        </a>
        ` : ''}
      </div>
      ` : ''}
    </div>
  </div>
</section>`;
}

function generateNavbarHTML(props: any): string {
  const items = props.menuItems.split(',').map((item: string) => item.trim());

  return `
<nav class="fixed top-0 left-0 right-0 z-50 glass-strong backdrop-blur-lg">
  <div class="container mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        ${props.logo}
      </div>
      <div class="hidden md:flex items-center gap-8">
        ${items.map((item: string) => `
        <a href="#${item.toLowerCase()}" class="text-gray-300 hover:text-cyan-400 transition-colors">${item}</a>
        `).join('')}
        ${props.ctaText ? `
        <a href="${props.ctaUrl || '#'}" class="glass px-6 py-2 rounded-lg text-white font-semibold hover:scale-105 transition-all">
          ${props.ctaText}
        </a>
        ` : ''}
      </div>
    </div>
  </div>
</nav>`;
}

function generateFeaturesHTML(props: any): string {
  const features = props.features || [];
  const gridColsMap: Record<string, string> = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  };
  const gridCols = gridColsMap[props.columns || '3'];

  return `
<section class="py-20 px-6">
  <div class="container mx-auto">
    ${props.title ? `
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        ${props.title}
      </h2>
      ${props.subtitle ? `<p class="text-xl text-gray-400">${props.subtitle}</p>` : ''}
    </div>
    ` : ''}
    <div class="grid ${gridCols} gap-8">
      ${features.map((feature: any) => `
      <div class="glass p-8 rounded-2xl hover:scale-105 transition-all">
        <div class="text-5xl mb-4">${feature.icon}</div>
        <h3 class="text-2xl font-bold mb-3 text-cyan-400">${feature.title}</h3>
        <p class="text-gray-400">${feature.description}</p>
      </div>
      `).join('')}
    </div>
  </div>
</section>`;
}

function generateCTAHTML(props: any): string {
  return `
<section class="py-20 px-6">
  <div class="container mx-auto">
    <div class="glass-strong p-12 md:p-16 rounded-3xl text-center max-w-4xl mx-auto">
      <h2 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        ${props.title}
      </h2>
      ${props.subtitle ? `<p class="text-xl text-gray-300 mb-8">${props.subtitle}</p>` : ''}
      <a href="${props.buttonUrl || '#'}" class="inline-block glass-strong px-10 py-4 rounded-xl text-white text-lg font-semibold hover:scale-105 transition-all">
        ${props.buttonText}
      </a>
    </div>
  </div>
</section>`;
}

function generateFooterHTML(props: any): string {
  const columns = props.columns || [];

  return `
<footer class="glass-strong py-12 px-6 mt-20">
  <div class="container mx-auto">
    <div class="grid md:grid-cols-4 gap-8 mb-8">
      <div class="md:col-span-2">
        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          ${props.companyName}
        </h3>
        ${props.description ? `<p class="text-gray-400 mb-4">${props.description}</p>` : ''}
      </div>
      ${columns.map((column: any) => `
      <div>
        <h4 class="text-lg font-semibold mb-4 text-cyan-400">${column.title}</h4>
        <ul class="space-y-2">
          ${column.links.map((link: string) => `
          <li><a href="#" class="text-gray-400 hover:text-purple-400 transition-colors">${link}</a></li>
          `).join('')}
        </ul>
      </div>
      `).join('')}
    </div>
    <div class="border-t border-gray-700 pt-8 text-center text-gray-400">
      <p>© ${new Date().getFullYear()} ${props.companyName}. All rights reserved.</p>
    </div>
  </div>
</footer>`;
}

function generatePricingHTML(props: any): string {
  const plans = props.plans || [];

  return `
<section class="py-20 px-6">
  <div class="container mx-auto">
    ${props.title ? `
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        ${props.title}
      </h2>
      ${props.subtitle ? `<p class="text-xl text-gray-400">${props.subtitle}</p>` : ''}
    </div>
    ` : ''}
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      ${plans.map((plan: any) => `
      <div class="${plan.highlighted ? 'glass-strong scale-105 ring-2 ring-purple-500' : 'glass'} p-8 rounded-2xl relative">
        ${plan.highlighted ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>' : ''}
        <h3 class="text-2xl font-bold mb-2 text-cyan-400">${plan.name}</h3>
        <div class="mb-6">
          <span class="text-5xl font-bold text-white">${plan.price}</span>
          ${plan.period ? `<span class="text-gray-400 ml-2">/ ${plan.period}</span>` : ''}
        </div>
        <ul class="space-y-3 mb-8">
          ${plan.features.map((feature: string) => `
          <li class="flex items-start gap-2">
            <span class="text-green-400">✓</span>
            <span class="text-gray-300">${feature}</span>
          </li>
          `).join('')}
        </ul>
        <button class="w-full py-3 rounded-xl font-semibold ${plan.highlighted ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'glass'}">
          Get Started
        </button>
      </div>
      `).join('')}
    </div>
  </div>
</section>`;
}

function generateFormHTML(props: any): string {
  const fields = props.fields.split(',').map((f: string) => f.trim());

  return `
<section class="py-20 px-6">
  <div class="container mx-auto max-w-2xl">
    <div class="glass-strong p-8 md:p-12 rounded-2xl">
      ${props.title ? `
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          ${props.title}
        </h2>
        ${props.subtitle ? `<p class="text-gray-400">${props.subtitle}</p>` : ''}
      </div>
      ` : ''}
      <form class="space-y-6">
        ${fields.map((field: string) => {
          const isTextarea = field.toLowerCase() === 'message';
          return isTextarea ? `
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2 capitalize">${field}</label>
          <textarea rows="4" class="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 outline-none" placeholder="Enter ${field}"></textarea>
        </div>
          ` : `
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2 capitalize">${field}</label>
          <input type="${field.toLowerCase() === 'email' ? 'email' : 'text'}" class="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 outline-none" placeholder="Enter ${field}">
        </div>
          `;
        }).join('')}
        <button type="submit" class="w-full bg-gradient-to-r from-cyan-400 to-purple-500 py-3 rounded-lg font-semibold hover:scale-105 transition-all">
          ${props.submitText}
        </button>
      </form>
    </div>
  </div>
</section>`;
}

function generateTestimonialsHTML(props: any): string {
  const testimonials = props.testimonials || [];

  return `
<section class="py-20 px-6">
  <div class="container mx-auto">
    ${props.title ? `<h2 class="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">${props.title}</h2>` : ''}
    <div class="grid md:grid-cols-3 gap-8">
      ${testimonials.map((t: any) => `
      <div class="glass p-8 rounded-2xl">
        <div class="text-yellow-400 text-4xl mb-4">"</div>
        <p class="text-gray-300 mb-6 text-lg italic">${t.quote}</p>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
            ${t.author.charAt(0)}
          </div>
          <div>
            <div class="font-semibold text-white">${t.author}</div>
            <div class="text-sm text-gray-400">${t.role}</div>
          </div>
        </div>
      </div>
      `).join('')}
    </div>
  </div>
</section>`;
}

function generateStatsHTML(props: any): string {
  const stats = props.stats || [];

  return `
<section class="py-20 px-6">
  <div class="container mx-auto">
    ${props.title ? `<h2 class="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">${props.title}</h2>` : ''}
    <div class="grid md:grid-cols-4 gap-8">
      ${stats.map((stat: any) => `
      <div class="text-center glass p-8 rounded-2xl">
        <div class="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          ${stat.value}
        </div>
        <div class="text-gray-400 text-lg">${stat.label}</div>
      </div>
      `).join('')}
    </div>
  </div>
</section>`;
}

function generateNewsletterHTML(props: any): string {
  return `
<section class="py-20 px-6">
  <div class="container mx-auto max-w-4xl">
    <div class="glass-strong p-12 rounded-2xl text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        ${props.title}
      </h2>
      ${props.subtitle ? `<p class="text-gray-400 mb-8">${props.subtitle}</p>` : ''}
      <form class="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
        <input type="email" placeholder="${props.placeholder}" required class="flex-1 glass px-6 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 outline-none">
        <button type="submit" class="bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all">
          ${props.buttonText}
        </button>
      </form>
    </div>
  </div>
</section>`;
}

function generateFAQHTML(props: any): string {
  const faqs = props.faqs || [];

  return `
<section class="py-20 px-6">
  <div class="container mx-auto max-w-3xl">
    ${props.title ? `<h2 class="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">${props.title}</h2>` : ''}
    <div class="space-y-4">
      ${faqs.map((faq: any) => `
      <div class="glass rounded-xl p-6">
        <h3 class="font-semibold text-white text-lg mb-3">${faq.question}</h3>
        <p class="text-gray-400">${faq.answer}</p>
      </div>
      `).join('')}
    </div>
  </div>
</section>`;
}

function generateGalleryHTML(props: any): string {
  const images = props.images || [];
  const gridColsMap: Record<string, string> = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
    '5': 'md:grid-cols-5',
  };
  const gridCols = gridColsMap[props.columns || '3'];

  return `
<section class="py-20 px-6">
  <div class="container mx-auto">
    ${props.title ? `<h2 class="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">${props.title}</h2>` : ''}
    <div class="grid ${gridCols} gap-4">
      ${images.map((image: string, idx: number) => `
      <div class="relative overflow-hidden rounded-xl glass group cursor-pointer aspect-square">
        <img src="${image}" alt="Gallery item ${idx + 1}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span class="text-white font-semibold">View Image</span>
        </div>
      </div>
      `).join('')}
    </div>
  </div>
</section>`;
}

function generateTeamHTML(props: any): string {
  const members = props.members || [];
  const gridColsMap: Record<string, string> = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
    '5': 'md:grid-cols-5',
  };
  const gridCols = gridColsMap[props.columns || '4'];

  return `
<section class="py-20 px-6">
  <div class="container mx-auto">
    ${props.title ? `
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">${props.title}</h2>
      ${props.subtitle ? `<p class="text-xl text-gray-400">${props.subtitle}</p>` : ''}
    </div>
    ` : ''}
    <div class="grid ${gridCols} gap-8">
      ${members.map((member: any) => `
      <div class="glass p-6 rounded-2xl hover:glass-strong transition-all text-center">
        ${member.avatar ? `
        <img src="${member.avatar}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-2 ring-cyan-400">
        ` : `
        <div class="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
          ${member.name.charAt(0)}
        </div>
        `}
        <h3 class="text-xl font-bold text-white mb-1">${member.name}</h3>
        <p class="text-cyan-400 text-sm mb-3">${member.role}</p>
        ${member.bio ? `<p class="text-gray-400 text-sm mb-4">${member.bio}</p>` : ''}
      </div>
      `).join('')}
    </div>
  </div>
</section>`;
}

function generateLogoCloudHTML(props: any): string {
  const logos = props.logos || [];

  return `
<section class="py-20 px-6">
  <div class="container mx-auto">
    ${props.title ? `<h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">${props.title}</h2>` : ''}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
      ${logos.map((logo: any) => `
      <div class="flex items-center justify-center p-6 glass rounded-xl">
        <img src="${logo.url}" alt="${logo.name}" class="w-full h-auto max-h-12 object-contain ${props.grayscale ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : 'opacity-80 hover:opacity-100'} transition-all duration-300">
      </div>
      `).join('')}
    </div>
  </div>
</section>`;
}

/**
 * Download HTML file
 */
export function downloadHTML(page: PageState) {
  const html = exportToHTML(page);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${page.slug || 'page'}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
