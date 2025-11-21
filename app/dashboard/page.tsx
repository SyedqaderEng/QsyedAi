'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, FolderOpen, Trash2, Settings, LogOut, Code, Eye } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  componentsCount: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load projects from localStorage (TODO: Replace with Firestore)
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    document.cookie = 'user=; path=/; max-age=0';
    router.push('/auth/login');
  };

  const handleNewProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: 'Untitled Project',
      slug: `untitled-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      componentsCount: 0,
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    // Navigate to editor
    router.push(`/editor?project=${newProject.id}`);
  };

  const handleDeleteProject = (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass-strong">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Syed.AI
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/security" className="text-gray-300 hover:text-white transition-colors">
              Security
            </Link>
            <span className="text-gray-300">
              {user?.name || user?.email}
            </span>
            <Link
              href="/dashboard/settings"
              className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="glass px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
          >
            Your Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Create and manage your stunning websites
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Project Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={handleNewProject}
            className="glass p-8 rounded-2xl hover:glass-strong transition-all cursor-pointer border-2 border-dashed border-gray-600 hover:border-neon-blue flex flex-col items-center justify-center min-h-[280px] group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">New Project</h3>
            <p className="text-gray-400 text-center">Start building your next website</p>
          </motion.div>

          {/* Existing Projects */}
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="glass p-6 rounded-2xl hover:glass-strong transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative mb-4 aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Code className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link
                    href={`/editor?project=${project.id}`}
                    className="glass-strong px-4 py-2 rounded-lg hover:bg-neon-blue/20 transition-all flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FolderOpen className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    className="glass-strong px-4 py-2 rounded-lg hover:bg-neon-purple/20 transition-all flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/preview?project=${project.id}`, '_blank');
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
              {project.description && (
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
              )}

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{project.componentsCount} components</span>
                <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/editor?project=${project.id}`}
                  className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple py-2 rounded-lg text-center font-semibold hover:shadow-neon-blue transition-all"
                >
                  Open
                </Link>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="glass px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 text-lg mb-6">
              You haven't created any projects yet. Get started by creating your first project!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
