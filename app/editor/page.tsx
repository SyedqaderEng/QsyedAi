'use client';

import { useEffect, useState } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import PageRenderer from '@/lib/renderer/PageRenderer';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import ComponentToolbar from '@/components/editor/ComponentToolbar';
import { samplePage } from '@/lib/utils/sampleData';
import { ArrowLeft, Eye, Code, Save } from 'lucide-react';
import Link from 'next/link';

/**
 * PHASE 2.2: Visual Editor Page
 *
 * This is the main editor interface where users can:
 * - See live preview of their page
 * - Click components to select them
 * - Edit properties in the sidebar
 * - Add new components
 * - Generate layouts with AI
 */

export default function EditorPage() {
  const {
    currentPage,
    setCurrentPage,
    selectedComponentId,
    selectComponent,
  } = useEditorStore();

  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    // Load sample page on mount
    if (!currentPage) {
      setCurrentPage(samplePage);
    }
  }, [currentPage, setCurrentPage]);

  if (!currentPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="glass px-4 py-2 rounded-lg hover:shadow-neon-blue transition-all flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">{currentPage.name}</h1>
              <p className="text-sm text-gray-400">Visual Editor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex glass rounded-lg p-1">
              <button
                onClick={() => setViewMode('edit')}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === 'edit'
                    ? 'bg-neon-blue text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Code size={18} />
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === 'preview'
                    ? 'bg-neon-blue text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Eye size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                const json = JSON.stringify(currentPage, null, 2);
                navigator.clipboard.writeText(json);
                alert('Page JSON copied to clipboard!');
              }}
              className="glass px-4 py-2 rounded-lg hover:shadow-neon-green transition-all flex items-center gap-2"
            >
              <Save size={18} />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="pt-24 pb-6 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Component Toolbar */}
            <div className="col-span-3">
              <div className="sticky top-24">
                <ComponentToolbar />
              </div>
            </div>

            {/* Center - Canvas/Preview */}
            <div className="col-span-6">
              <div className="glass-strong rounded-2xl overflow-hidden min-h-screen">
                {viewMode === 'edit' && (
                  <div className="bg-neon-blue/10 p-4 border-b border-gray-700 text-center">
                    <p className="text-sm text-gray-300">
                      Click on any component to edit its properties
                    </p>
                  </div>
                )}

                <div
                  className={`${viewMode === 'preview' ? '' : 'cursor-pointer'}`}
                  onClick={() => viewMode === 'edit' && selectComponent(null)}
                >
                  <PageRenderer
                    components={currentPage.components}
                    onComponentClick={(id) => {
                      if (viewMode === 'edit') {
                        selectComponent(id);
                      }
                    }}
                    selectedId={viewMode === 'edit' ? selectedComponentId || undefined : undefined}
                  />
                </div>
              </div>
            </div>

            {/* Right Sidebar - Properties Panel */}
            <div className="col-span-3">
              <div className="sticky top-24">
                {viewMode === 'edit' ? (
                  <PropertiesPanel />
                ) : (
                  <div className="glass-strong p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-neon-blue mb-4">Preview Mode</h3>
                    <p className="text-gray-400">
                      Viewing your page as visitors will see it. Switch back to Edit mode to make changes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Count Badge */}
      <div className="fixed bottom-6 left-6 glass-strong px-4 py-2 rounded-lg">
        <div className="text-sm text-gray-400">
          Components: <span className="text-neon-blue font-semibold">{currentPage.components.length}</span>
        </div>
      </div>
    </div>
  );
}
