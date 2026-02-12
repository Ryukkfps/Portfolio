'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Award, Save } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string | null;
  order: number;
}

export default function AchievementManagement() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    order: 0
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ach: Achievement) => {
    setEditingAch(ach);
    setFormData({
      title: ach.title,
      description: ach.description,
      date: ach.date || '',
      order: ach.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      try {
        const response = await fetch(`/api/achievements/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchAchievements();
        }
      } catch (error) {
        console.error('Error deleting achievement:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingAch ? 'PUT' : 'POST';
      const url = editingAch ? `/api/achievements/${editingAch.id}` : '/api/achievements';
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
        setEditingAch(null);
        setFormData({ title: '', description: '', date: '', order: 0 });
        fetchAchievements();
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Award className="w-6 h-6" /> Key Achievements (Wins)
        </h1>
        <button
          onClick={() => {
            setEditingAch(null);
            setFormData({ title: '', description: '', date: '', order: 0 });
            setShowForm(true);
          }}
          className="bg-[#004d66] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#003d52] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">{editingAch ? 'Edit Achievement' : 'Add New Achievement'}</h2>
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date (Optional)</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                    placeholder="e.g. 2024"
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
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-grow bg-[#004d66] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#003d52] transition-colors"
                >
                  {editingAch ? 'Update Achievement' : 'Add Achievement'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border bg-red-50 text-red-600 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach) => (
          <div key={ach.id} className="bg-white p-6 rounded-xl shadow-sm border group hover:border-[#004d66]/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-[#004d66]/5 transition-colors">
                <Award className="w-6 h-6 text-[#004d66]" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(ach)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(ach.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">{ach.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{ach.description}</p>
            {ach.date && (
              <span className="text-[10px] font-black uppercase tracking-widest text-[#004d66] bg-[#004d66]/5 px-2 py-1 rounded">
                {ach.date}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
