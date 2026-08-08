import React, { useState } from 'react';
import { Upload, PlusCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';

export interface AdPayload {
  title: string;
  type: 'product' | 'service' | 'job';
  category: string;
  condition: 'new' | 'used' | 'not_applicable';
  price: number;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  images: File[];
}

export const AtlasPublishAd: React.FC<{ onSubmit: (ad: AdPayload) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<AdPayload>({
    title: '',
    type: 'product',
    category: 'electronics',
    condition: 'used',
    price: 0,
    description: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    images: []
  });

  const [previews, setPreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...filesArray] }));
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100 my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Publier une annonce sur Atlas G-market</h2>
      <p className="text-sm text-gray-500 mb-6">Proposez un bien, un service, un bien d'occasion ou une offre d'emploi en quelques clics.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Titre de l'annonce *</label>
          <input
            type="text"
            name="title"
            required
            placeholder="Ex: iPhone 13 Pro 128Go ou Prestation Développeur React"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Type d'annonce *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="product">Produit / Bien</option>
              <option value="service">Service / Prestation</option>
              <option value="job">Offre d'emploi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Catégorie *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="electronics">Multimédia & Tech</option>
              <option value="vehicles">Véhicules</option>
              <option value="real_estate">Immobilier</option>
              <option value="jobs">Emploi</option>
              <option value="services">Services</option>
              <option value="home">Maison & Mode</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">État</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="new">Neuf</option>
              <option value="used">Occasion</option>
              <option value="not_applicable">Non applicable (Service/Emploi)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Prix ou Salaire (€) *</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              placeholder="0.00"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Localisation / Ville *</label>
            <input
              type="text"
              name="location"
              required
              placeholder="Paris, Lyon, Distanciel..."
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description détaillée *</label>
          <textarea
            name="description"
            required
            rows={5}
            placeholder="Décrivez votre produit, la mission ou le poste avec le maximum de détails..."
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Upload d'images */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Photos / Visuels</label>
          <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50 relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm font-medium text-gray-600">Glissez-déposez des photos ou cliquez pour parcourir</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG jusqu'à 5 Mo</p>
          </div>

          {previews.length > 0 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {previews.map((src, index) => (
                <img key={index} src={src} alt="Aperçu" className="h-20 w-20 object-cover rounded-md border" />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-150 flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Publier l'annonce
        </button>
      </form>
    </div>
  );
};