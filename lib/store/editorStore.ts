import { create } from 'zustand';
import { PageState, PageComponent } from '@/lib/types/component';

/**
 * Global state management for the visual editor
 * Using Zustand for simple, fast state management
 */

interface EditorStore {
  // Current page being edited
  currentPage: PageState | null;

  // Selected component ID for editing
  selectedComponentId: string | null;

  // Actions
  setCurrentPage: (page: PageState) => void;
  selectComponent: (id: string | null) => void;
  updateComponent: (id: string, props: Partial<PageComponent['props']>) => void;
  addComponent: (component: PageComponent) => void;
  removeComponent: (id: string) => void;
  reorderComponents: (components: PageComponent[]) => void;
  moveComponentUp: (id: string) => void;
  moveComponentDown: (id: string) => void;

  // Helper to get selected component
  getSelectedComponent: () => PageComponent | null;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  currentPage: null,
  selectedComponentId: null,

  setCurrentPage: (page) => set({ currentPage: page }),

  selectComponent: (id) => set({ selectedComponentId: id }),

  updateComponent: (id, newProps) => set((state) => {
    if (!state.currentPage) return state;

    const updatedComponents = state.currentPage.components.map((comp) =>
      comp.id === id
        ? { ...comp, props: { ...comp.props, ...newProps } }
        : comp
    );

    return {
      currentPage: {
        ...state.currentPage,
        components: updatedComponents,
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
    };
  }),

  addComponent: (component) => set((state) => {
    if (!state.currentPage) return state;

    return {
      currentPage: {
        ...state.currentPage,
        components: [...state.currentPage.components, component],
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
    };
  }),

  removeComponent: (id) => set((state) => {
    if (!state.currentPage) return state;

    return {
      currentPage: {
        ...state.currentPage,
        components: state.currentPage.components.filter((comp) => comp.id !== id),
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
      selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
    };
  }),

  reorderComponents: (components) => set((state) => {
    if (!state.currentPage) return state;

    return {
      currentPage: {
        ...state.currentPage,
        components,
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
    };
  }),

  moveComponentUp: (id) => set((state) => {
    if (!state.currentPage) return state;

    const components = [...state.currentPage.components].sort((a, b) => a.order - b.order);
    const index = components.findIndex(c => c.id === id);

    if (index <= 0) return state; // Already at top or not found

    // Swap with previous component
    const temp = components[index - 1].order;
    components[index - 1].order = components[index].order;
    components[index].order = temp;

    return {
      currentPage: {
        ...state.currentPage,
        components,
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
    };
  }),

  moveComponentDown: (id) => set((state) => {
    if (!state.currentPage) return state;

    const components = [...state.currentPage.components].sort((a, b) => a.order - b.order);
    const index = components.findIndex(c => c.id === id);

    if (index === -1 || index >= components.length - 1) return state; // Not found or already at bottom

    // Swap with next component
    const temp = components[index + 1].order;
    components[index + 1].order = components[index].order;
    components[index].order = temp;

    return {
      currentPage: {
        ...state.currentPage,
        components,
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date().toISOString(),
        },
      },
    };
  }),

  getSelectedComponent: () => {
    const state = get();
    if (!state.currentPage || !state.selectedComponentId) return null;
    return state.currentPage.components.find((c) => c.id === state.selectedComponentId) || null;
  },
}));
