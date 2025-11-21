'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageRenderer from '@/lib/renderer/PageRenderer';
import { ArrowLeft, Smartphone, Tablet, Monitor } from 'lucide-react';
import Link from 'next/link';
import { PageState } from '@/lib/types/component';

interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  componentsCount: number;
  pages?: PageState[];
}

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');

  const [project, setProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState<PageState | null>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!projectId) {
      setError('No project ID provided');
      setLoading(false);
      return;
    }

    try {
      // Load projects from localStorage
      const savedProjects = localStorage.getItem('projects');
      if (!savedProjects) {
        setError('No projects found');
        setLoading(false);
        return;
      }

      const projects: Project[] = JSON.parse(savedProjects);
      const foundProject = projects.find(p => p.id === projectId);

      if (!foundProject) {
        setError('Project not found');
        setLoading(false);
        return;
      }

      setProject(foundProject);

      // Load the page data for this project (if available)
      // For now, we'll use sample data or the first page if available
      if (foundProject.pages && foundProject.pages.length > 0) {
        setCurrentPage(foundProject.pages[0]);
      } else {
        // Create a default page structure
        const defaultPage: PageState = {
          id: 'preview-page',
          name: foundProject.name,
          slug: foundProject.slug,
          components: [],
          metadata: {
            title: foundProject.name,
            description: foundProject.description || '',
            createdAt: foundProject.createdAt,
            updatedAt: foundProject.updatedAt,
          },
        };
        setCurrentPage(defaultPage);
      }
    } catch (err) {
      console.error('Error loading project:', err);
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading preview...</div>
      </div>
    );
  }

  if (error || !project || !currentPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="glass-strong p-8 rounded-2xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error || 'Failed to load project'}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
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
              href="/dashboard"
              className="glass px-4 py-2 rounded-lg hover:shadow-neon-blue transition-all flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Dashboard
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
              <p className="text-sm text-gray-400">Preview Mode</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Preview Toggle */}
            <div className="flex glass rounded-lg p-1">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-2 rounded-md transition-all ${
                  deviceMode === 'desktop'
                    ? 'bg-neon-purple text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor size={18} />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`px-3 py-2 rounded-md transition-all ${
                  deviceMode === 'tablet'
                    ? 'bg-neon-purple text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Tablet View"
              >
                <Tablet size={18} />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-2 rounded-md transition-all ${
                  deviceMode === 'mobile'
                    ? 'bg-neon-purple text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone size={18} />
              </button>
            </div>

            <Link
              href={`/editor?project=${project.id}`}
              className="bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
            >
              Edit Project
            </Link>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="pt-24 pb-6">
        <div className="container mx-auto px-6">
          <div className="glass-strong rounded-2xl overflow-hidden min-h-screen">
            <div className="flex justify-center p-6">
              {/* Device Preview Container */}
              <div
                className={`${
                  deviceMode === 'mobile'
                    ? 'w-[375px] border-8 border-gray-800 rounded-[2.5rem] shadow-2xl'
                    : deviceMode === 'tablet'
                    ? 'w-[768px] border-8 border-gray-800 rounded-[1.5rem] shadow-2xl'
                    : 'w-full'
                } transition-all duration-300 overflow-hidden bg-white`}
              >
                {currentPage.components.length > 0 ? (
                  <PageRenderer
                    components={currentPage.components}
                    onComponentClick={() => {}}
                  />
                ) : (
                  <div className="min-h-[600px] flex items-center justify-center">
                    <div className="text-center p-8">
                      <h2 className="text-2xl font-bold text-gray-400 mb-2">No Content Yet</h2>
                      <p className="text-gray-500 mb-6">
                        This project doesn't have any components yet.
                      </p>
                      <Link
                        href={`/editor?project=${project.id}`}
                        className="inline-block bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all text-white"
                      >
                        Start Building
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Badge */}
      {project.description && (
        <div className="fixed bottom-6 left-6 glass-strong px-4 py-3 rounded-lg max-w-md">
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>
      )}

      {/* Component Count Badge */}
      <div className="fixed bottom-6 right-6 glass-strong px-4 py-2 rounded-lg">
        <div className="text-sm text-gray-400">
          Components: <span className="text-neon-blue font-semibold">{currentPage.components.length}</span>
        </div>
      </div>
    </div>
  );
}
