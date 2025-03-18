import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  emailVerified?: Date
  image: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Date },
    image: { type: String }
  },
  {
    timestamps: true
  }
)

// Check if model is already defined to prevent overwriting in development with hot reload
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
