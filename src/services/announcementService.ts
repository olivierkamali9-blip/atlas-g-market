import db from '../db';

const createAnnouncement = async (req, res) => {
  const { title, description, category } = req.body;
  const announcement = await db.createAnnouncement(title, description, category);
  res.json(announcement);
};

const getAnnouncements = async (req, res) => {
  const announcements = await db.getAnnouncements();
  res.json(announcements);
};

const getAnnouncementById = async (req, res) => {
  const id = req.params.id;
  const announcement = await db.getAnnouncementById(id);
  res.json(announcement);
};

export { createAnnouncement, getAnnouncements, getAnnouncementById };