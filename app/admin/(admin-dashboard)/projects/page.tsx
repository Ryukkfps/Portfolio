'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Globe, Github, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  image: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  order: number;
  isActive: boolean;
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: '',
    techStack: '',
    image: '',
    githubUrl: '',
    demoUrl: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      features: project.features.join(', '),
      techStack: project.techStack.join(', '),
      image: project.image || '',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      order: project.order,
      isActive: project.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, image: data.filePath }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
      techStack: formData.techStack.split(',').map(t => t.trim()).filter(t => t !== ''),
      order: parseInt(formData.order.toString())
    };

    try {
      const method = editingProject ? 'PUT' : 'POST';
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingProject(null);
        setFormData({
          title: '',
          description: '',
          features: '',
          techStack: '',
          image: '',
          githubUrl: '',
          demoUrl: '',
          order: 0,
          isActive: true
        });
        fetchProjects();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Projects Portfolio</h1>
        <button
          onClick={() => {
            setEditingProject(null);
            setFormData({
              title: '',
              description: '',
              features: '',
              techStack: '',
              image: '',
              githubUrl: '',
              demoUrl: '',
              order: 0,
              isActive: true
            });
            setShowForm(true);
          }}
          className="bg-[#004d66] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#003d52] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={e => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Demo URL</label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Image URL or upload"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
                  <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <ImageIcon className="w-5 h-5 text-gray-600" />
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-[#004d66] border-gray-300 rounded focus:ring-[#004d66]"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 font-medium">Is Active</label>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-grow bg-[#004d66] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#003d52] transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border rounded-lg bg-red-50 text-red-600 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              {!project.isActive && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Inactive</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{project.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
