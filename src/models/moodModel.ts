import mongoose, { Schema, Document } from 'mongoose';

interface IMood extends Document {
  mood: string;
  date: Date;
}

const moodSchema = new Schema<IMood>({
  mood: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Check if the model is already registered, if not, register it
const Mood = mongoose.models.Mood || mongoose.model<IMood>('Mood', moodSchema);

export default Mood;
