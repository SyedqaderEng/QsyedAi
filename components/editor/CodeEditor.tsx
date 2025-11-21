'use client';

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '@/lib/store/editorStore';
import { PageState } from '@/lib/types/component';
import { FileJson, FileCode } from 'lucide-react';

export default function CodeEditor() {
  const { currentPage, setCurrentPage } = useEditorStore();
  const [code, setCode] = useState('');
  const [format, setFormat] = useState<'json' | 'html'>('json');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentPage) {
      if (format === 'json') {
        setCode(JSON.stringify(currentPage, null, 2));
      } else {
        // TODO: Generate HTML from currentPage
        setCode('<!-- HTML export coming soon -->');
      }
    }
  }, [currentPage, format]);

  const handleCodeChange = (value: string | undefined) => {
    if (!value) return;
    setCode(value);

    if (format === 'json') {
      try {
        const parsed: PageState = JSON.parse(value);
        setError(null);
        // Auto-update the page state (debounced)
        setCurrentPage(parsed);
      } catch (err) {
        setError('Invalid JSON: ' + (err as Error).message);
      }
    }
  };

  return (
    <div className="relative h-[calc(100vh-12rem)]">
      {/* Format Toggle */}
      <div className="absolute top-4 right-4 z-10 flex glass rounded-lg p-1">
        <button
          onClick={() => setFormat('json')}
          className={`px-3 py-2 rounded-md transition-all flex items-center gap-2 ${
            format === 'json'
              ? 'bg-neon-blue text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileJson size={16} />
          JSON
        </button>
        <button
          onClick={() => setFormat('html')}
          className={`px-3 py-2 rounded-md transition-all flex items-center gap-2 ${
            format === 'html'
              ? 'bg-neon-blue text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileCode size={16} />
          HTML
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute top-16 left-4 right-4 z-10 glass p-4 rounded-lg border border-red-500/50 bg-red-500/10">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Monaco Editor */}
      <Editor
        height="100%"
        defaultLanguage={format}
        language={format}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}
