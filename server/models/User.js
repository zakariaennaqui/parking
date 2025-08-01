import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  carPlate: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);