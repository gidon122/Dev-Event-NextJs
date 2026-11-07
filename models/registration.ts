import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";

export const REGISTRATION_STATUSES = [
  "CONFIRMED",
  "CANCELLED",
  "ATTENDED",
] as const;

export type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number];

export interface IRegistration extends Document {
  userId: string;
  eventId: Types.ObjectId;
  ticketId: string;
  name: string;
  department: string;
  level: string;
  status: RegistrationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    userId: { type: String, required: true, trim: true },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    ticketId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    department: { type: String, required: true, trim: true, maxlength: 120 },
    level: { type: String, required: true, trim: true, maxlength: 30 },
    status: {
      type: String,
      enum: REGISTRATION_STATUSES,
      default: "CONFIRMED",
      required: true,
    },
  },
  { timestamps: true },
);

RegistrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const Registration: Model<IRegistration> =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>("Registration", RegistrationSchema);

export default Registration;
