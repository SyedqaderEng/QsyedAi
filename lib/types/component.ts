// Core type definitions for the component registry system

export type ComponentType =
  | 'Hero'
  | 'Navbar'
  | 'Features'
  | 'CTA'
  | 'Footer'
  | 'Pricing'
  | 'Testimonials'
  | 'Form'
  | 'Gallery'
  | 'Stats'
  | 'Team'
  | 'FAQ'
  | 'LogoCloud'
  | 'Newsletter';

export type PropertyType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'color'
  | 'select'
  | 'textarea'
  | 'image'
  | 'url';

export interface PropertySchema {
  name: string;
  type: PropertyType;
  label: string;
  defaultValue: any;
  required?: boolean;
  options?: string[]; // For select type
  description?: string;
}

export interface ComponentSchema {
  type: ComponentType;
  name: string;
  description: string;
  category: 'hero' | 'navigation' | 'content' | 'form' | 'footer' | 'marketing';
  icon: string;
  properties: PropertySchema[];
  defaultProps: Record<string, any>;
}

// The State Schema - JSON structure for pages
export interface PageComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  order: number;
  onClicks?: ActionDefinition[]; // For Phase 2.3 - Logic Engine
}

export interface PageState {
  id: string;
  name: string;
  slug: string;
  components: PageComponent[];
  metadata: {
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Logic/Action Engine types (Phase 2.3)
export interface ActionDefinition {
  id: string;
  event: 'onClick' | 'onSubmit' | 'onLoad';
  workflow: WorkflowStep[];
}

export interface WorkflowStep {
  action: 'navigate' | 'validateFields' | 'saveToDB' | 'sendEmail' | 'showNotification';
  params: Record<string, any>;
}

// Project structure
export interface Project {
  id: string;
  name: string;
  userId: string;
  pages: PageState[];
  theme: {
    primaryColor: string;
    accentColor: string;
    darkMode: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
