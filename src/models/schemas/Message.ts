import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  name: string
  email?: string
  message: string
  createdAt: Date
}

const MessageSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
)

// Check if model is already defined to prevent overwriting in development with hot reload
export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)
