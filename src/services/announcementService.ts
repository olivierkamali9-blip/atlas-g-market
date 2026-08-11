import Announcement from '../models/announcementModel';

// GET un annonce par ID
export const getAnnouncementById = async (id: string) => {
  return await Announcement.findById(id).exec();
};

// GET toutes les annonces (filtres optionnels)
export const getAllAnnouncements = async (category?: string, search?: string) => {
  let query = Announcement.find();

  if (category) {
    query = query.where('category').equals(category);
  }
  if (search) {
    query = query.where('title').regex(new RegExp(search, 'i'));
  }

  return await query.exec();
};

// PUT mise à jour d'une annonce
export const updateAnnouncement = async (id: string, data: Partial<Announcement>) => {
  return await Announcement.findByIdAndUpdate(id, data, { new: true }).exec();
};

// DELETE suppression d'une annonce
export const deleteAnnouncement = async (id: string) => {
  return await Announcement.findByIdAndDelete(id).exec();
};