import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { EVENT_CATEGORY_VALUES, type EventCategory } from "@/features/events/data";

/**
 * Statuses that are stored. "ended" is deliberately missing: it is derived
 * from endsAt in service.server.ts, so it can never go stale.
 */
export const EVENT_DB_STATUSES = ["draft", "live", "cancelled"] as const;
export type EventDbStatus = (typeof EVENT_DB_STATUSES)[number];

export interface IEvent extends Document {
  title: string;
  description: string;
  category: EventCategory;
  startsAt: Date;
  endsAt: Date;
  venue: string;
  capacity: number;
  /** Seats taken. Only change it atomically with $inc (see DATABASE_NOTES.md). */
  registeredCount: number;
  status: EventDbStatus;
  /** The user who posted the event. */
  organizer: Types.ObjectId;
  /** Display name shown as "Organized by ...". */
  organizerName?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Shape of an event returned by .lean() (a plain object, not a Document). */
export type EventLean = Omit<IEvent, keyof Document> & { _id: Types.ObjectId };

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    category: {
      type: String,
      enum: EVENT_CATEGORY_VALUES,
      required: true,
    },
    startsAt: { type: Date, required: true },
    endsAt: {
      type: Date,
      required: true,
      validate: {
        validator(this: IEvent | mongoose.Query<unknown, IEvent>, value: Date) {
          const startsAt =
            this instanceof mongoose.Query ? this.get("startsAt") : this.startsAt;
          return value > startsAt;
        },
        message: "endsAt must be after startsAt.",
      },
    },
    venue: { type: String, required: true, trim: true, maxlength: 200 },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      validate: { validator: Number.isInteger, message: "capacity must be a whole number." },
    },
    registeredCount: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator(this: IEvent | mongoose.Query<unknown, IEvent>, value: number) {
          const capacity =
            this instanceof mongoose.Query ? this.get("capacity") : this.capacity;
          return Number.isInteger(value) && value <= capacity;
        },
        message: "registeredCount cannot exceed capacity.",
      },
    },
    status: {
      type: String,
      enum: EVENT_DB_STATUSES,
      default: "draft",
      required: true,
    },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    organizerName: { type: String, trim: true, maxlength: 120 },
  },
  { timestamps: true },
);

// Browse page: live + upcoming, sorted by start date.
EventSchema.index({ status: 1, startsAt: 1 });
// Category filter on the browse page.
EventSchema.index({ category: 1, status: 1, startsAt: 1 });
// Organizer's own events.
EventSchema.index({ organizer: 1, startsAt: -1 });

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;