// models/photo.js
import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  filename: String,
  filepath: String,
  view:Number

},
{
  timestamps: true,
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
