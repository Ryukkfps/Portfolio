'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Code, Server, Database, Globe, Cpu, Smartphone } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number | null;
  icon: string | null;
  order: number;
  isActive: boolean;
}

const iconOptions = [
  { label: 'Code', value: 'code', icon: Code },
  { label: 'Server', value: 'server', icon: Server },
  { label: 'Database', value: 'database', icon: Database },
  { label: 'Globe', value: 'globe', icon: Globe },
  { label: 'CPU', value: 'cpu', icon: Cpu },
  { label: 'Mobile', value: 'mobile', icon: Smartphone },
];

export default function SkillsManagement() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 80,
    icon: 'code',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level || 80,
      icon: skill.icon || 'code',
      order: skill.order,
      isActive: skill.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        const response = await fetch(`/api/skills/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchSkills();
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingSkill ? 'PUT' : 'POST';
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : '/api/skills';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingSkill(null);
        setFormData({
          name: '',
          category: 'Frontend',
          level: 80,
          icon: 'code',
          order: 0,
          isActive: true
        });
        fetchSkills();
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tech Stack</h1>
        <button
          onClick={() => {
            setEditingSkill(null);
            setFormData({
              name: '',
              category: 'Frontend',
              level: 80,
              icon: 'code',
              order: 0,
              isActive: true
            });
            setShowForm(true);
          }}
          className="bg-[#004d66] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#003d52] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools/Platforms</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: opt.value })}
                      className={`p-3 border rounded-lg flex flex-col items-center gap-1 transition-all ${formData.icon === opt.value ? 'bg-[#004d66] text-white border-[#004d66]' : 'hover:bg-gray-50 text-gray-900'}`}
                    >
                      <opt.icon className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full accent-[#004d66]"
                />
                <div className="text-right text-xs font-bold text-gray-500">{formData.level}%</div>
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
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill) => {
          const IconObj = iconOptions.find(opt => opt.value === skill.icon)?.icon || Code;
          return (
            <div key={skill.id} className={`bg-white p-6 rounded-xl shadow-sm border ${!skill.isActive ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <IconObj className="w-6 h-6 text-[#004d66]" />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(skill)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-gray-800">{skill.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{skill.category}</p>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#004d66] h-full" style={{ width: `${skill.level || 0}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
