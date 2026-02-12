'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Calendar, MapPin, Briefcase } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  order: number;
}
export const dynamic = "force-dynamic";
export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: 'Present',
    description: '',
    order: 0
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company,
      role: exp.role,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description.join('\n'),
      order: exp.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        const response = await fetch(`/api/experience/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchExperiences();
        }
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      description: formData.description.split('\n').map(d => d.trim()).filter(d => d !== ''),
      order: parseInt(formData.order.toString())
    };

    try {
      const method = editingExp ? 'PUT' : 'POST';
      const url = editingExp ? `/api/experience/${editingExp.id}` : '/api/experience';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingExp(null);
        setFormData({
          company: '',
          role: '',
          location: '',
          startDate: '',
          endDate: 'Present',
          description: '',
          order: 0
        });
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Career Timeline</h1>
        <button
          onClick={() => {
            setEditingExp(null);
            setFormData({
              company: '',
              role: '',
              location: '',
              startDate: '',
              endDate: 'Present',
              description: '',
              order: 0
            });
            setShowForm(true);
          }}
          className="bg-[#004d66] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#003d52] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">{editingExp ? 'Edit Experience' : 'Add New Experience'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. August, 2023"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Present or Dec, 2024"
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (One point per line)</label>
                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-grow bg-[#004d66] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#003d52] transition-colors"
                >
                  {editingExp ? 'Update Experience' : 'Add Experience'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border rounded-lg font-bold bg-red-50 text-red-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#004d66]/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#004d66]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{exp.role}</h3>
                  <p className="text-[#004d66] font-medium">{exp.company}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {exp.startDate} - {exp.endDate}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {exp.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(exp)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {exp.description.map((point, i) => (
                <li key={i} className="text-gray-600 text-sm flex gap-2">
                  <span className="text-[#004d66] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#004d66] flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
