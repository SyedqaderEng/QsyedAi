'use client';

import { ComponentType, PageComponent } from '@/lib/types/component';
import * as Components from '@/components/builder';

/**
 * PHASE 1.3: Renderer Engine
 *
 * This is the core engine that converts JSON State into live UI components.
 * It iterates over the PageComponent array and dynamically renders the correct component.
 */

interface PageRendererProps {
  components: PageComponent[];
  onComponentClick?: (componentId: string) => void;
  selectedId?: string;
}

export default function PageRenderer({
  components,
  onComponentClick,
  selectedId,
}: PageRendererProps) {
  /**
   * The main rendering loop:
   * 1. Read each component from the State array
   * 2. Look up the component type in our registry
   * 3. Render the component with its props
   */
  return (
    <div className="min-h-screen">
      {components
        .sort((a, b) => a.order - b.order)
        .map((component) => {
          const ComponentToRender = getComponentByType(component.type);

          if (!ComponentToRender) {
            console.warn(`Component type "${component.type}" not found in registry`);
            return null;
          }

          // Add selection highlighting
          const isSelected = component.id === selectedId;

          return (
            <div
              key={component.id}
              className={`relative ${isSelected ? 'ring-4 ring-neon-blue animate-pulse' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onComponentClick?.(component.id);
              }}
            >
              <ComponentToRender
                id={component.id}
                {...component.props}
              />
              {isSelected && (
                <div className="absolute top-2 right-2 glass px-3 py-1 rounded-lg text-xs font-semibold text-neon-blue z-50">
                  Selected: {component.type}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

/**
 * Helper function to map ComponentType to actual React component
 */
function getComponentByType(type: ComponentType): React.ComponentType<any> | null {
  const componentMap: Record<ComponentType, React.ComponentType<any>> = {
    Hero: Components.Hero,
    Navbar: Components.Navbar,
    Features: Components.Features,
    CTA: Components.CTA,
    Footer: Components.Footer,
    Pricing: Components.Pricing,
    Form: Components.Form,
    Testimonials: Components.Testimonials,
    Stats: Components.Stats,
    Newsletter: Components.Newsletter,
    FAQ: Components.FAQ,
    Gallery: Components.Gallery,
    Team: Components.Team,
    LogoCloud: Components.LogoCloud,
  };

  return componentMap[type] || null;
}
