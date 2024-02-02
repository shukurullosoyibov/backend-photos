// controllers/photoController.js
import Photo from "../models/photo.js"
export const countByCategory = async (req, res, next) => {
  try {
    const hotelCount = await Photo.countDocuments({ type: "hotel" });
    const apartmentCount = await Photo.countDocuments({ type: "apartment" });
    const resortCount = await Photo.countDocuments({ type: "resort" });
    const villaCount = await Photo.countDocuments({ type: "villa" });
    const cabinCount = await Photo.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
const addRating = async (req, res) => {
    const { photoId, stars } = req.body;
  
    try {
      const photo = await Photo.findById(photoId);
  
      if (!photo) {
        return res.status(404).send({ error: 'Rasm topilmadi' });
      }
  
      // Foydalanuvchi o'zini baholar
      const existingRating = photo.ratings.find(
        (rating) => rating.userId.toString() === req.user._id.toString()
      );
  
      if (existingRating) {
        existingRating.stars = stars;
      } else {
        photo.ratings.push({ userId: req.user._id, stars });
      }
  
      await photo.save();
  
      res.send(photo);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  module.exports = {
    createPhoto,
    getPhotos,
    addRating,
  };
  