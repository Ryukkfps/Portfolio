'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Layout, Code, Server, Zap } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  order: number;
  isActive: boolean;
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      order: service.order,
      isActive: service.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`/api/services/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchServices();
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingService ? 'PUT' : 'POST';
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingService(null);
        setFormData({
          title: '',
          description: '',
          icon: '',
          order: 0,
          isActive: true
        });
        fetchServices();
      }
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Expertise & Services</h1>
        <button
          onClick={() => {
            setEditingService(null);
            setFormData({
              title: '',
              description: '',
              icon: '',
              order: 0,
              isActive: true
            });
            setShowForm(true);
          }}
          className="bg-[#004d66] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#003d52] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
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
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon/Emoji</label>
                <input
                  type="text"
                  placeholder="e.g. 💻, 🚀, or icon name"
                  value={formData.icon}
                  onChange={e => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
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
                  {editingService ? 'Update Service' : 'Add Service'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className={`bg-white p-8 rounded-xl shadow-sm border ${!service.isActive ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="text-3xl">
                {service.icon || <Layout className="w-8 h-8 text-[#004d66]" />}
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(service.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 uppercase italic">{service.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Order: {service.order}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
