'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { getComponentSchema } from '@/lib/registry/component-registry';
import { PropertySchema } from '@/lib/types/component';
import { X, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * PHASE 2.2: Properties Panel for Visual Editing
 *
 * This sidebar dynamically generates input fields based on
 * the selected component's schema.
 */

export default function PropertiesPanel() {
  const { selectedComponentId, getSelectedComponent, updateComponent, removeComponent, selectComponent } = useEditorStore();
  const selectedComponent = getSelectedComponent();
  const [localProps, setLocalProps] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedComponent) {
      setLocalProps(selectedComponent.props);
    }
  }, [selectedComponent]);

  if (!selectedComponent) {
    return (
      <div className="glass-strong p-6 rounded-2xl h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-6xl mb-4">👆</div>
          <p className="text-lg">Click on a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const schema = getComponentSchema(selectedComponent.type);

  if (!schema) {
    return (
      <div className="glass-strong p-6 rounded-2xl">
        <p className="text-red-400">Component schema not found</p>
      </div>
    );
  }

  const handlePropertyChange = (propertyName: string, value: any) => {
    const updatedProps = { ...localProps, [propertyName]: value };
    setLocalProps(updatedProps);
    updateComponent(selectedComponent.id, { [propertyName]: value });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this component?')) {
      removeComponent(selectedComponent.id);
    }
  };

  return (
    <div className="glass-strong p-6 rounded-2xl h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-neon-blue">{schema.name}</h3>
          <p className="text-sm text-gray-400">{schema.description}</p>
        </div>
        <button
          onClick={() => selectComponent(null)}
          className="glass p-2 rounded-lg hover:bg-red-500/20 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* Component Info */}
      <div className="mb-6 p-4 glass rounded-lg">
        <div className="text-sm text-gray-400 mb-2">Component ID</div>
        <div className="text-white font-mono text-sm">{selectedComponent.id}</div>
      </div>

      {/* Properties Form */}
      <div className="space-y-6">
        {schema.properties.map((property) => (
          <PropertyInput
            key={property.name}
            property={property}
            value={localProps[property.name] ?? property.defaultValue}
            onChange={(value) => handlePropertyChange(property.name, value)}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={handleDelete}
          className="w-full flex items-center justify-center gap-2 glass py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-all"
        >
          <Trash2 size={18} />
          Delete Component
        </button>
      </div>
    </div>
  );
}

/**
 * Dynamic property input component
 */
function PropertyInput({
  property,
  value,
  onChange,
}: {
  property: PropertySchema;
  value: any;
  onChange: (value: any) => void;
}) {
  const renderInput = () => {
    switch (property.type) {
      case 'string':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full glass px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
            placeholder={property.label}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full glass px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none resize-none"
            placeholder={property.label}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full glass px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
          />
        );

      case 'boolean':
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-neon-blue focus:ring-2 focus:ring-neon-blue"
            />
            <span className="text-gray-300">Enabled</span>
          </label>
        );

      case 'select':
        return (
          <select
            value={value || property.defaultValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full glass px-4 py-2 rounded-lg text-white focus:ring-2 focus:ring-neon-blue transition-all outline-none"
          >
            {property.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-16 h-10 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 glass px-4 py-2 rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-neon-blue transition-all outline-none"
            />
          </div>
        );

      case 'url':
        return (
          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full glass px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
            placeholder="https://..."
          />
        );

      case 'image':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full glass px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
              placeholder="Image URL"
            />
            {value && (
              <img
                src={value}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full glass px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {property.label}
        {property.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {renderInput()}
      {property.description && (
        <p className="text-xs text-gray-500 mt-1">{property.description}</p>
      )}
    </div>
  );
}
