'use client';

import { useState, useEffect } from 'react';
import { Save, User, Image as ImageIcon, MapPin, Calendar, FileText } from 'lucide-react';

interface Bio {
  id: string;
  name: string;
  title: string;
  description: string[];
  image: string | null;
  location: string;
  experienceYears: string;
  resumeUrl: string | null;
}

export default function BioManagement() {
  const [bio, setBio] = useState<Bio | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    image: '',
    location: '',
    experienceYears: '',
    resumeUrl: ''
  });

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    try {
      const response = await fetch('/api/bio');
      const data = await response.json();
      if (data) {
        setBio(data);
        setFormData({
          name: data.name || '',
          title: data.title || '',
          description: data.description.join('\n') || '',
          image: data.image || '',
          location: data.location || '',
          experienceYears: data.experienceYears || '',
          resumeUrl: data.resumeUrl || ''
        });
      }
    } catch (error) {
      console.error('Error fetching bio:', error);
    } finally {
      setLoading(false);
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
    setSaving(true);
    const payload = {
      ...formData,
      id: bio?.id,
      description: formData.description.split('\n').map(d => d.trim()).filter(d => d !== '')
    };

    try {
      const method = bio ? 'PUT' : 'POST';
      const response = await fetch('/api/bio', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updated = await response.json();
        setBio(updated);
        alert('Bio updated successfully!');
      }
    } catch (error) {
      console.error('Error saving bio:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6" /> About Me Management
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                placeholder="e.g. Software Engineer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description / Professional Summary (One paragraph per line)</label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Years of Experience
              </label>
              <input
                type="text"
                required
                value={formData.experienceYears}
                onChange={e => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <ImageIcon className="w-4 h-4" /> Profile Image
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="URL or upload"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4" /> Resume / CV URL
              </label>
              <input
                type="text"
                value={formData.resumeUrl || ''}
                onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004d66] outline-none text-gray-900"
                placeholder="Public link to resume"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#004d66] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#003d52] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Professional Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
