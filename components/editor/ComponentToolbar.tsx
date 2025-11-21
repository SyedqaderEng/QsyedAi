'use client';

import { useState } from 'react';
import { Plus, Sparkles, Code, Download, Upload, FileCode } from 'lucide-react';
import { useEditorStore } from '@/lib/store/editorStore';
import { getAllComponents, getComponentsByCategory } from '@/lib/registry/component-registry';
import { generateLayout } from '@/lib/ai/gemini';
import { ComponentType } from '@/lib/types/component';
import { downloadHTML } from '@/lib/export/htmlExporter';

/**
 * Component Toolbar - Add components and AI generation
 */

export default function ComponentToolbar() {
  const { currentPage, addComponent, setCurrentPage } = useEditorStore();
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showComponentPicker, setShowComponentPicker] = useState(false);

  const handleAddComponent = (type: ComponentType) => {
    const components = getAllComponents();
    const schema = components.find(c => c.type === type);

    if (!schema) return;

    const newComponent = {
      id: `${type.toLowerCase()}-${Date.now()}`,
      type,
      order: currentPage?.components.length || 0,
      props: schema.defaultProps,
    };

    addComponent(newComponent);
    setShowComponentPicker(false);
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim() || !currentPage) return;

    setIsGenerating(true);
    try {
      const result = await generateLayout({
        prompt: aiPrompt,
        existingComponents: [],
      });

      if (result.success && result.components) {
        setCurrentPage({
          ...currentPage,
          components: result.components,
        });
        setAiPrompt('');
        setShowAIPrompt(false);
      } else {
        alert(`AI Generation Error: ${result.error}`);
      }
    } catch (error) {
      alert('Failed to generate layout. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportJSON = () => {
    if (!currentPage) return;

    const json = JSON.stringify(currentPage, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentPage.slug || 'page'}.json`;
    a.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setCurrentPage(json);
      } catch (error) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="glass-strong p-4 rounded-2xl space-y-4">
      {/* AI Generation */}
      <div>
        <button
          onClick={() => setShowAIPrompt(!showAIPrompt)}
          className="w-full flex items-center gap-2 glass px-4 py-3 rounded-xl hover:shadow-neon-purple transition-all group"
        >
          <Sparkles className="text-neon-purple group-hover:animate-spin" size={20} />
          <span className="font-semibold">AI Generate</span>
        </button>

        {showAIPrompt && (
          <div className="mt-2 space-y-2">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe your page... (e.g., 'A landing page for a SaaS product with hero, features, pricing, and footer')"
              rows={4}
              className="w-full glass px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-purple transition-all outline-none resize-none"
            />
            <button
              onClick={handleAIGenerate}
              disabled={isGenerating || !aiPrompt.trim()}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-neon-purple transition-all"
            >
              {isGenerating ? 'Generating...' : 'Generate Page'}
            </button>
          </div>
        )}
      </div>

      {/* Add Component */}
      <div>
        <button
          onClick={() => setShowComponentPicker(!showComponentPicker)}
          className="w-full flex items-center gap-2 glass px-4 py-3 rounded-xl hover:shadow-neon-blue transition-all"
        >
          <Plus className="text-neon-blue" size={20} />
          <span className="font-semibold">Add Component</span>
        </button>

        {showComponentPicker && (
          <div className="mt-2 space-y-2 max-h-96 overflow-y-auto">
            {getAllComponents().map((component) => (
              <button
                key={component.type}
                onClick={() => handleAddComponent(component.type)}
                className="w-full text-left glass px-4 py-3 rounded-lg hover:glass-strong transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{component.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-neon-blue transition-colors">
                      {component.name}
                    </div>
                    <div className="text-xs text-gray-400">{component.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Export/Import */}
      <div className="space-y-2">
        <button
          onClick={() => currentPage && downloadHTML(currentPage)}
          className="w-full flex items-center gap-2 glass px-4 py-3 rounded-xl hover:shadow-neon-pink transition-all"
        >
          <FileCode className="text-neon-pink" size={20} />
          <span className="font-semibold">Export HTML</span>
        </button>

        <button
          onClick={handleExportJSON}
          className="w-full flex items-center gap-2 glass px-4 py-3 rounded-xl hover:shadow-neon-green transition-all"
        >
          <Download className="text-neon-green" size={20} />
          <span className="font-semibold">Export JSON</span>
        </button>

        <label className="w-full flex items-center gap-2 glass px-4 py-3 rounded-xl hover:shadow-neon-yellow transition-all cursor-pointer">
          <Upload className="text-neon-yellow" size={20} />
          <span className="font-semibold">Import JSON</span>
          <input
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />
        </label>
      </div>

      {/* Info */}
      <div className="glass p-4 rounded-xl text-sm text-gray-400">
        <div className="font-semibold text-neon-blue mb-2">Quick Tips:</div>
        <ul className="space-y-1 text-xs">
          <li>• Click components to edit</li>
          <li>• Use AI for quick layouts</li>
          <li>• Export JSON to save</li>
          <li>• Add components manually</li>
        </ul>
      </div>
    </div>
  );
}
