'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GraduationCap, MapPin, Calendar } from 'lucide-react';

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  location: string;
  order: number;
}

export default function EducationManagement() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    year: '',
    location: '',
    order: 0
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch('/api/education');
      const data = await response.json();
      setEducations(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingEdu(edu);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      year: edu.year,
      location: edu.location,
      order: edu.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      try {
        const response = await fetch(`/api/education/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchEducation();
        }
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingEdu ? 'PUT' : 'POST';
      const url = editingEdu ? `/api/education/${editingEdu.id}` : '/api/education';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order.toString())
        }),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingEdu(null);
        setFormData({
          institution: '',
          degree: '',
          year: '',
          location: '',
          order: 0
        });
        fetchEducation();
      }
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Qualifications</h1>
        <button
          onClick={() => {
            setEditingEdu(null);
            setFormData({
              institution: '',
              degree: '',
              year: '',
              location: '',
              order: 0
            });
            setShowForm(true);
          }}
          className="bg-[#004d66] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#003d52] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">{editingEdu ? 'Edit Education' : 'Add New Education'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2021"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                  />
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
                  {editingEdu ? 'Update Education' : 'Add Education'}
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

      <div className="space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#004d66]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-sm text-[#004d66] font-medium">{edu.institution}</p>
                <div className="flex gap-4 mt-1 text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {edu.year}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {edu.location}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(edu)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(edu.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
