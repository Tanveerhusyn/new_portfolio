import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './User'

export interface IPost extends Document {
  desc: string
  createdAt: Date
  updatedAt: Date
  userId: IUser['_id']
}

const PostSchema: Schema = new Schema(
  {
    desc: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)

// Check if model is already defined to prevent overwriting in development with hot reload
export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
