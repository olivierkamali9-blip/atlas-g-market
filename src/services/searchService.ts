import db from '../db';

const searchAnnouncements = async (req, res) => {
  const query = req.query.q;
  const announcements = await db.searchAnnouncements(query);
  res.json(announcements);
};

export { searchAnnouncements };